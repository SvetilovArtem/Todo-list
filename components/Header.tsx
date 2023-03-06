import { RootState } from "@/redux/store";
import Link from "next/link";
import Image from 'next/image';
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";

import styles from "../styles/Header.module.scss";

const navs = [
  { title: "todos", href: "/todos" },
  { title: "completed", href: "/completed" },
  { title: "plans", href: "/plans" },
  { title: "signIn", href: "/signIn" },
];

const Header = () => {
  const { pathname } = useRouter();
  const isAuth = useSelector((state: RootState) => state.todoReducer.isAuth);
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
          <Link href={nav.href} key={index}>
            <div className={pathname === nav.href ? styles.active : ""}>
              {nav.title}
            </div>
          </Link>
        ))}
        {isAuth && (
          <div className={styles.user}>
            <Image loader={() => authUser.authUserPhoto} src={authUser.authUserPhoto} alt="" width={40} height={40} />
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
