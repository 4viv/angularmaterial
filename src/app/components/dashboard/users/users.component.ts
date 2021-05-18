import { MensajeConfirmacionComponent } from './../../shared/mensaje-confirmacion/mensaje-confirmacion.component';

import { Component, OnInit } from '@angular/core';
import { UsersService } from './../../../services/users.service';
import { Usuario } from './../../../interfaces/usuario';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  // Encabezados de la tabla
  displayedColumns: string[] = [
    'nombreCompleto', 'telefono', 'correo', 'fechaIngreso', 'estadoCivil', 'sexo', 'symbol'
  ];

  listUser: Usuario[] = [];
  dataSource!: MatTableDataSource<Usuario>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // Para el ordenamiento de la tabla
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _usuarioService: UsersService, private snackbar: MatSnackBar,
              public dialog: MatDialog ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Metodo para filtrar
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cargarUsuarios(){
    this.listUser = this._usuarioService.getUsers();
    // Cargamos la tabla
    this.dataSource = new MatTableDataSource(this.listUser)
  }

  eliminarUsuario(index: number){

    // Dispara ventana de dialogo y carga el componente de mensaje
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: '350px',
      data: {mensaje: 'Confirme que decea eliminar este elemento'}
    });

    // Al confirmar la ventana de dialogo
    dialogRef.afterClosed().subscribe(result => {

      if (result === 'aceptar') {
        this._usuarioService.eliminarUsuario(index);
        this.cargarUsuarios();

        this.snackbar.open('Registro eliminado', 'X', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        })
      }

    });


  }

}
