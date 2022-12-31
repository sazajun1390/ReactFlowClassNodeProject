import { NodeProps } from 'reactflow'
import create from 'zustand'
import { ClassNode, ClassNodeData } from '../components/ClassNodePackage/type/ClassNodeComp'
import { devtools } from 'zustand/middleware'

type draggable = {
  isDrag: boolean
  onClick: () => void
  onDeny: () => void
}

type editorDiscrojureKey = {}

export const useDisclojureStore = create(
  devtools<draggable>((set) => ({
    isDrag: true,
    onClick: () => set({ isDrag: false }),
    onDeny: () => set({ isDrag: true }),
  })),
)
