import React from "react";
import { NodeProps } from "reactflow";
import ClassNodeComp from "../components/ClassNodeComp";
import type { FunctionObj, VariableObj, ClassNode} from "../type/ClassNodeComp";

const Variable1: VariableObj = {
  VarId:1,
  variableName: 'Num',
  type: 'Integer'
}

const FunctionData1: FunctionObj = {
  FuncId:1,
  functionName: 'Calc',
  type: 'Integer'
}

const FunctionData2: FunctionObj = {
  FuncId:2,
  functionName: 'Calc2',
  type: 'Integer'
}

const Variable2: VariableObj = {
  VarId:2,
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