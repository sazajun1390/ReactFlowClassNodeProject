import { NodeProps } from "reactflow";
import create from "zustand/react";
import { ClassNode, ClassNodeData } from "../type/ClassNodeComp";
  
type sendData = {
  id: string,
  data: ClassNodeData | null,
  setData: (NodeData:NodeProps<ClassNode>) => void;
  resetData: () => void;
}

export const useEditData = create<sendData>( set =>({
  id: '',
  data: null,
  setData: (NodeData:NodeProps<ClassNode>) => set(state =>{
    return {
      id: NodeData.id,
      data: NodeData.data.data
    }
  }),
  resetData: () => set(state => {
    return {
      id: '',
      data: null
    }
  })
}))