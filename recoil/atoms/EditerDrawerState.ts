import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { useCallback, useId } from "react";
import { useCallbackRef } from "@chakra-ui/react";
import type { UseDisclosureProps } from "@chakra-ui/react";

export const EditorDisclojureState = atom<boolean>({
  key: 'EditorDisclojureState',
  default: false
})

export const useEditorDisclojure = (props: UseDisclosureProps = {}) => {

  const {
    onClose: onCloseProp,
    onOpen: onOpenProp,
    isOpen: isOpenProp,
    id: idProp,
  } = props

  const handleOpen = useCallbackRef(onOpenProp)
  const handleClose = useCallbackRef(onCloseProp)

  const isOpen = useRecoilValue(EditorDisclojureState);
  const isControlled = isOpenProp !== undefined

  const uid = useId()
  const id = idProp ?? `disclosure-${uid}`

  const EditorIsOpen = isOpen
  
  const EditorOnOpen = (): void=> {
    const setState = useSetRecoilState(EditorDisclojureState);
    useCallback(
      () => {
        if (!isControlled) 
          setState(true)
          
        handleOpen?.()
      },[setState,handleOpen]
    );
  }
  
  const EditorOnClose = (): void =>{
    const setState = useSetRecoilState(EditorDisclojureState);
    useCallback(
      ()=>{
        if(!isControlled)
          setState(false)

        handleClose?.()
      },[setState,handleClose]
    )
  }
  
  const EditorOnToggele = ():void => {
    const state = useRecoilValue(EditorDisclojureState);
    useCallback(()=>{
      if(state == true)
        EditorOnClose()
      else
        EditorOnOpen()
    },[state,EditorOnClose,EditorOnOpen])
  }

  return {
    EditorIsOpen,
    EditorOnClose,
    EditorOnOpen,
    EditorOnToggele,
  }
}
