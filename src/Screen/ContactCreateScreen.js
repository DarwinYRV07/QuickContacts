import React, { useContext, useEffect,useState } from "react";
import {StyleSheet} from "react-native";
import { CommonActions } from '@react-navigation/native'
import { H3,Container,Content,Text,Input,Button, View } from "native-base";

// Trae el contexto de los contactos
import {ContactContext} from "../context/ContactsContext";
import { color } from "react-native-reanimated";

const ContactCreateScreen = ({navigation}) =>{

    
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

    const {addNewContact, refreshContacts} = contactContext;

    
    
    useEffect(()=>{
        if(nombre,apellido,grupo) setEnableSave(false);
        else setEnableSave(true);
    },[nombre,apellido,grupo]);

    const handlerNewContact =  ()=>{
        if(nombre,apellido,grupo){
            addNewContact(nombre, apellido, numero, empresa, email, grupo,direccion, nota,refreshContacts);
            //Regresara 
            navigation.goBack();
            console.log("Felicidades has podido insertar ahora trabaja con el diseño");
        }else{
            setErrorContacts(true);
            console.log("Llego hasta aqui error en la insercion")
        }  
    };


    return(
        <Content style={{}}>
            <Container style={{backgroundColor:"black"}}>
                
                <View style={{flex:1}}>
                    <H3 style={styles.estiloTitulo}>Ingresa la informacion del contacto</H3>
               
                    <View style={styles.contenedor}>
                        <Input style={styles.ContenedorInfo } rowSpan={1} bordered placeholder="Primer Nombre" value={nombre} onChangeText={setNombre}/>
                        <Input style={styles.ContenedorInfo } rowSpan={1} bordered placeholder="Primer apellido" value={apellido} onChangeText={setApellido} />
                        <Input style={styles.ContenedorInfo } rowSpan={1} bordered placeholder="Numero de telefono" value={numero} onChangeText={setNumero}/>
                        <Input style={styles.ContenedorInfo } rowSpan={1} bordered placeholder="Correo Electronico" value={email} onChangeText={setEmail}/>
                        <Input style={styles.ContenedorInfo } rowSpan={1} bordered placeholder="Empresa" value={empresa} onChangeText={setEmpresa}/>
                        <Input style={styles.ContenedorInfo } rowSpan={1} bordered placeholder="Grupo" value={grupo} onChangeText={setGrupo}/>
                        <Input style={styles.ContenedorInfo } rowSpan={2} bordered placeholder="Direccion" value={direccion} onChangeText={setDireccion}/>
                        <Input style={styles.ContenedorInfo } rowSpan={3} bordered placeholder="Nota" value={nota} onChangeText={setNotas}/>
                    </View>
                </View>

                <Button onPress={handlerNewContact}>
                    <Text>Guardar</Text>
                </Button>

            </Container>
        </Content>
    );
};

const styles =StyleSheet.create({
    ContenedorInfo:{
        flex:1,
        margin:4,
        borderColor:"#ffd369",
        borderWidth:1,
        backgroundColor:"black",
        color:"white",
        borderRadius:5,
    },
    contenedor:{
        backgroundColor:"#ffd369",
        flex:1, 
        margin:15,
        borderRadius:5
    },
    estiloTitulo:{
        flex:0,
        margin:5,
        marginTop:15, 
        backgroundColor:"#ffd369", 
        color:"black",
        textAlign:"center",
        borderRadius:3

    }
});
export default ContactCreateScreen;