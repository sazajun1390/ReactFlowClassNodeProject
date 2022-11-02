import { NodeProps } from "reactflow";
import create from "zustand";
import { ClassNode, ClassNodeData } from "../type/ClassNodeComp";
import { devtools } from "zustand/middleware";

type disclosure = {
  isOpen:  boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const useDisclojureStore = create(devtools<disclosure>((set) => ({
  isOpen: false,
  onClose: () => set({isOpen: false}),
  onOpen: () => set({isOpen: true}),
})))