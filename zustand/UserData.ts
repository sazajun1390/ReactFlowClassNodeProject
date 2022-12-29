import { NodeProps } from 'reactflow'
import create from 'zustand'
import { ClassNode, ClassNodeData } from '../components/ClassNodePackage/type/ClassNodeComp'
import { devtools } from 'zustand/middleware'
import session from 'next-session'

type user = {
  userId: string,
  userSession: string,
  setUserData: (id:string, session:string) => void
}

type editorDiscrojureKey = {}

export const useDisclojureStore = create(
  devtools<user>((set) => ({
    userId: '',
    userSession: '',
    setUserData: (id,session) => set(()=>{return {
      userId:id,
      userSession:session
    }}) 
  })),
)