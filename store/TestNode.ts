import React from 'react'
import { Edge, NodeProps, Node } from 'reactflow'
import ClassNodeComp from '../components/ClassNodePackage/ClassNodeComp'
import type {
  FunctionObj,
  VariableObj,
  ClassNode,
  ClassNodeData,
} from '../components/ClassNodePackage/type/ClassNodeComp'

const Variable1: VariableObj = {
  VarId: 1,
  variableName: 'Num',
  varType: 'Integer',
}

const FunctionData1: FunctionObj = {
  FuncId: 1,
  functionName: 'Calc',
  funcType: 'Integer',
  funcArgs: [],
}

const FunctionData2: FunctionObj = {
  FuncId: 2,
  functionName: 'Calc2',
  funcType: 'Integer',
  funcArgs: [],
}

const FunctionData3: FunctionObj = {
  FuncId: 3,
  functionName: 'Calc3',
  funcType: 'Integer',
  funcArgs: [],
}

const Variable2: VariableObj = {
  VarId: 2,
  variableName: 'Num2',
  varType: 'Integer',
}

const Variable3: VariableObj = {
  VarId: 3,
  variableName: 'Num3',
  varType: 'Integer',
}

const testClass: ClassNode = {
  id: '0',
  type: 'custom',
  position: { x: 0, y: 0 },
  data: {
    className: 'calcNum',
    variables: [Variable1, Variable2, Variable3],
    functions: [FunctionData1, FunctionData2, FunctionData3],
  },
}

const testClass2: ClassNode = {
  id: '1',
  type: 'custom',
  position: { x: 1000, y: 30 },
  data: {
    className: 'calcNum',
    variables: [Variable1, Variable1, Variable1],
    functions: [FunctionData3, FunctionData3, FunctionData3],
  },
}
const userMapTag: Node = {
  id: '0',
  type: 'UserMapTag',
  position: { x: 100, y: 30 },
  data: {
    label: 'data test',
  },
}

const userMapGroup: Node = {
  id: '0',
  type: 'UserMapGroup',
  position: { x: 100, y: 30 },
  data: {
    label: 'data test',
  },
}

const storyTestClass: NodeProps<ClassNodeData> = {
  id: testClass.id,
  type: testClass.type as string,
  data: testClass.data,
  selected: true,
  isConnectable: true,
  xPos: testClass.position.x,
  yPos: testClass.position.y,
  zIndex: 2,
  dragging: false,
}

const TestNode: Array<any> = [testClass, testClass2]

const userMapTestNode: Array<Node<any>> = [userMapGroup]
const testEdge: Edge[] = [
  {
    id: 'te1',
    source: '0',
    target: '1',
  },
]

const StroyUserMapTag: NodeProps = {
  id: testClass.id,
  type: 'UserMapTag',
  selected: true,
  isConnectable: true,
  xPos: testClass.position.x,
  yPos: testClass.position.y,
  zIndex: 2,
  dragging: false,
  data: {
    label: 'data',
  },
}

export {
  TestNode,
  testClass,
  testClass2,
  storyTestClass,
  testEdge,
  StroyUserMapTag,
  userMapTestNode,
}
