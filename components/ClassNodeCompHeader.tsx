import { useCallback, useRef, memo , FC ,useState, Key} from 'react';
import { Handle, NodeProps, Position, useReactFlow, useStoreApi } from 'reactflow';
import {
  Divider,
  Box,
  Button,
  Stack,
  HStack,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import type { VariableObj, FunctionObj, ClassNode, ClassNodeData} from '../type/ClassNodeComp'
import { useDisclojureStore } from '../zustand/EditorsDIscrojure';
import { useEditData } from '../zustand/EditData';

