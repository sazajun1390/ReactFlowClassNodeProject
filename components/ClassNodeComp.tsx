import { useCallback, memo } from 'react';
import { Handle, Position, useReactFlow, useStoreApi } from 'reactflow';
import {
  Flex,
  Circle,
  Box
} from '@chakra-ui/react';
const editNode = ({ value, handleId, nodeId }) => {
  const { setNodes, getNodes, } = useReactFlow();
  const store = useStoreApi();
  
}
const classNodeComp = () => {
  
}