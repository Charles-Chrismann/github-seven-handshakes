// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState, useEffect } from 'react';
import styles from './app.module.scss';
import { socket } from './socket';
import { Card } from './components/Card';

export function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);
  const [circles, setCircles] = useState<{parent: string, followings: string[]}[][]>([])

  function computeTransform(circle: number, positionRatio: number) {
    return `rotate(${positionRatio * 360}deg) translateY(${circle * 300}px)`
  }

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFollowingEvent(value: {circle: number, following: {parent: string, followings: string[]}}) {
      setCircles(previous => {
        const newCircles = [...previous]
        if(newCircles.length < value.circle + 1) {
          while(newCircles.length - 1 !== value.circle) newCircles.push([])
        }
        newCircles[value.circle] = [...newCircles[value.circle], value.following]
        return newCircles
      })
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('following', onFollowingEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('following', onFollowingEvent);
    };
  }, []); 
  return (
    <div className={styles.user_container}>
      {
        circles.map((circle, i) => circle.map((node, j) => {
          console.log(i)
          if(i + 1 === circles.length) {
            return [
              ...node.followings.map((following, k) => <Card user={following} transform={computeTransform(i + 1, k / node.followings.length)} />),
              <Card user={node.parent} transform={computeTransform(i, j / circle.length)} />
            ]
          } else return <Card user={node.parent} transform={computeTransform(i, j / circle.length)} />
        }))
      }
    </div>
  );
}

export default App;
