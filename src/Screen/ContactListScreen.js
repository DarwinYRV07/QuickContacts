import { Button, Container, Content, Fab, H2, Header, Icon, Input, Item, List, ListItem, Text, View } from "native-base";
import React, { useContext,useState ,useEffect} from "react";
import { StyleSheet} from 'react-native';
import { color } from "react-native-reanimated";
import * as Font from 'expo-font';
import {SectionListContacts} from 'react-native-sectionlist-contacts';

//Utilizando el contexto de contactos
import {ContactsContext} from "../context/ContactsContext";

const ContactListScreen = ({navigation})=>{
    const {contacts} = useContext(ContactsContext);
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
                         <ListItem style={styles.nombreContactoItem}>
                             {console.log(contact)}
                             <View style={{justifyContent: 'center',alignItems: 'center', flex:1,}}>
                             <Text style={styles.nombreContactoTtext} key={contact.id}>{contact.primerNombre} {contact.primerApellido}{"\n"}{contact.numero}{"\n"}{contact.email}</Text>
                             </View>
                         </ListItem>
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
        fontFamily:"SF-Pro-Text-BoldItalic"

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
        textAlign:"center"

    }


});

export default ContactListScreen;