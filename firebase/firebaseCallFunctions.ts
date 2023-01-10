import firebase, { initializeApp, getApp, getApps } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore, doc, setDoc, getDoc, collection, addDoc } from 'firebase/firestore'
import { getDatabase } from "firebase/database";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth'
import Router from 'next/router'
import { setCookie } from 'nookies'
import useSWR from 'swr'
import Cookies from 'js-cookie'

import firebaseApp from './firebaseApp'
import { queries } from '@storybook/testing-library';

const analytics = () => {
  if (typeof window !== 'undefined') {
    return getAnalytics(firebaseApp)
  } else {
    return null
  }
}

const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)
const realDB = getDatabase(firebaseApp)

const googleOnSubmit = async () => {
  try {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    const user = result.user
    const id = await result.user.getIdToken()
    const uid = await user.uid
    await fetch('/api/session', { method: 'POST', body: JSON.stringify({ id, uid }) })
    const docRef = doc(db, 'users', user.uid)
    const docSnap = await getDoc(docRef)
    const colRef = collection(db, `users`, user.uid, 'rooms')
    const ReactFlowRoom = {}

    if (!docSnap.exists()) {
      await setDoc(doc(db, 'users', user.uid), {
        name: user.displayName,
        email: user.email,
      })

      await addDoc(colRef, ReactFlowRoom)
    }
    Router.push('/flowEditPage')
  } catch (e) {
    console.log(e)
    Cookies.set("token", "");
  }
}

const passSignUpOnSubmit = async (email: string, pass: string) => {
  try {
    createUserWithEmailAndPassword(auth, email, pass)
    Router.push('/')
  } catch (e) {
    console.log(e)
  }
}

const signInWithPass = async (email: string, pass: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, pass)
    const id = await result.user.getIdToken()
    await fetch('/api/session', { method: 'POST', body: JSON.stringify({ id }) })
  } catch (e) {
    console.log(e)
  }
}
const logout = async () => {
  // セッションを削除するため、Firebase SDKでなくREST APIでログアウトさせる
  await fetch('/api/sessionLogout', { method: 'POST' })
}
export { analytics, db, realDB, auth, signInWithPass, logout, googleOnSubmit, passSignUpOnSubmit }
