import React from "react";
import { NodeProps } from "reactflow";
import ClassNodeComp from "../components/ClassNodeComp";
import type { FunctionObj, VariableObj, ClassNode} from "../type/ClassNodeComp";

const Variable: VariableObj = {
  variableName: 'Num',
  type: 'Integer'
}

const FunctionData: FunctionObj = {
  functionName: 'Calc',
  type: 'Integer'
}

const testClass: ClassNode = {
  id: '0',
  type: 'custom',
  position: { x:0, y:0},
  data: {
    className: 'calcNum',
    variables: [Variable],
    functions: [FunctionData]
  }
}

export const TestNode:Array<any> = [testClass] 