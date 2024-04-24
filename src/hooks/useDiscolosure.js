import React, { useState } from 'react'

const useDiscolosure = () => {


  const[isOpen,setIsOpen] = useState(false);

  const onOpen = ()=>{
    setIsOpen(true);
  }
  const onClose = ()=>{
    setIsOpen(false);
  }



  return (
    {isOpen,onClose,onOpen}
  )
}

export default useDiscolosure