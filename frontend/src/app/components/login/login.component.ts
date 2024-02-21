import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup,
  Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup = new FormGroup({
    email : new FormControl('', [
      Validators.required
    ]),
    password : new FormControl('', [
      Validators.required
    ]),
  },)

  onSubmit() {
    
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
  



}
