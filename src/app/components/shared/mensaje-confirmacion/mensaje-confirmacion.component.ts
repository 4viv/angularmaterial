import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-mensaje-confirmacion',
  templateUrl: './mensaje-confirmacion.component.html',
  styleUrls: ['./mensaje-confirmacion.component.css']
})
export class MensajeConfirmacionComponent implements OnInit {

  mensaje: string;
  btn = 'aceptar';
  constructor(public dialogRef: MatDialogRef<MensajeConfirmacionComponent>,
              // Nos ayuda a obtener la data
              @Inject(MAT_DIALOG_DATA) public data: any) {
                this.mensaje = data.mensaje;
               }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
