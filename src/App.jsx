import { useEffect, useState } from "react";
import "./App.css";
import { Nav } from "./Components/Nav";
import { IoSearch } from "react-icons/io5";
import { FaPlusCircle } from "react-icons/fa";
import { collection, getDoc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./Config/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Contacts } from "./Components/Contacts";
import { Modal } from "./Components/Modal";
import { AddAndUpdateContacts } from "./Components/AddAndUpdateContacts";
import useDiscolosure from "./hooks/useDiscolosure";

function App() {
  const [contacts, setContacts] = useState([]);
  const [filteredContactsState, setFilteredContacts] = useState([]);

  const { isOpen, onClose, onOpen } = useDiscolosure();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactRef = collection(db, "Contacts");

        onSnapshot(contactRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });

          setContacts(contactLists);
          setFilteredContacts(contactLists);
        });
      } catch (error) {
        console.log(error);
      }
    };

    getContacts();
  }, []);

  const filterContacts = async (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(value)
    );
    setFilteredContacts(filtered);
  };

  return (
    <>
      <div className="mx-auto max-w-[370px] px-4">
        <Nav />

        <div className="flex gap-2">
          <div className="flex relative items-center flex-grow">
            <IoSearch className="text-white text-3xl ml-2 absolute" />
            <input
              onChange={filterContacts}
              type="search"
              className="h-10 text-white pl-10 outline-none bg-transparent border font-bold border-white rounded-lg flex-grow"
            />
          </div>

          <FaPlusCircle
            onClick={onOpen}
            className="text-white cursor-pointer text-5xl"
          />
        </div>

        <div>
          {filteredContactsState.map((contact) => {
            return <Contacts contact={contact} />;
          })}
        </div>

        <AddAndUpdateContacts
          isOpen={isOpen}
          onClose={onClose}
        ></AddAndUpdateContacts>
      </div>
      <ToastContainer position="bottom-center" />
    </>
  );
}

export default App;
