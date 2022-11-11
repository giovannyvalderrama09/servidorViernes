import express from 'express'
import { rutasPersonalizadas } from '../Routes/rutas.js' 
import { conectarConMongo } from '../Database/conexion.js'

export class ServidorAPI{

constructor(){
    this.app = express()
    this.conectarConBD()
    this.activarBody()
    this.atenderPeticiones()
}
//METODOS DE LA CLASE
//ENCENDIENDO EL SERVIDOR 3000
despertarServidor(){
   this.app.listen(process.env.PORT,function(){
        console.log("servidor encendido: "+ process.env.PORT)
    })
    
}

atenderPeticiones(){

this.app.use('/',rutasPersonalizadas)
}

conectarConBD(){

    conectarConMongo()
}

activarBody(){

    this.app.use(express.json())
}



}