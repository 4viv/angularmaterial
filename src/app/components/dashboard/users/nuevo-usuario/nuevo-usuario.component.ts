import { UsersService } from './../../../../services/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css'],
  // Cambiar color de radio button
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
}]
})
export class NuevoUsuarioComponent implements OnInit {

  sexo: any[] = [
    {value: 'Femenino'},
    {value: 'Masculino'}
  ];

  estadoCivil: any[] = [
    {value: 'Soltero'},
    {value: 'Casado'},
    {value: 'Relacion complicada'}
  ]

  form: FormGroup;
  accion: string = 'Crear';
  idEmpleado: any;

  constructor(private fb: FormBuilder, private router:Router,
              private _usuarioService: UsersService, private snackbar: MatSnackBar,
              private aRoute: ActivatedRoute)
   {  // Validaciones
    this.form = this.fb.group({
      nombreCompleto: ['', [Validators.required, Validators.maxLength(10)]],
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      fechaIngreso: ['', Validators.required],
      estadoCivil: ['', Validators.required],
      sexo: ['', Validators.required]
    })

    const id = 'id';
    this.idEmpleado = this.aRoute.snapshot.params[id];
   }

  ngOnInit(): void {
    if (this.idEmpleado !== undefined) {
      this.accion = 'Editar';
      this.esEditarEmpleado()
    }

  }

  crearUsuario(){
    const usuario: Usuario = {
      nombreCompleto: this.form.value.nombreCompleto,
      telefono: this.form.value.telefono,
      correo: this.form.value.correo,
      fechaIngreso: this.form.value.fechaIngreso,
      estadoCivil: this.form.value.estadoCivil,
      sexo: this.form.value.sexo
    };

    if (this.idEmpleado !== undefined) {
      this.editarUsuario(usuario);
    } else {
      this.agregarUsuario(usuario);
    }
  }

  editarUsuario(usuario: Usuario){
    this._usuarioService.editUsuario(usuario, this.idEmpleado)

    this.router.navigate(['/dashboard/usuarios'])

    this.snackbar.open('Usuario editado', 'X', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

  agregarUsuario(usuario: Usuario){
    this._usuarioService.agregarUsuario(usuario)

    this.router.navigate(['/dashboard/usuarios'])

    this.snackbar.open('Usuario Agregado', 'X', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }


  esEditarEmpleado(){
    const usuario: Usuario = this._usuarioService.getUsuario(this.idEmpleado)
    this.form.patchValue({
      nombreCompleto: usuario.nombreCompleto,
      telefono: usuario.telefono,
      correo: usuario.correo,
      fechaIngreso: usuario.fechaIngreso,
      estadoCivil: usuario.estadoCivil,
      sexo: usuario.sexo
    })
  }

}
