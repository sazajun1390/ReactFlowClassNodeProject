import React from "react";
import { NodeProps } from "reactflow";
import ClassNodeComp from "../components/ClassNodeComp";
import type { FunctionObj, VariableObj, ClassNode} from "../type/ClassNodeComp";

const Variable1: VariableObj = {
  variableName: 'Num',
  type: 'Integer'
}

const FunctionData1: FunctionObj = {
  functionName: 'Calc',
  type: 'Integer'
}

const FunctionData2: FunctionObj = {
  functionName: 'Calc2',
  type: 'Integer'
}

const Variable2: VariableObj = {
  variableName: 'Num2',
  type: 'Integer'
}

const testClass: ClassNode = {
  id: '0',
  type: 'custom',
  position: { x:0, y:0},
  data: {
    className: 'calcNum',
    variables: [Variable1,Variable2],
    functions: [FunctionData1,FunctionData2]
  }
}

export const TestNode:Array<any> = [testClass] 