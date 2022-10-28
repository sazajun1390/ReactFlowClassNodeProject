import { NodeProps } from "reactflow";
import create from "zustand/react";
import { ClassNode, ClassNodeData } from "../type/ClassNodeComp";

type disclosure = {
  isOpen:  boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const useDisclojureStore = create<disclosure>((set) => ({
  isOpen: false,
  onClose: () => set({isOpen: false}),
  onOpen: () => set({isOpen: true}),
}))