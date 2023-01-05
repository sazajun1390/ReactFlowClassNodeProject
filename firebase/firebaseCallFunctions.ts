import firebase, { initializeApp, getApp, getApps } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore, doc, setDoc, getDoc, collection, addDoc } from 'firebase/firestore'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import Router from 'next/router'
import { setCookie } from 'nookies'
import useSWR from 'swr'

import firebaseApp from './firebaseApp'

const analytics = () => {
  if (typeof window !== 'undefined') {
    return getAnalytics(firebaseApp)
  } else {
    return null
  }
}

const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)

const googleOnSubmit = async () => {
  try {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    const user = result.user
    const id = await user.getIdToken()
    await fetch('/api/session', { method: 'POST', body: JSON.stringify({ id }) })
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
export { analytics, db, auth, signInWithPass, logout, googleOnSubmit }
