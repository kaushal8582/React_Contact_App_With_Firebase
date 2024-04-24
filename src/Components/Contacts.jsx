import { deleteDoc,doc } from "firebase/firestore";
import React from "react";

import { FaRegUserCircle } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { db } from "../Config/firebase";
import { AddAndUpdateContacts } from "./AddAndUpdateContacts";
import useDiscolosure from "../hooks/useDiscolosure";
import { toast } from "react-toastify";

export const Contacts = ({contact}) => {

  const {isOpen,onClose,onOpen} = useDiscolosure()


  const deleteContact = async(id)=>{
    try {
      
      const contactRef = doc(db, "Contacts", id);
      await deleteDoc(contactRef);
      console.log("delete successfull");

      toast.success("Contact Deleted Successfully")

    } catch (error) {
      toast.warning("contact is not deleted ")
      console.log( "delete contact error "+error);
    }
  }


  return (
    <>
    <div className="flex mt-2 rounded-lg justify-between h-[64px] bg-[#FFEAAE] px-3 gap-2 items-center">
      <div className="flex items-center gap-3">
      <FaRegUserCircle className="text-3xl text-start text-orange" />
      <div key={contact.id} className="font-bold ">
        <h2>{contact.name}</h2>
        <p className="text-[0.8rem] text-start ">{contact.email}</p>
      </div>
      </div>
      <div className="flex items-center cursor-pointer gap-2 text-2xl ml-3">
        <FaRegEdit onClick={onOpen} className="cursor-pointer" />
        <MdDelete onClick={()=> deleteContact(contact.id)} className="text-blue-800" />
      </div>

    </div>
    <AddAndUpdateContacts isUpdate contact ={contact} isOpen={isOpen}onClose={onClose} />
    </>
  );
};
