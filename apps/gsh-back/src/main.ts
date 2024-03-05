import 'dotenv/config'
import express from 'express';
import * as path from 'path';
import cors from 'cors'

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

let found = 0

async function circleSearch(target: string, start: string, logins = [start], circle = 1) {
  if(circle === 4) return
  // const followingPromises: Promise<string[]>[] = []
  const followingPromises: string[][] = []
  for(const following of logins) {
    if(following === target) console.log('Found !!!', circle)
    if(searched.includes(following)) {
      console.log('ignore', following)
      continue
    }
    searched.push(following)
    // console.log(searched)
    followingPromises.push(await getFollowings(following))
    console.log(`circle ${circle}:`,requestCount, following)
  }
  const nextLogins = Array.from(new Set((await Promise.all(followingPromises)).flat()))
  // console.log(nextLogins)
  await circleSearch(target, start, nextLogins, circle + 1)
}

const app = express();
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
  const {target, start}: {target: string, start: string} = req.body
  await circleSearch(target, start)
  console.log('fini', searched)
  // console.log(filterUselessDeviation(chains))
  res.send({ message: 'Welcome to gsh-back!' });
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
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