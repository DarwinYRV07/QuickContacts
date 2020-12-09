import React, { useEffect, createContext, useState } from "react";
import { ReloadInstructions } from "react-native/Libraries/NewAppScreen";
import { database } from "../components/db";

//Creando el contexto de los contactos
export const ContactsContext = createContext({});

export const ContactsContextProvider = props =>{
    //Obtener los valores iniciales para el contexto
    const{contacts: initialContact,children} = props;

    //Almacena los valores de estado
    const [contacts, setContacts] = useState(initialContact);

    //Cargamos y obtenemos las notas
    useEffect(()=>{
        refreshContacts();
    },[]);

    const refreshContacts = () =>{
        return database.getContacts(setContacts);
    };

    const addNewContacts = (contacts) =>{
        return database.insertContacts(contacts, refreshContacts);
    };
    
    //Crear el objeto de contexto
    const contactsContext ={
        contacts,
        addNewContacts,
    };

    //Pasa los valores al proveedor y retornarlo
    return(
        <ContactsContext.Provider value={contactsContext}>
            {children}
        </ContactsContext.Provider>
    ); 
};




