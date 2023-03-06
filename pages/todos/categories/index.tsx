import Category from "@/components/Category";
import React from "react";

import styles from "../../../styles/Categories.module.scss";

export interface ICategory {
  title: string;
  path: string;
  id: number;
  value: string
}

const Categories = () => {
  const categories = [
    { title: "all", path: "/all", value: 'all', id: 0 },
    { title: "my goals", path: "/goals", value: 'my goals', id: 1 },
    { title: "education", path: "/education", value: 'education', id: 2 },
    { title: "family", path: "/family", value: 'family', id: 3 },
  ];

  return (
    <div className={styles.categories}>
      {categories.map((c) => (
        <Category title={c.title} path={`${c.path}`} id={c.id} value={c.value} />
      ))}
    </div>
  );
};

export default Categories;
