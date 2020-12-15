import { Button, Container, Content,Icon,} from "native-base";
import React,{useContext,useState} from "react";
import {StyleSheet} from "react-native";

//Utilizando el contexto de contactos
import {ContactContext} from "../context/ContactsContext";

const ContactInfoScreen = ({navigation, route}) =>{

    const {id} = route.params;
    const [nombre,setNombre] =useState(null);
    const [apellido,setApellido] =useState(null);
    const [numero,setNumero] =useState(null);
    const [empresa,setEmpresa] =useState(null);
    const [email,setEmail] =useState(null);
    const [grupo,setGrupo] =useState(null);
    const [direccion,setDireccion]=useState(null);
    const [nota,setNotas]=useState(null);
    const [estatus, setEstatus] = useState(false);
    const [enableSave, setEnableSave] = useState(true);
    const [errorgrafic, setErrorGrafic] = useState(false);

    const contactContext = useContext(ContactContext);
    const {contacts,refreshContacts, getContactId} = contactContext;
    



    const obtenerContacto = (id,contacts) =>{
        const getContact =()=>{
            getContactId(id);
        };
        getContact();

        if(contacts.length){
            setNombre(contact[0].nombre);
            setApellido(contact[0].apellido);
            setNumero(contact[0].numero);
            setEmpresa(contact[0].empresa);
            setDireccion(contact[0].direccion);
            setEmail(contact[0].email);
            setNotas(contact[0].nota);
            
        }
    }
    console.log(contacts);
    console.log(nombre);
    

    return(
        <Container>
            <Content>
                <Button onPress={()=>{navigation.navigate("contactModyfay")}}><Icon name="edit" type="AntDesign"/></Button>
            </Content>
        </Container>
    )
};

const styles = StyleSheet.create({});

export default ContactInfoScreen;