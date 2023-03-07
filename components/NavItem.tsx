import Link from 'next/link'
import { useRouter } from 'next/router';
import React from 'react'

import styles from '../styles/Header.module.scss'

interface INavItemProps {
    nav: {
        title: string,
        href: string
    },
    index: number,
    isAuth: boolean
}

const NavItem = ({ nav, index, isAuth }:INavItemProps) => {
    const { pathname } = useRouter();
  return (
    <Link href={nav.href} key={index}>
            <div className={pathname === nav.href ? styles.active : ""}>
              {nav.title}
            </div>
          </Link>
  )
}

export default NavItem