import { Button, Container, Content, Fab, Header, Icon, Input, Item, List, ListItem, Text } from "native-base";
import React, { useContext } from "react";
import { StyleSheet} from 'react-native';
import { color } from "react-native-reanimated";

//Utilizando el contexto de contactos
import {ContactsContext} from "../context/ContactsContext";

const ContactListScreen = ({navigation})=>{
    const {contacts} = useContext(ContactsContext);
    return(
         <Container style={{backgroundColor:"black"}}>
             <Content>
                 <Header searchBar style={{backgroundColor:"#393e46"}}>
                     <Item>
                         <Input placeholder="Buscar" />
                         <Button style={{backgroundColor:"#ffd369"}} onPress={()=>{navigation.navigate("contactsCreate")}}><Icon name="plus" type="FontAwesome" /></Button>
                     </Item>
                 </Header>
                 <List >
                     {contacts ? contacts.map((contact)=>(
                         <ListItem style={{ flex:1,margin:10,borderRadius:15,borderWidth:3,borderColor:"white"}}>
                             {console.log(contact)}
                             <Text style={{color:"white"}} key={contact.id}>{contact.primerNombre}-{contact.primerApellido}-{contact.grupo}-{contact.email}</Text>
                         </ListItem>
                        ))
                     : null}
                 </List>
             </Content>
         </Container>
    )
};

const styles = StyleSheet.create({});

export default ContactListScreen;