import React, { useContext, useEffect,useState } from "react";
import {StyleSheet} from "react-native";
import { H3,Container,Content,Text,Textarea,Button } from "native-base";

// Trae el contexto de los contactos
import {ContactContext} from "../context/ContactsContext";

const ContactCreateScreen = ({navegation}) =>{

    
    const [nombre,setNombre] =useState("");
    const [apellido,setApellido] =useState("");
    const [numero,setNumero] =useState("");
    const [empresa,setEmpresa] =useState("");
    const [email,setEmail] =useState("");
    const [grupo,setGrupo] =useState("");
    const [direccion,setDireccion]=useState("");
    const [nota,setNotas]=useState("");

    const[enableSave,setEnableSave] = useState(true);
    const[errorContact,setErrorContacts] =useState(false);
    const contactContext = useContext(ContactContext);

    //const [addNewContact, refreshContacts] = contactContext;

    
    
    useEffect(()=>{
        if(nombre) setEnableSave(false);
        else setEnableSave(true);
    },[nombre]);

    const handlerNewContact = async ()=>{
        if(nombre && apellido && numero && empresa && email && grupo && direccion && nota){
            await addNewContact(nombre, apellido, numero, empresa, email, grupo,direccion, nota,refreshContacts);
            //Regresara 
            //navegation.goBack();
            console.log("Felicidades has podido insertar ahora trabaja con el diseño");
        }else{
            setErrorContacts(true);
            console.log("Llego hasta aqui error en la insercion")
        }  
    };


    return(
        <Content>
            <Container>
                <H3>Ingresa la informacion del contacto</H3>
                <Textarea rowSpan={1} bordered placeholder="Primer Nombre" value={nombre} onChange={setNombre}/>
                <Textarea rowSpan={1} bordered placeholder="Primer apellido" value={apellido} onChange={setApellido} />
                <Textarea rowSpan={1} bordered placeholder="Numero de telefono" value={numero} onChange={setNumero}/>


                <Textarea rowSpan={1} bordered placeholder="Correo Electronico" value={email} onChange={setEmail}/>
                <Textarea rowSpan={1} bordered placeholder="Empresa" value={empresa} onChange={setEmpresa}/>
                <Textarea rowSpan={1} bordered placeholder="Grupo" value={grupo} onChange={setGrupo}/>
                <Textarea rowSpan={2} bordered placeholder="Direccion" value={direccion} onChange={setDireccion}/>
                <Textarea rowSpan={3} bordered placeholder="Nota" value={nota} onChange={setNotas}/>
                <Button onPress={handlerNewContact}>
                    <Text>Guardar</Text>
                </Button>
            </Container>
        </Content>
    );
};

const styles =StyleSheet.create({});
export default ContactCreateScreen;