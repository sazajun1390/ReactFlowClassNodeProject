import { atom ,useRecoilValue, useSetRecoilState, useRecoilState} from "recoil";
import { useCallback } from "react";
import { useCallbackRef } from "@chakra-ui/react";

const EditorDisclojureState = atom<boolean>({
  key: 'EditorDisclojureState',
  default: false
})


const EditorIsOpen = (): boolean => {
  return useRecoilValue(EditorDisclojureState);
}

const EditorOnOpen = (): void=> {
  const setState = useSetRecoilState(EditorDisclojureState);
  useCallback(
    () => { setState(true) },[setState]
  );
}

const EditorOnClose = (): void =>{
  const setState = useSetRecoilState(EditorDisclojureState);
  useCallback(
    ()=>setState(false),[setState]
  )
}

const EditorOnToggele = ():void => {
  const [state,setState] = useRecoilState(EditorDisclojureState);
  useCallback(()=>{
    if(state == true)
      setState(false)
    else
      setState(true);
  },[state,setState])
}

export {
  EditorDisclojureState,
  EditorIsOpen,
  EditorOnClose,
  EditorOnOpen,
  EditorOnToggele,
}