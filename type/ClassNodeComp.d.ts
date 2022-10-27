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

interface ClassNode1 {
  id: string,
  type: string,
  data: ClassNodeData,
  children: ReactNode[]
}

type ClassNode = Node<ClassNodeData>

interface ClassNodeProps extends NodeTypes{
  data:ClassNodeData
}

export {
  ClassNodeData,
  VariableObj,
  FunctionObj,
  ClassNode1,
  ClassNode
}