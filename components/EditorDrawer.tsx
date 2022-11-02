import { FC } from 'react'
import { useForm } from 'react-hook-form'
import shallow from 'zustand/shallow'
import { useDisclojureStore } from '../zustand/EditorDIscrojure'
import { 
  Drawer, 
  DrawerContent, 
  DrawerOverlay,
  DrawerCloseButton,
  
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button
} from '@chakra-ui/react'
import { useEditData } from '../zustand/EditData'

const EditDrawer:FC = (props) => {

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const { EditorIsOpen, EditorOnClose } = useDisclojureStore((state)=> ({
    EditorIsOpen: state.isOpen,
    EditorOnClose: state.onClose
  }),shallow)

  const { editId, editClassName, editFuncs, editVars } = useEditData( state => ({
    editId: state.id,
    editClassName: state.className,
    editFuncs: state.functions,
    editVars: state.variables
  }))

  return (
    <Drawer
      isOpen={EditorIsOpen}
      onClose={EditorOnClose}
      placement='right'
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />

      </DrawerContent>
    </Drawer>
  )
}