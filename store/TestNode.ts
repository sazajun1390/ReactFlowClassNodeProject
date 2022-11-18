import React from 'react'
import { NodeProps } from 'reactflow'
import ClassNodeComp from '../components/ClassNodeComp'
import type { FunctionObj, VariableObj, ClassNode, ClassNodeData } from '../type/ClassNodeComp'

const Variable1: VariableObj = {
  VarId: 1,
  variableName: 'Num',
  type: 'Integer',
}

const FunctionData1: FunctionObj = {
  FuncId: 1,
  functionName: 'Calc',
  type: 'Integer',
}

const FunctionData2: FunctionObj = {
  FuncId: 2,
  functionName: 'Calc2',
  type: 'Integer',
}

const FunctionData3: FunctionObj = {
  FuncId: 3,
  functionName: 'Calc3',
  type: 'Integer',
}

const Variable2: VariableObj = {
  VarId: 2,
  variableName: 'Num2',
  type: 'Integer',
}

const Variable3: VariableObj = {
  VarId: 3,
  variableName: 'Num3',
  type: 'Integer',
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
  position: { x: 30, y: 30 },
  data: {
    className: 'calcNum',
    variables: [Variable1, Variable1, Variable1],
    functions: [FunctionData3, FunctionData3, FunctionData3],
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

export { TestNode, testClass, testClass2, storyTestClass }
