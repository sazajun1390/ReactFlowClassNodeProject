import { FC, useEffect, Key, memo} from 'react'
import { 
  Box,
  useColorModeValue,
  useBreakpointValue,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  Button,
  StackDivider,
  HStack,
  IconButton
} from '@chakra-ui/react'
import { FuncCard, VarCard, } from '../type/ClassNodeComp';
import { CloseIcon, EditIcon } from '@chakra-ui/icons';

const paramCard: FC< FuncCard | VarCard > = (props) =>{
  const {setter, ...Obj} = props;
  let contxt: JSX.Element;
  
  if('variableName' in props){
    contxt = 
      <>
        <HStack justify={'space-between'} pb={2}>
          <Box>{props.VarId}. </Box>
          <IconButton 
            icon={<CloseIcon/>}
            aria-label='delete varCard'
            size={'sm'}
            onClick={()=>{

            }}
          >
          </IconButton>
        </HStack >
        <Box>VarName: {props.variableName}</Box>
        <Box>type: {props.type}</Box>
        <Box>
          <IconButton 
            icon ={<EditIcon/>}
            aria-label='edit variable' 
            size={'sm'}
            onClick={() => { 
              setter({state:Obj,type:'variables'});
              //setter(Obj)
            }}
          ></IconButton>
        </Box>
      </>
  }else{
    contxt = 
      <>
        <HStack justify={'space-between'} pb={2}>
          <Box>{props.FuncId}. </Box>
          <IconButton
            aria-label='delete funcCard'
            icon={<CloseIcon/>}
            size={'sm'}
            onClick={()=>{}}
          >
          </IconButton>
        </HStack>
        <Box>FuncName: {props.functionName}</Box>
        <Box>type: {props.type}</Box>
        <Box>
          <IconButton 
            aria-label='edit Function'
            icon ={<EditIcon/>} 
            size={'sm'}
            onClick={() => { 
              setter({state:Obj,type:'functions'});
              //setter(Obj)
            }}
          ></IconButton>
        </Box>
      </>
  }

  return(
    <Box>
      <Stack w={40} p={3} bg='white' rounded="md" shadow="md" border='1px' borderColor='gray.500' divider={<StackDivider borderColor='gray.200' />}>
        {contxt}
      </Stack>
    </Box>
  )

}

export default memo(paramCard);