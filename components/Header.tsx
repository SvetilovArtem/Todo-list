import { RootState } from "@/redux/store";
import Link from "next/link";
import Image from 'next/image';
import React from "react";
import { useSelector } from "react-redux";

import styles from "../styles/Header.module.scss";
import NavItem from "./NavItem";

const navs = [
  { title: "todos", href: "/todos" },
  { title: "completed", href: "/completed" },
  { title: "plans", href: "/plans" },
  { title: "signIn", href: "/signIn" },
];

const Header = () => {

  const isAuth = useSelector((state: RootState) => state.todoReducer.isAuth);
  const navs = isAuth ? [
    { title: "todos", href: "/todos" },
    { title: "completed", href: "/completed" },
    { title: "plans", href: "/plans" },
  ] : [
    { title: "todos", href: "/todos" },
    { title: "completed", href: "/completed" },
    { title: "plans", href: "/plans" },
    { title: "signIn", href: "/signIn" },
  ];
  const authUser = useSelector(
    (state: RootState) => state.todoReducer.authUser
  );
  return (
    <header className={styles.header}>
      <Link href="/">
        <div className={styles.logo}>TODO+</div>
      </Link>
      <nav className={styles.nav}>
        {navs.map((nav, index) => (
          <NavItem nav={nav} index={index} isAuth={isAuth} />
        ))}
        {isAuth && (
          <div className={styles.user}>
            <Image unoptimized loader={() => authUser.authUserPhoto} src={authUser.authUserPhoto} alt="" width={40} height={40} />
            <div className={styles.userInfo}>
              <div>{authUser.authUserName}</div>
              <div>{authUser.authUserEmail}</div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
