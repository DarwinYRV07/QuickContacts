import React, { useContext, useEffect,useState } from "react";
import {StyleSheet} from "react-native";
import { H3,Container,Content,Text,Input,Button, View} from "native-base";

// Trae el contexto de los contactos
import {ContactContext} from "../context/ContactsContext";

const ContactCreateScreen = ({navigation}) =>{

    
    const [nombre,setNombre] =useState("");
    const [apellido,setApellido] =useState("");
    const [numero,setNumero] =useState("");
    const [empresa,setEmpresa] =useState("");
    const [email,setEmail] =useState("");
    const [grupo,setGrupo] =useState("");
    const [direccion,setDireccion]=useState("");
    const [nota,setNotas]=useState("");

    const[enableSave, setEnableSave] = useState(true);
    const[errorContact,setErrorContacts] =useState(false);
    const contactContext = useContext(ContactContext);

    const {addNewContact, refreshContacts} = contactContext;

    
    // Cuando el valor del contacto cambia
    useEffect(()=>{
        if(nombre,apellido,grupo,email) setEnableSave(false);
        else setEnableSave(true);
    },[nombre,apellido,grupo,email]);

    const handlerNewContact = async ()=>{
        if(nombre,apellido,grupo,email){
            await addNewContact(nombre, apellido, numero, empresa, email, grupo,direccion, nota,refreshContacts);
        
            //Regresara 
            navigation.goBack();
            console.log("Felicidades has podido insertar ahora trabaja con el diseño");
        }else{
            setErrorContacts(true);
        }  
    };


    return(
        <Content style={{}}>
            <Container style={{backgroundColor:"black",justifyContent:"center"}}>
                
                <View style={{flex:1}}>
                    <H3 style={styles.estiloTitulo}>Ingresa la informacion del contacto</H3>
               
                    <View style={styles.contenedor}>
                        <Input style={errorContact ? styles.InputError: styles.ContenedorInfo } bordered placeholder="Primer Nombre" value={nombre} onChangeText={setNombre}/>
                        <Input style={errorContact ? styles.InputError: styles.ContenedorInfo } bordered placeholder="Primer apellido" value={apellido} onChangeText={setApellido} />
                        <Input style={styles.ContenedorInfo } bordered placeholder="Numero de telefono" value={numero} onChangeText={setNumero}/>
                        <Input style={styles.ContenedorInfo } bordered placeholder="Correo Electronico" value={email} onChangeText={setEmail}/>
                        <Input style={styles.ContenedorInfo } bordered placeholder="Empresa" value={empresa} onChangeText={setEmpresa}/>
                        <Input style={errorContact ? styles.InputError: styles.ContenedorInfo } bordered placeholder="Grupo" value={grupo} onChangeText={setGrupo}/>
                        <Input style={styles.ContenedorInfo } bordered placeholder="Direccion" value={direccion} onChangeText={setDireccion}/>
                        <Input style={styles.ContenedorInfo } bordered placeholder="Nota" value={nota} onChangeText={setNotas}/>
                    </View>
                </View>
                { errorContact ? (<Text style={styles.error}>Debes llenar por lo menos el nombre, apellido, grupo y su correo!!!!</Text>):null}
                <View style={{flex:0.3}}>
                <Button style={styles.estiloGuardar} onPress={handlerNewContact} disabled={enableSave}>
                    <Text style={{color:"black"}}>Guardar</Text>
                </Button>
                </View>
            </Container>
        </Content>
    );
};

const styles =StyleSheet.create({
    ContenedorInfo:{
        flex:1,
        margin:3,
        borderColor:"#ffd369",
        borderWidth:0,
        backgroundColor:"black",
        color:"white",
        borderRadius:9,
    },
    contenedor:{
        flex:18, 
        backgroundColor:"#ffd369",
        margin:19,
        borderRadius:3
    },
    estiloTitulo:{
        flex:1,
        margin:5,
        marginTop:15, 
        backgroundColor:"#ffd369", 
        color:"black",
        textAlign:"center",
        borderRadius:3

    },
    estiloGuardar:{
        backgroundColor:"#ffd369",
        marginTop:15,
        marginBottom:10,
        left:160,
    },
    error:{
        backgroundColor:"red",
        textAlign:"center",
        color:"black"
    },
    InputError:{
        flex:1,
        margin:4,
        borderColor:"red",
        borderWidth:2,
        backgroundColor:"black",
        color:"white",
        borderRadius:5,
    },
});
export default ContactCreateScreen;