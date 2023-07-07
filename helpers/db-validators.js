const Role = require('../models/role');
const Usuario = require('../models/usuario');


const esRoleValido = async(rol = ' ') =>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
            throw new Error(`El rol ${rol} no esta registrado en la DB`)
    }
}

const emailExiste= async( correo = '')=>{
    //Verficar si el correo exite
    const existeEmail = await Usuario.findOne({correo})
    if( existeEmail){
        throw new Error(`El correo: ${correo} ya está registrado`)
    }
}

const existeUsuarioPorId= async( id )=>{
    //Verficar si el id existe
    const existeUsuario = await Usuario.findById(id);
    if( !existeUsuario){
        throw new Error(`No existe usuario con id: ${id}`)
    }
}



module.exports = {
    esRoleValido, 
    emailExiste,
    existeUsuarioPorId
}

