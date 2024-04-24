import React  from "react";
import {createPortal} from "react-dom"

import { RxCross1 } from "react-icons/rx";


export const Modal = ({ onClose, isOpen, children }) => {
  return createPortal( <>{isOpen && <>
  
    <div className="relative top-0 left-0 min-h-[200px] max-w-[400px] rounded-lg z-30 bg-white  m-auto p-4 ">

      <div className="flex justify-end">
        <RxCross1 onClick={onClose} className="font-bold cursor-pointer text-2xl self-end"/>
      </div>

    {children}

    </div>

    <div className="h-screen w-screen z-20 absolute top-0 left-0 backdrop-blur"/>


  </>}</>
  ,document.getElementById("modal-root"))
};
