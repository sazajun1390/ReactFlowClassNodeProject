import { Node, NodeTypes } from 'reactflow';
import { ReactNode,Dispatch,SetStateAction } from 'react';

interface ClassNodeData {
  /** 
  *
  * @minimum 1
  * 
  */
  className: string,
  variables: Array<VariableObj>
  functions: Array<FunctionObj>
}

interface VariableObj {
  /** 
  *
  * @minimum 1
  * 
  */
  VarId:number;
  /** 
  *
  * @minimum 1
  * 
  */
  variableName: string;
  /** 
  *
  * @minimum 1
  * 
  */
  type: string;
}

/*interface VarCard extends VariableObj {
  setter: Dispatch<SetStateAction<VariableObj | FunctionObj | null>>
}*/

interface VarCard extends VariableObj {
  setter: Dispatch<formObjectReducerState>
}


interface FunctionObj {
  /** 
  *
  * @minimum 1
  * 
  */
  FuncId:number;

  /** 
  *
  * @minimum 1
  * 
  */
  functionName: string;

  /** 
  *
  * @minimum 1
  * 
  */
  type: string;
}

/*interface FuncCard extends FunctionObj {
  setter: Dispatch<SetStateAction<VariableObj | FunctionObj | null>>
}*/

interface FuncCard extends FunctionObj {
  setter: Dispatch<formObjectReducerState>
}

type ClassNode = Node<ClassNodeData>

type formObjectType = null | FunctionObj | VariableObj

interface formObjectReducerState {
  state:formObjectState;
  
  /** 
  *
  * @minimum 1
  * 
  */
  type:string;
}


export type {
  ClassNodeData,
  VariableObj,
  VarCard,
  FunctionObj,
  FuncCard,
  ClassNode,
  formObjectReducerState,
  formObjectType,
}