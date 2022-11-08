import create from "zustand";
import { ClassNodeData, FunctionObj, VariableObj } from "../type/ClassNodeComp";
import { devtools } from "zustand/middleware";
import { ClassNames } from "@emotion/react";
  
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
  edit: boolean,
  allowEdit: () => void;
  denyEdit: () => void;
  setData: (id: string, data: ClassNodeData) => void;
  reWriteClassName: (setName: string) => void;
  reWriteVariables: (variable: VariableObj) => void;
  reWriteFunctions: (func: FunctionObj) => void;
  resetData: () => void;
}
//reWriteFunctions: (func: FunctionObj) => void;

export const useEditData = create( devtools<sendData>((set) =>({
  id: '',
  className:'',
  variables:[],
  functions:[],
  edit:false,
  allowEdit: ()=> set(()=>{
    return {
      edit: true
    }
  }),
  denyEdit: () => set(()=>{
    return {
      edit: false
    }
  }),
  setData: (id, data) => set(() =>{
    return {
      id: id,
      className: data.className,
      variables: data.variables,
      functions: data.functions
    }
  }),
  reWriteClassName: (setName) => set(() => {
    return {
      className: setName
    }
  }),
  reWriteVariables: (variable) => set(()=>{
    return {

    }
  }),
  reWriteFunctions: (func) => set(()=>{
    return {

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