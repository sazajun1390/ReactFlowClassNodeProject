import create from 'zustand'
import {
  ClassNodeData,
  FunctionObj,
  VariableObj,
} from '../components/ClassNodePackage/type/ClassNodeComp'
import { devtools } from 'zustand/middleware'
import { UseBoundStore, StoreApi } from 'zustand'

interface sendData {
  id: string
  className: string
  variables: VariableObj[]
  functions: FunctionObj[]
  dnotEdit: boolean
  allowEdit: () => void
  denyEdit: () => void
  setData: (id: string, data: ClassNodeData) => void
  reWriteClassName: (setName: string) => void
  reWriteVariables: (variable: VariableObj) => void
  reWriteFunctions: (func: FunctionObj) => void
  resetData: () => void
}

interface dataObj {
  //@ts-ignore
  [prop: string]: UseBoundStore<WithDevtools<StoreApi<sendData>>>
}

//@ts-ignore
const createStoreOfEditData: UseBoundStore<WithDevtools<StoreApi<sendData>>> = () => {
  return create(
    devtools<sendData>((set) => ({
      id: '',
      className: '',
      variables: [],
      functions: [],
      dnotEdit: true,
      allowEdit: () =>
        set(() => {
          return {
            dnotEdit: false,
          }
        }),
      denyEdit: () =>
        set(() => {
          return {
            dnotEdit: true,
          }
        }),
      setData: (id, data) =>
        set(() => {
          return {
            id: id,
            className: data.className,
            variables: data.variables,
            functions: data.functions,
          }
        }),
      reWriteClassName: (setName) =>
        set(() => {
          return {
            className: setName,
          }
        }),
      reWriteVariables: (variable) =>
        set(() => {
          return {}
        }),
      reWriteFunctions: (func) =>
        set(() => {
          return {}
        }),
      resetData: () =>
        set(() => {
          return {
            id: '',
            className: '',
            variables: [],
            functions: [],
          }
        }),
    })),
  )
}

const nodeDataStore: dataObj = {}

const addToNodeDataStore = (propName: string) => {
  nodeDataStore[propName] = createStoreOfEditData
}

export { addToNodeDataStore, nodeDataStore }
