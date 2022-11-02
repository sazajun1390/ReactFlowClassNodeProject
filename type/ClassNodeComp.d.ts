import { Node, NodeTypes } from 'reactflow';
import { ReactNode } from 'react';

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

interface FunctionObj {
  funcId:number
  functionName: string,
  type: string
}

interface FuncCard extends FunctionObj {
  setter: Dispatch<SetStateAction<VariableObj | FunctionObj | null>>
}

type ClassNode = Node<ClassNodeData>

export {
  ClassNodeData,
  VariableObj,
  VarCard,
  FunctionObj,
  FuncCard,
  ClassNode
}