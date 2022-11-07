import { FC, useEffect, Key, memo, useState} from 'react'
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

interface cardProps {
  Name:string,
  id:number,
  type:string,
  closeAriaLabel:string,
  editAriaLabel:string
}

const ParamCard: FC< FuncCard | VarCard > = (props) =>{
  const {setter, ...Obj} = props;
  const [typeState] = useState(('variableName' in props)? 'variables' : 'functions');
  // 'variables' 'functions'
  const [cardState] = useState<cardProps>(
    ('variableName' in props)?{
      Name: 'VarName: '+ props.variableName,
      id: props.VarId,
      type:'type: '+ props.type,
      closeAriaLabel:'delete varCard',
      editAriaLabel:''
    }:{
      Name: 'FuncName: '+ props.functionName,
      id:props.FuncId,
      type:'type: '+ props.type,
      closeAriaLabel:'delete funcCard',
      editAriaLabel:''
    }
  )

  return(
    <Box>
      <Stack w={40} p={3} bg='white' rounded="md" shadow="md" border='1px' borderColor='gray.500' divider={<StackDivider borderColor='gray.200' />}>
      <HStack justify={'space-between'} pb={2}>
        <Box>{cardState.id}. </Box>
        <IconButton 
          icon={<CloseIcon/>}
          aria-label = { cardState.closeAriaLabel }
          size={'sm'}
          onClick={()=>{
          }}
        >
        </IconButton>
        </HStack >
        <Box>{ cardState.Name }</Box>
        <Box>{ cardState.type }</Box>
        <Box>
          <IconButton 
            icon ={<EditIcon/>}
            aria-label='edit variable' 
            size={'sm'}
            onClick={() => { 
              setter({state:Obj,type:typeState});
            //setter(Obj)
            }}
          ></IconButton>
        </Box>
      </Stack>
    </Box>
  )

  /*
  const contxt: JSX.Element = ('variableName' in props)? 
  //variableが存在
  <>
    <HStack justify={'space-between'} pb={2}>
      <Box>{cardState.id}. </Box>
      <IconButton 
        icon={<CloseIcon/>}
        aria-label = { cardState.closeAriaLabel }
        size={'sm'}
        onClick={()=>{
        }}
      >
      </IconButton>
    </HStack >
    <Box>{ cardState.Name }</Box>
    <Box>{ cardState.type }</Box>
    <Box>
      <IconButton 
        icon ={<EditIcon/>}
        aria-label='edit variable' 
        size={'sm'}
        onClick={() => { 
          setter({state:Obj,type:typeState});
          //setter(Obj)
        }}
      ></IconButton>
    </Box>
  </>
  :
  <>
    <HStack justify={'space-between'} pb={2}>
      <Box>{cardState.id}. </Box>
        <IconButton
          aria-label={ cardState.closeAriaLabel }
          icon={<CloseIcon/>}
          size={'sm'}
          onClick={()=>{}}
        >
        </IconButton>
      </HStack>
      <Box>{ cardState.Name }</Box>
      <Box>{ cardState.type }</Box>
      <Box>
      <IconButton 
        aria-label='edit Function'
        icon ={<EditIcon/>} 
        size={'sm'}
        onClick={() => { 
          setter({state:Obj,type:typeState});
          //setter(Obj)
        }}
      ></IconButton>
    </Box>
  </>
  */

/*
  <Stack w={40} p={3} bg='white' rounded="md" shadow="md" border='1px' borderColor='gray.500' divider={<StackDivider borderColor='gray.200' />}>
        <HStack justify={'space-between'} pb={2}>
        <Box>{cardState.id}. </Box>
        <IconButton 
          icon={<CloseIcon/>}
          aria-label = { cardState.closeAriaLabel }
          size={'sm'}
          onClick={()=>{
          }}
        >
        </IconButton>
        </HStack >
        <Box>{ cardState.Name }</Box>
        <Box>{ cardState.type }</Box>
        <Box>
          <IconButton 
            icon ={<EditIcon/>}
            aria-label='edit variable' 
            size={'sm'}
            onClick={() => { 
              setter({state:Obj,type:typeState});
            //setter(Obj)
            }}
          ></IconButton>
        </Box>
      </Stack>    
*/
}

export default memo(ParamCard);