import { Node, NodeTypes } from 'reactflow';
import { ReactNode } from 'react';

interface ClassNodeData {
  className: string,
  variables: Array<VariableObj>
  functions: Array<FunctionObj>
}

interface VariableObj {
  variableName: string,
  type: string
}

interface FunctionObj {
  functionName: string,
  type: string
}

type ClassNode = Node<ClassNodeData>

export {
  ClassNodeData,
  VariableObj,
  FunctionObj,
  ClassNode
}