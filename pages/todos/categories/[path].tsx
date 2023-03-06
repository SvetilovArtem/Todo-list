import { useRouter } from 'next/router'
import React from 'react'

const CategoryPage = () => {
  const router = useRouter()
  const path = router.query.path

  return (
    <div>{path}</div>
  )
}

export default CategoryPage