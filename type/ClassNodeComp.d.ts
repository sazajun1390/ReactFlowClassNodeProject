import { Node, NodeTypes } from 'reactflow';
import { ReactNode,Dispatch,SetStateAction } from 'react';

interface ClassNodeData {
  className: string,
  variables: Array<VariableObj>
  functions: Array<FunctionObj>
}

interface VariableObj {
  VarId:number,
  variableName: string,
  type: string
}

interface VarCard extends VariableObj {
  setter: Dispatch<SetStateAction<VariableObj | FunctionObj | null>>
}

/*interface VarCard extends VariableObj {
  setter: Dispatch<formObjectReducerState>
}*/


interface FunctionObj {
  FuncId:number
  functionName: string,
  type: string
}

interface FuncCard extends FunctionObj {
  setter: Dispatch<SetStateAction<VariableObj | FunctionObj | null>>
}

/*interface FuncCard extends FunctionObj {
  setter: Dispatch<formObjectReducerState>
}*/
type ClassNode = Node<ClassNodeData>

type formObjectType = null | FunctionObj | VariableObj

interface formObjectReducerState {
  state:formObjectState,
  type:string
}

export {
  ClassNodeData,
  VariableObj,
  VarCard,
  FunctionObj,
  FuncCard,
  ClassNode,
  formObjectReducerState,
  formObjectType
}