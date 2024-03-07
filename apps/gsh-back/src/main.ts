import 'dotenv/config'
import express from 'express';
import * as path from 'path';
import cors from 'cors'
import { createServer } from 'http';
import { Server } from 'socket.io';

async function getFollowings(userLogin: string): Promise<string[]> {
  try {
    requestCount++
    const data = await (await fetch('https://api.github.com/graphql', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env["gh-token"]
      },
      method: 'POST',
      body: JSON.stringify({
        query: `{
          user(login: "${userLogin}") {
              following(first: 100) {
                  nodes {
                      login
                  }
              }
          }
        }`
      })
    })).json()
    return data.data.user ? data.data.user.following.nodes.map(user => user.login) : []
  } catch (e) {
    if(e instanceof TypeError) {
      console.error(e.message)
    } else console.error(e)
    return []
  }
}

function getSearchedLevels(levels: number) {
  return Array.from(new Set(searched.slice(0 , levels + 1).flat()))
}

async function recursivelyTest(target: string, userLogin: string, chain: string[]) {
  if(chain.length === 5) return false
  console.log('recursivelyTest', requestCount, userLogin, chain.length)
  // searched.push(userLogin)
  if(!searched[chain.length - 1]) searched[chain.length - 1] = [userLogin]
  else searched[chain.length - 1].push(userLogin)
  const followings = await getFollowings(userLogin)
  if(followings.includes(target)) {
    console.log('found !')
    chains.push([...chain, target])
    return [...chain, target]
  }
  const promises: Promise<any>[] = []
  for(const following of followings) {
    const s = getSearchedLevels(chain.length)
    // console.log(s)
    if(s.includes(following)) {
      console.info('ignoring', following)
      continue
    }
    // if(searched.includes(following)) continue
    // promises.push(recursivelyTest(target, following, [...chain, following]))
    await recursivelyTest(target, following, [...chain, following])
    // const newChain = await recursivelyTest(target, following, [...chain, following])
    // if (newChain) return newChain
  }
  // await Promise.all(promises)
}

function filterUselessDeviation(paths: string[][]) {
  const singlePaths = paths.map(path => path.filter((p, i) => i !== 0 && i !== path.length - 1))
  console.log(singlePaths)
  const pathToReturn = []
  for(let i = 0; i < singlePaths.length; i++) {
    const currentPath = singlePaths[i]
    for(let j = i + 1; j < singlePaths.length; j++) {
      const comparedPath = singlePaths[j]
      currentPath.forEach((path, currentPathIndex) => {
        // const similarPath
        // if()
      })
      console.log(i, j)
    }
  }
}

const visited = []
const paths = []

function findShortestUserPath(start: string, target: string, chain: string[]) {
  const user = users.find(u => u.user === start)
  if(!user) return
  visited.push(user.user)
  if(user.followings.includes(target)) return [...chain, target]
  for(const following of user.followings) {
    if(visited.includes(following)) continue
    const path = findShortestUserPath(following, target, [...chain, following])
    if(path) {
      paths.push(path)
      return
    }
  }
}

let found = false
const users = [] as {user: string, followings: string[]}[]
let circles: {parent: null | string, followings: string[]}[][] = []



async function circleSearch(
  target: string,
  start: string,
  logins = [{parent: null, followings: [start]}] as {parent: null | string, followings: string[]}[],
  circle = 1
) {
  if(circle > 5) return
  // const followingPromises: Promise<string[]>[] = []
  const followingPromises: {parent: string, followings: string[]}[] = []
  for(const login of logins) {
    for(const following of login.followings) {
      const followingObject = { parent: following, followings: [] }
      followingPromises.push(followingObject)
      if(following === target) {
        console.log('Found !!!', circle)
        found = true
      }
      if(searched.includes(following)) {
        console.log('ignore', following)
        followingObject.followings = users.find(user => user.user === following).followings
        continue
      }
      searched.push(following)
      // console.log(searched)
      const followingPromise = await getFollowings(following)
      users.push({ user: following, followings: followingPromise })
      followingObject.followings = followingPromise
      io.emit('following', {following: followingObject, circle: circle - 1})
      console.log(`circle ${circle}:`,requestCount, following)
    }
  }
  const resolvedPromises = await Promise.all(followingPromises)
  const nextLogins = resolvedPromises.filter((v,i,a)=>a.findIndex(v2=>(v2.parent===v.parent))===i)
  circles.push(nextLogins)

  let concerneds = resolvedPromises.filter(x => x.followings.find(y => y === target))
  if(concerneds.length) {
    concerneds = resolvedPromises.filter(x => x.followings.find(y => y === target))
    
    const chains: string[][] = []
    for(const concerned of concerneds) {
      let nextParent = concerned.parent
      const chain: string[] = [target]
      for(let i = circle - 1; i > 0; i--) {
        // const concerned_ = circles[i].find(x => x.followings.find(y => y === nextParent))
        let concerned_
        if(i === circle - 1) {
          concerned_ = circles[i].find(x => x.parent === nextParent)
        } else concerned_ = circles[i].find(x => x.followings.find(y => y === nextParent))
        nextParent = concerned_.parent
        chain.push(nextParent)
      }
      chain.push(start)
      chains.push(chain.reverse())
    }
    console.log(chains)
    return
  }
  await circleSearch(target, start, nextLogins, circle + 1)
}

const app = express();
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*'
  }
})
app.use(cors())
app.use(express.json())
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to gsh-back!' });
});

let searched = []
let chains: (string[])[] = []
let requestCount = 0

app.post('/api/handshake', async (req, res) => {
  searched = []
  chains = []
  requestCount = 0
  circles = []
  const {target, start}: {target: string, start: string} = req.body
  await circleSearch(target, start)
  console.log(circles)
  // console.log(circles)
  // console.log(users)
  // console.log(filterUselessDeviation(chains))
  res.send({ message: 'Welcome to gsh-back!' });
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

const port = process.env.PORT || 3333;
server.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);


// filterUselessDeviation([
//   [ 'Nihyakunanajuni', 'Charles-Chrismann', 'lucaschrng' ],
//   [ 'Nihyakunanajuni', 'Elicue', 'KishiniCHL', 'lucaschrng' ],
//   [ 'Nihyakunanajuni', 'Elicue', 'Arthur-Prudhomme', 'lucaschrng' ],
//   [ 'Nihyakunanajuni', 'Elicue', 'Charles-Chrismann', 'lucaschrng' ],
//   [ 'Nihyakunanajuni', 'tom-tamen', 'Charles-Chrismann', 'lucaschrng' ]
// ])