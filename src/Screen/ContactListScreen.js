import { Button, Container, Content, Header, Icon, Input, Item, List, ListItem,Text, View } from "native-base";
import React, { useContext,useState ,useEffect} from "react";
import { StyleSheet} from 'react-native';
import * as Font from "expo-font";



//Utilizando el contexto de contactos
import {ContactContext} from "../context/ContactsContext";
import { TouchableOpacity } from "react-native-gesture-handler";

const ContactListScreen = ({navigation})=>{
    const {contacts} = useContext(ContactContext);
    const [fontsLoaded,setFontsLoaded] = useState(false);

        const LoadFonts = async() => {
            await Font.loadAsync({
            "SF-Pro-Display-Medium": require(`../../assets/fonts/SF-Pro-Display-Medium.otf`),
            "SF-Pro-Display-Heavy":require(`../../assets/fonts/SF-Pro-Display-Heavy.otf`),
            "SF-Pro-Text-BoldItalic":require(`../../assets/fonts/SF-Pro-Text-BoldItalic.otf`)
          });
  
            setFontsLoaded(true);
        }

        useEffect(() => {
            if(!fontsLoaded){
             LoadFonts();
          }
        });


       // useEffect(() => {
       //      const loadFontsAsync = async () => {
       //       await Font.loadAsync({
       //         Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
       //       }).then(() => {
       //         setFontsLoaded(true);
       //       });
       //     };
        
       //     loadFontsAsync();
       //   }, []);

    return(
         <Container style={{backgroundColor:"black",flex:1}}>
             {/*<View>
             <SectionListContacts
                                ref={s=>this.sectionList=s}
                                sectionListData={this.state.dataArray}
                                sectionHeight={50}
                                initialNumToRender={this.state.dataArray.length}
                                otherAlphabet="#"
                            />
             </View>*/}
                 <Header searchBar style={{backgroundColor:"#393e46",padding:34,flex:1,}}>
                     <Item>
                         <Input placeholder="Buscar" />
                         <Button style={{backgroundColor:"#ffd369"}} onPress={()=>{navigation.navigate("contactsCreate")}}><Icon name="plus" type="FontAwesome" /></Button>
                     </Item>
                 </Header>             
             <Content style={{}}>
                 <List >
                    <View style={styles.ViewCategorias}>
                        <Button style={styles.botonCategorias}> 
                            <Text style={styles.TextCategoria}>Amigos</Text>
                        </Button>
                        <Button style={styles.botonCategorias}>
                            <Text style={styles.TextCategoria}>Empresa</Text>
                        </Button>
                        <Button style={styles.botonCategorias}>
                            <Text style={styles.TextCategoria}>Familia</Text>
                        </Button>
                    </View>
                     {contacts ? contacts.map((contact)=>(
                           <TouchableOpacity key={contact.id.toString()} onPress={()=>{navigation.navigate("contactModyfay",{id: contact.id});}}>
                               <ListItem style={styles.nombreContactoItem} >
                                {console.log(contact)}
                                    <View style={{flex:1,}}>
                                        <Text style={styles.nombreContactoTtext} >{contact.nombre} {contact.apellido}{"\n"}{contact.numero}{"\n"}{contact.email}</Text>
                                    </View>
                                </ListItem>
                           </TouchableOpacity> 
                            

                        ))
                     : null}
                 </List>
             </Content>
         </Container>
    )
};

const styles = StyleSheet.create({
    nombreContactoItem:{
        flex:1,
        borderColor:"white",
    },
    nombreContactoTtext:{
        flex:1,
        color:"white",
        fontFamily:"SF-Pro-Display-Medium",

    },
    ViewCategorias:{
        backgroundColor:"black", 
        flexDirection:"row",
    },
    botonCategorias:{
        backgroundColor:"transparent",
        flex:1,
        borderColor:"white",
        borderWidth:1,
    },
    TextCategoria:{
        flex:1,
        fontSize:18,
        color:"#ffd369",
        textAlign:"center",
        fontFamily:"SF-Pro-Text-BoldItalic",

    }


});

export default ContactListScreen;