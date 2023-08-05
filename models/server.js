const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        //Conectar a base de datos

            this.conectarDB();
        //Middlewares: son funciones que siempre van a ejecutarse siempre que se levante el servidor
        this.middlewares();


        //Rutas de mi aplicación
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use( express.json());

        //Directorio publico
        this.app.use(express.static('public'));

    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth'))
        this.app.use(this.usuariosPath, require('../routes/userios'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo el puerto', this.port)
        });

    }

}

module.exports = Server 