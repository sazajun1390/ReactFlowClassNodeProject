import { NodeProps } from "reactflow";
import create from "zustand";
import { ClassNode, ClassNodeData, FunctionObj, VariableObj } from "../type/ClassNodeComp";
import { devtools } from "zustand/middleware";
  
/*type sendData = {
  id: string,
  data: Object,
  setData: (id: string, data: ClassNodeData) => void;
  resetData: () => void;
}

export const useEditData = create(devtools<sendData>( (set) =>({
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
})))*/

type sendData = {
  id: string,
  className: string,
  variables: VariableObj[],
  functions: FunctionObj[],
  setData: (id: string, data: ClassNodeData) => void;
  resetData: () => void;
}


export const useEditData = create( devtools<sendData>((set) =>({
  id: '',
  className:'',
  variables:[],
  functions:[],
  setData: (id, data) => set(() =>{
    return {
      id: id,
      className: data.className,
      variables: data.variables,
      functions: data.functions
    }
  }),
  resetData: () => set(() => {
    return {
      id: '',
      className:'',
      variables:[],
      functions:[],
    }
  })
})))