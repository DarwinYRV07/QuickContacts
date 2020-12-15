import React,{useEffect,useState, createContext} from "react";
import {database} from "../components/db";

//Creando contexto de contactos

export const ContactContext = createContext({});

export const ContactContextProvider = (props) =>{
    //obtener los valore iniciales para el contexto
    //se optienen desde los props
    const {contacts:initialContact,children} = props;

    //Almacenar los valores en el estado
    const[contacts,setContacts] = useState(initialContact);
    const [contact,setContact] = useState("");

    //Cargar u obtener los contactos
    useEffect(()=>{
        refreshContacts();
    },[]);

    //Refrescar las notas cuando se modifiquen
   /* useEffect(()=>{
        refreshContacts();
    },[contacts]);*/


    const refreshContacts = () =>{
        return database.getContacts(setContacts);
    };

    const getContactId = (id) =>{
        return database.getContactById(id,setContact);
    }
/*
    const deleteContact = (id)=>{
        return database.deleteContactById(id,refreshContacts);
    };
*/
    const updateContacts =(nombre, apellido, numero, empresa, email, grupo,direccion, nota)=>{
        return database.setupateContacts(nombre, apellido, numero, empresa, email, grupo,direccion, nota,refreshContacts);
    }

    const addNewContact = async (nombre, apellido, numero, empresa, email, grupo,direccion, nota) =>{
        await database.insertContacts(nombre, apellido, numero, empresa, email, grupo,direccion, nota, refreshContacts);
        return refreshContacts();
        
    };

    //Crear el objeto de context
    const contactContext ={
        contacts,
        addNewContact,
        contact,
        getContactId,
        updateContacts,
    };

    return(
        <ContactContext.Provider value={contactContext}>
            {children}
        </ContactContext.Provider>
    );
};