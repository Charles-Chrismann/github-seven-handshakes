import React from "react";
import styles from './card.module.scss'

export function Card({user, transform}:{user: string, transform:string}) {

  return (
  <div className={styles.card} style={{transform}}>
    {user}
  </div>
  )
}