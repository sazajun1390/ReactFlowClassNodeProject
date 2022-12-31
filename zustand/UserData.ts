import { NodeProps } from 'reactflow'
import create from 'zustand'
import { ClassNode, ClassNodeData } from '../components/ClassNodePackage/type/ClassNodeComp'
import { devtools } from 'zustand/middleware'
import session from 'next-session'
import type { User } from 'firebase/auth'
import { sign } from 'crypto'
import { persist } from 'zustand/middleware'

type user = {
  User: User | null | undefined
  signInCheck: boolean
  setUserData: (id: User | null | undefined, signIn: boolean) => void
  setSignIn: (sign: boolean) => void
}

export const useFirebaseAuthState = create(
  devtools(
    persist<user>(
      (set) => ({
        User: undefined,
        signInCheck: false,

        setUserData: (user, signIn) =>
          set(() => {
            return {
              User: user,
              signInCheck: signIn,
            }
          }),

        setSignIn: (sign) =>
          set(() => {
            return {
              signInCheck: sign,
            }
          }),
      }),
      {
        name: 'idTokenSessionStorage',
        getStorage: () => sessionStorage,
      },
    ),
  ),
)

/**
 *
 */
