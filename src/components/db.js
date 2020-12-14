import React from "react";
import * as SQLite from "expo-sqlite";

// Crea la base de dato 
const db = SQLite.openDatabase("quickContacts.db");
//Las funcionalidades de la base de dato

//Obtener todo los contactos del usuario

// Obtener las notas del usuario
const getContacts = (setContactsFunc) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM contacts ORDER BY nombre",
        [],
        (_, { rows: { _array } }) => {
          setContactsFunc(_array);
        },
        (_t, error) => {
          console.log("Error al momento de obtener los contactos");
          console.log(error);
        },
        (_t, _success) => {
          console.log("Contactos obtenidas");
        }
      );
    });
  };

//Insertar contacto

const insertContacts = (nombre, apellido, numero, empresa, email, grupo,direccion, nota, successFunc)=>{
    db.transaction(
        (tx)=>{
            tx.executeSql(
                "INSERT INTO contacts (nombre,apellido,numero,empresa,email,grupo,direccion,nota) VALUES(?,?,?,?,?,?,?,?);",
            [
                nombre, 
                apellido, 
                numero, 
                empresa, 
                email, 
                grupo,
                direccion, 
                nota
            ])
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
                tx.executeSql("DROP TABLE quickContacts.contacts");
            },
            (_, result)=>{
               reject(result);
               console.log("tabla borrada");
            },
            (_, error)=>{
                console.log("Error al momento de borrar la tabla");
                resolve(error);
            }
        );
    });
};


//Creacion de la tabla de contactos

const setupDatabaseTableAsync = async()=>{
    return new Promise((resolve,reject)=>{
        db.transaction(
            (tx)=>{
                tx.executeSql("CREATE TABLE IF NOT EXISTS contacts (id integer PRIMARY KEY AUTOINCREMENT , nombre text NOT NULL,apellido text NOT NULL,numero text NOT NULL,empresa text,email text,grupo text NOT NULL,direccion text, nota text );")
            },
            (_t,error)=>{
                console.log("Error en la creacion de la tabla");
                reject(error);
                console.log(error);
            },
            (_t,success)=>{
                console.log("tabla creada");
                resolve(success);
            }
        )
    });
};

//Agrega un contacto por defecto

const setupContactsAsync = async ()=>{
    return new Promise((resolve, reject)=> {
        db.transaction(
            (tx) =>{
                tx.executeSql("INSERT INTO contacts (nombre,apellido,numero,empresa,email,grupo,direccion,nota) VALUES(?,?,?,?,?,?,?,?) ",[
                    "Darwin",
                    "NUEVA",
                    "99999999",
                    "UNICAH",
                    "unicha@gmail.com",
                    "trabajo",
                    "un lugar",
                    "Universidad donde ahi mucho trabajo que hacer",
                ]);

            },
            (_t,error) =>{
                console.log("Error al momento de insertar los valore por defecto");
                console.log(error);
                reject(error);
            },
            (_t, success) =>{
                console.log("Se inserto exitosamente");
                resolve(success);
            }
        );
    });
};

//Editar 
const setupateContacts = (nombre, apellido, numero, empresa, email, grupo,direccion, nota, successFunc) => {
    db.transaction(
      (tx) => {
        tx.executeSql("update contacts set nombre = ?, apellido = ?, numero = ?, empresa = ?, grupo = ?, direccion = ?, nota = ? where id = ?", [
            nombre, 
            apellido, 
            numero, 
            empresa, 
            email, 
            grupo,
            direccion, 
            nota
        ]);
      },
      (_t, error) => {
        console.log("Error al editar el contacti");
        console.log(error);
      },
      (_t, _success) => {
        successFunc;
      }
    );
  };

 
  // Eliminar por id
  const deleteContactById = (id, successFunc) => {
    db.transaction(
      (tx) => {
        tx.executeSql("DELETE FROM contacts WHERE id = ?", [
          id,
        ]);
      },
      (_t, error) => {
        console.log("Error al Eliminar el contactp");
        console.log(error);
      },
      (_t, _success) => {
        successFunc;
      }
    );
  };


export const database ={
    getContacts,
    insertContacts,
    dropDatabaseTableAsync,
    setupDatabaseTableAsync,
    setupContactsAsync,
    setupateContacts,
    deleteContactById
};