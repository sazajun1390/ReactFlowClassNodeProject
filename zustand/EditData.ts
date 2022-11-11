import create, { StoreApi, UseBoundStore } from "zustand";
import { ClassNodeData, FunctionObj, VariableObj } from "../type/ClassNodeComp";
import { devtools } from "zustand/middleware";
import { ClassNames } from "@emotion/react";
import { type } from "os";

interface sendData {
  id: string,
  className: string,
  variables: VariableObj[],
  functions: FunctionObj[],
  dnotEdit: boolean,
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
  dnotEdit:true,
  allowEdit: ()=> set(()=>{
    return {
      dnotEdit: false
    }
  }),
  denyEdit: () => set(()=>{
    return {
      dnotEdit: true
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

export const useInputData =create( devtools<sendData>((set) =>({
  id: '',
  className:'',
  variables:[],
  functions:[],
  dnotEdit:true,
  allowEdit: ()=> set(()=>{
    return {
      dnotEdit: false
    }
  }),
  denyEdit: () => set(()=>{
    return {
      dnotEdit: true
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
