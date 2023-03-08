import GoogleButton from "@/components/GoogleButton";
import { auth, provider } from "@/firebase/firebase";
import { AppDispatch, RootState } from "@/redux/store";
import { setAuthUser, setIsAuth } from "@/redux/todoSlice";
import { signInWithPopup } from "firebase/auth";
import Link from "next/link";
import router from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "../../styles/SignIn.module.scss";

const SignIn = () => {
  const dispatch: AppDispatch = useDispatch();
  const authUser = useSelector((state:RootState) => state.todoReducer.authUser)

  const signInHandler = () => {
    signInWithPopup(auth, provider).then((resp) => {
      dispatch(setIsAuth(resp.user));
      dispatch(setAuthUser(resp.user))

      router.push("/");
    }).then(() => localStorage.setItem('authUser', JSON.stringify(authUser)))
    
  };
  return (
    <div className={styles.signIn}>
      <h3>Sign in</h3>
      <Link href="https://github.com/SvetilovArtem">
        created by Svetilov Artem
      </Link>
      <GoogleButton onClickHandler={signInHandler} />
    </div>
  );
};

export default SignIn;
