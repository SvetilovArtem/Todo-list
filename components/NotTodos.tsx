import React from 'react'
import styles from '../styles/NotTodos.module.scss'

const NotTodos = () => {
  return (
    <div className={styles.wrapper}>
        <img src='img/notFound.png' alt='' width={320} height={320} />
        <div className={styles.title}>not todos</div>
    </div>
  )
}

export default NotTodos