import React from 'react'
import SvgIconCreator from './SvgIconCreator'
import styles from '../styles/GoogleButton.module.scss'

interface GoogleButtonProps {
  onClickHandler: () => void
}

const GoogleButton = ({ onClickHandler }:GoogleButtonProps) => {
  return (
    <div 
      className={styles.googleButton}
      onClick={onClickHandler}>
        <SvgIconCreator type='google' />
        <span className='text-gray-500'>Sign in with Google</span>
    </div>
  )
}

export default GoogleButton