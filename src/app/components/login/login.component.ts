import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder, private _snackbar: MatSnackBar,
              private router: Router) {
    this.form = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  ingresar() {
    const USER = {
      user: this.form.value.user,
      password: this.form.value.password
    }

    if (USER.user === 'Hiram' && USER.password === '123456') {
      this.load();
      this.form.reset();
    } else {
      this.error();
    }
  }

  load(){
    this.loading = true;
    setTimeout(() =>{
      this.router.navigate(['dashboard']);
      this.loading = false;
    }, 2000)
  }

  error(){
    this._snackbar.open('Usuario o contraseña incorrecta', 'X', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

}
