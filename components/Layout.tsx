import Categories from '@/pages/todos/categories'
import { useRouter } from 'next/router'
import React from 'react'
import Header from './Header'

interface LayoutProps {
    children: React.ReactNode
}

const Layout = ({ children }:LayoutProps) => {
  const router = useRouter()
  const path = router.query.path
  console.log(path)
  return (
    <div>
        <Header />
        {path && <Categories />}
        {children}
    </div>
  )
}

export default Layout