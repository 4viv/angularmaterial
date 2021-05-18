import { Usuario } from './../interfaces/usuario';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private listadoUsuarios: Usuario[] = [
    {nombreCompleto: 'Hiram Castañon', telefono: 6642451575, correo: 'hiram@mail.com', fechaIngreso: new Date(), estadoCivil: 'Soltero', sexo: 'Masculino'},
    {nombreCompleto: 'Kaoru Vega', telefono: 6642260253, correo: 'kaoru@mail.com', fechaIngreso: new Date(), estadoCivil: 'Soltero', sexo: 'Femenino'},
    {nombreCompleto: 'Misato Ramirez', telefono: 6641001595, correo: 'misato@mail.com', fechaIngreso: new Date(), estadoCivil: 'Casado', sexo: 'Femenino'},
    {nombreCompleto: 'aviv Razo', telefono: 6642020506, correo: 'aviv@mail.com', fechaIngreso: new Date(), estadoCivil: 'Relacion Complicada', sexo: 'Masculino'}
  ];

  constructor() { }

  getUsers(){
    // devolbemos una copia del arreglo
    return this.listadoUsuarios.slice();
  }

  eliminarUsuario(index: number){
    this.listadoUsuarios.splice(index, 1);
  }

  agregarUsuario(usuario: Usuario) {
    this.listadoUsuarios.unshift(usuario); // Agrega elemento alinicio del array
  }

  getUsuario(index: number){
    return this.listadoUsuarios[index];
  }

  editUsuario(usuario: Usuario, id: number){
    this.listadoUsuarios[id].nombreCompleto = usuario.nombreCompleto;
    this.listadoUsuarios[id].telefono = usuario.telefono;
    this.listadoUsuarios[id].correo = usuario.correo;
    this.listadoUsuarios[id].fechaIngreso = usuario.fechaIngreso;
    this.listadoUsuarios[id].estadoCivil = usuario.estadoCivil;
    this.listadoUsuarios[id].sexo = usuario.sexo;
  }
}
