import { NodeProps } from "reactflow";
import create from "zustand";
import { ClassNode, ClassNodeData } from "../type/ClassNodeComp";
  
type sendData = {
  id: string,
  data: Object,
  setData: (id: string, data: ClassNode) => void;
  resetData: () => void;
}

export const useEditData = create<sendData>( (set) =>({
  id: '',
  data: {},
  setData: (id, data) => set(() =>{
    return {
      id: id,
      data: data
    }
  }),
  resetData: () => set(() => {
    return {
      id: '',
      data: {}
    }
  })
}))