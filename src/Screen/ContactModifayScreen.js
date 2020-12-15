import React,{useContext,useState,useEffect} from "react";
import {StyleSheet} from "react-native";
import {  H3,Container,Content,Text,Input,Button, View } from "native-base";

//Utilizando el context de contactos
import {ContactContext} from "../context/ContactsContext";

const ContactModifatScreen = ({route,navigation}) =>{
    const {id} = route.params;
    console.log(id);
    const [nombre,setNombre] =useState(null);
    const [apellido,setApellido] =useState(null);
    const [numero,setNumero] =useState(null);
    const [empresa,setEmpresa] =useState(null);
    const [email,setEmail] =useState(null);
    const [grupo,setGrupo] =useState(null);
    const [direccion,setDireccion]=useState(null);
    const [nota,setNotas]=useState(null);

    const [enableSave, setEnableSave] = useState(true);
    const [errorContact, setErrorContact] = useState(false);

    const contactContext = useContext(ContactContext);
    const {contact, getContactId,updateContacts,refreshContacts} = contactContext;

    useEffect(()=>{
        const getContact = async ()=>{
            await getContactId(id)
        };
        getContact();
        if(contact.length){
            setNombre(contact[0].nombre);
            console.log(nombre);
        }  
    },[id,contact]);

    const handlerSaveContact = async ()=>{
        if(nombre, apellido, numero, empresa, email, grupo,direccion, nota,id){
            await updateContacts(nombre, apellido, numero, empresa, email, grupo,direccion, nota,id,refreshContacts);
            navigation.goBack();
        }else{
            setErrorContact(true);
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
                <Button style={styles.estiloGuardar} onPress={handlerSaveContact} disabled={enableSave}>
                    <Text style={{color:"black"}}>Guardar</Text>
                </Button>

            </Container>
        </Content>
    )
};

const styles = StyleSheet.create({
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

    },
    estiloGuardar:{
        flex:0,
        alignContent:"center",
        justifyContent:"center",
        backgroundColor:"#ffd369",
        marginTop:15,
        marginBottom:10
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

export default ContactModifatScreen;