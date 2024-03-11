import 'dotenv/config'
import express from 'express';
import * as path from 'path';
import cors from 'cors'
import { createServer } from 'http';
import { Server } from 'socket.io';
import { SchemaFieldTypes, createClient } from 'redis';

let client
// getUser("Charles-Chrismann");
(async () => {
  client = await createClient()
  .on('error', err => console.log('Redis Client Error', err))
  .connect();
  try {
    // console.log(await client.json.get('users:test'))
    await client.ft.create('idx:users', {
      '$.redis-updatedAt': {
        type: SchemaFieldTypes.NUMERIC
      },
      '$.id': {
        type: SchemaFieldTypes.TEXT
      },
      '$.login': {
        type: SchemaFieldTypes.TEXT,
      },
      '$.followers': {
        type: SchemaFieldTypes.TEXT,
      },
      '$.followersCount': {
        type: SchemaFieldTypes.NUMERIC,
      },
      '$.followings': {
        type: SchemaFieldTypes.TEXT,
      },
      '$.followingsCount': {
        type: SchemaFieldTypes.NUMERIC,
      },
    }, {
        ON: 'JSON',
        PREFIX: 'user:'
    });

    // const user = await client.json.set('users:test', '$', {
    //   'redis-updatedAt': 1710085672544,
    //   id: 'g-and-querying-json-documents',
    //   login: 'the-test',
    //   followers: [
    //     'aaa', 'bbb', 'ccc'
    //   ],
    //   followersCount: 3,
    //   followings: [],
    //   followingsCount: 0
    // })
    // console.log(user)
  } catch (e) {
    if (e.message === 'Index already exists') {
        console.log('Index exists already, skipped creation.');
    } else {
        // Something went wrong, perhaps RediSearch isn't installed...
        console.error(e);
        process.exit(1);
    }
  }
})()


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

async function getUser(userLogin: string): Promise<Record<string, any>> {
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
            id
            login 
            following(first: 100) {
              nodes {
                id
                login
              }
              totalCount
              pageInfo {
                endCursor
                hasNextPage
                hasPreviousPage
                startCursor
              }
            }
          }
          organization(login: "${userLogin}") {
            id
            login 
          }
        }`
      })
    })).json()
    if(!data.data.user) {
      return ({
        'redis-updatedAt': Date.now(),
        id: data.data.organization.id,
        login: data.data.organization.login,
        followings: [],
        followingsCount: 0,
      })
    }
    return ({
      'redis-updatedAt': Date.now(),
      id: data.data.user.id,
      login: data.data.user.login,
      followings: data.data.user.following.nodes.map(follwoing => follwoing.id),
      followingsCount: data.data.user.following.totalCount,
    })
    // return data.data.user ? data.data.user.following.nodes.map(user => user.login) : []
  } catch (e) {
    if(e instanceof TypeError) {
      console.error(e.message)
    } else console.error(e)
    return null
  }
}

async function getUserById(nodeId: string): Promise<Record<string, any>> {
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
          node(id: "${nodeId}") {
            ...on User {
              id
              login 
              following(first: 100) {
                nodes {
                  id
                  login
                }
                totalCount
                pageInfo {
                  endCursor
                  hasNextPage
                  hasPreviousPage
                  startCursor
                }
              }
            }
            ...on Organization {
              id
              login
            }
          }
        }`
      })
    })).json()
    if(!data.data.node.following) {
      return ({
        'redis-updatedAt': Date.now(),
        id: data.data.node.id,
        login: data.data.node.login,
        followings: [],
        followingsCount: 0,
      })
    }
    return ({
      'redis-updatedAt': Date.now(),
      id: data.data.node.id,
      login: data.data.node.login,
      followings: data.data.node.following.nodes.map(follwoing => follwoing.id),
      followingsCount: data.data.node.following.totalCount,
    })
    // return data.data.user ? data.data.user.following.nodes.map(user => user.login) : []
  } catch (e) {
    if(e instanceof TypeError) {
      console.error(e.message)
    } else console.error(e)
    return null
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

let circles: {parent: null | string, followings: string[]}[][] = []

const fastestWayOnly = true
async function circleSearch(
  target: string,
  start: string,
  logins = [{parent: null, followings: [start]}] as {parent: null | string, followings: string[]}[],
  circle = 1
) {
  if(circle > 5) return
  console.log('\n\n---------- Starting circle', circle, '----------\n\n')
  let found = false
  const followingPromises: {parent: string, followings: string[]}[] = []
  let ignoredOnThisCircle = 0
  for(const login of logins) {
    for(const following of login.followings) {
      t++
      // console.log(t)
      const followingObject = { parent: following, followings: [] }
      followingPromises.push(followingObject)

      const redisUser = await client.json.get('users:' + following)
      if(redisUser) {
        if(redisUser.followings.includes(target)) found = true
        // console.log('Ignoring:', redisUser.login)
        ignoredOnThisCircle++
        followingObject.followings = redisUser.followings
        continue
      }
      
      const user = await getUserById(following)
      if(!user) continue
      console.log(requestCount, 'Saving new user', user.login)
      client.json.set('users:' + user.id, '$', user)
      
      followingObject.followings = user.followings
      io.emit('following', {following: followingObject, circle: circle - 1})
      
      if(user.followings.includes(target)) found = true
      if(fastestWayOnly && found) break
    }
    if(fastestWayOnly && found) break
  }
  console.log('Total Loops:', t, 'Ignored on this circle:', ignoredOnThisCircle)
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
    console.log('chains', (await Promise.all(chains.map(chain => Promise.all(chain.map(userId => client.json.get('users:' + userId)))))).map(chain => chain.map(users => users.login)))
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

let t = 0
app.post('/api/handshake', async (req, res) => {
  requestCount = 0
  searched = []
  chains = []
  requestCount = 0
  circles = []
  t = 0
  const {target, start}: {target: string, start: string} = req.body
  const [targetUser, startUser] = await Promise.all([getUser(target), getUser(start)])
  await client.json.set('users:' + targetUser.id, '$', targetUser)
  await circleSearch(targetUser.id, startUser.id)
  // console.log(circles)
  console.log(requestCount, 'requests made')
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