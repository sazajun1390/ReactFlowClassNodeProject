import { useEffect, useState } from "react";
import firebase from 'firebase/app'
import { getAuth } from 'firebase/auth'
import type { User } from 'firebase/auth'
import { useFirebaseAuthState } from "../zustand/UserData";
import shallow from "zustand/shallow";

export const useFirebaseAuthSession = () => {
  const { currentUser, signInCheck, setCurrentUser,setSignIn} = useFirebaseAuthState((state)=>({
    currentUser: state.User,
    signInCheck: state.signInCheck,
    setCurrentUser: state.setUserData,
    setSignIn: state.setSignIn
  }),shallow)
  useEffect(()=>{
    getAuth().onAuthStateChanged(async (user) => {
      if (user) {
        setCurrentUser(user,true);
      } else {
        setSignIn(true);
      }
    })
  })
  return { currentUser, signInCheck }
}