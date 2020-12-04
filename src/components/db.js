import React from "react";
import * as SQLite from "expo-sqlite";

// Crea la base de dato 
const db = SQLite.openDatabase("quickContacts.db");

//Las funcionalidades de la base de dato

//Obtener todo los contactos del usuario

const getContacts =(setContactsFunc) =>{
    db.transaction(tx =>{
        tx.executeSql(
            "select * from contacts",[],
            (_,{ rows: { _array } }) => {
             setContactsFunc(_array);
            },
            (_t, error)=>{
                console.log("Error al momento de obtener la info de Contactos");
                console.log(error);
            },
            (_t,success)=>{
                console.log("Contactos obtenidos");
            }
        );
    });
};

//Insertar contacto

const insertContacts = (nombre, apellido, numero, empresa, email, grupo,direccion, nota, successFunc)=>{
    db.transaction(
        (tx)=>{
            tx.executeSql("insert into contacts (nombre,apellido,numero,empresa,email,grupo,direccion,nota) value(?,?,?,?,?,?,?,?)",[nombre, apellido, numero, empresa, email, grupo,direccion, nota])
        },
        (_t, error)=>{
            console.log("Error en insertar los valores de contactos");
            console.log(error);
        },
        (_t,_success)=>{
            successFunc;
        }
    );
};


//Borrar la tabla 

const dropDatabaseTableAsync = async() =>{
    return new Promise((resolve,reject)=>{
        db.transaction(
            (tx)=>{
                tx.executeSql("drop table contacts");
            },
            (_, result)=>{
                resolve(result);
            },
            (_, error)=>{
                console.log("Error al momento de borrar la tabla");
                reject(error);
            }
        );
    });
};


//Creacion de la tabla de contactos

const setupDatabaseTableAsync = async()=>{
    return new Promise((resolve,reject)=>{
        db.transaction(
            (tx)=>{
                tx.executeSql("create table if not exists contacts (id integer primary key not null, nombre text not null,apellido text not null,numero int not null,empresa text,email text,grupo text not null,direccion text, note text )")
            },
            (_t,error)=>{
                console.log("Error en la creacion de la tabla");
                reject(error);
                console.log(error);
            },
            (_t,success)=>{
                resolve(success);
            }
        )
    });
};


export const database ={
    getContacts,
    insertContacts,
    dropDatabaseTableAsync,
    setupDatabaseTableAsync,
};