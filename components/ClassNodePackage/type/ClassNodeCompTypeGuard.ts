import { Node } from 'reactflow'
import { ClassNodeData } from './ClassNodeComp'
//typeガード

const implementsClassNode = (arg: Node<any>): arg is Node<ClassNodeData> => {
  return 'className' in arg.data
}

export { implementsClassNode }
