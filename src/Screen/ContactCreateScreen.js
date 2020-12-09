import React, { useContext, useEffect, useState } from "react";
import {StyleSheet} from "react-native";
import { H3,Container,Content,Text,Textarea,Button } from "native-base";

// Trae el contexto de los contactos
import {ContactsContext} from "../context/ContactsContext";

const ContactCreateScreen = () =>{
    const [contact,setContact] = useState("");
    const contactsContext = useContext(ContactsContext);
    const [contacts, addNewContacts] = contactsContext;

    const handlerNewContact =()=>{
        addNewContacts({contact});
    }

    return(
        <Content>
            <Container>
                <H3>Ingresa la informacion del contacto</H3>
                <Textarea rowSpan={1} bordered placeholder="Primer Nombre" value={contact} onChangeText={setContact}/>
                <Button onPress={handlerNewContact}>
                    <Text>Guardar</Text>
                </Button>
            </Container>
        </Content>
    );
};

const styles =StyleSheet.create({});
export default ContactCreateScreen;