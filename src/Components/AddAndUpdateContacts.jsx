import React from "react";
import { Modal } from "./Modal";
import { Field, Form, Formik } from "formik";

import { db } from "../Config/firebase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

export const AddAndUpdateContacts = ({ isOpen, onClose , isUpdate ,contact }) => {
  async function addContact(values) {
    try {
      const contactRef = await collection(db, "Contacts");
      await addDoc(contactRef, values);
      toast.success("Contact add Successfully")
      onClose()
    } catch (error) {
      console.log("Add contact error firebase " + error);
    }
  }
  async function updateContact(values,id) {
    try {
      const contactRef = doc(db, "Contacts", id);
      await updateDoc(contactRef,values);
      toast.success("Update Successfully")
      console.log("udate successfull");
      onClose()
    } catch (error) {
      console.log( "Update error firebase"+error);
    }
  }

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
          initialValues={ isUpdate? {
            name: contact.name,
            email: contact.email,
          }:
          {
            name: "",
            email: "",
          } }
          onSubmit={(values) => {
            console.log(values);
            {isUpdate ? updateContact(values,contact.id) : addContact(values)}
          }}
        >
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Name </label>
              <Field
                type="text"
                name="name"
                className="border-2 h-10  font-semibold pl-2 "
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Email </label>
              <Field
                type="email"
                name="email"
                className="border-2 h-10  font-semibold pl-2 "
              />
            </div>

            <button
              type="submit"
              className="self-end text-white rounded-lg font-bold border bg-orange px-3 py-1.5"
            >
              {isUpdate ? "Update Contact" : "add Contact"}
            </button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};
