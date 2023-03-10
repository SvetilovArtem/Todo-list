import React from 'react'

import styles from '../styles/TodoDescTooltip.module.scss'

interface ITodoDescTooltipProps {
    description: string
}

const TodoDescTooltip = ({ description }:ITodoDescTooltipProps) => {
  return (
    <div className={styles.tooltip}>{description ? description : 'not description'}</div>
  )
}

export default TodoDescTooltip