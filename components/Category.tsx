import { ICategory } from '@/pages/todos/categories'
import { AppDispatch, RootState } from '@/redux/store'
import { setIsActiveCategory } from '@/redux/todoSlice'
import Link from 'next/link'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from '../styles/Categories.module.scss'


function Category(category: ICategory) {
    const dispatch:AppDispatch = useDispatch()
    const isActive = useSelector((state:RootState) => state.todoReducer.isActiveCategory)
    
  return (
    <div className={isActive === category.title ? styles.category + ' ' + styles.active : styles.category} onClick={() => {
        dispatch(setIsActiveCategory(category.value))
    }}>{category.title}</div>
  )
}

export default Category