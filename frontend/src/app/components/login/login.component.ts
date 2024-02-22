import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup,
  Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule, RouterLink ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private authService = inject(AuthService)

  passType = "password";
  passVisible = false;

  loginForm: FormGroup = new FormGroup({
    email : new FormControl('', [
      Validators.required
    ]),
    password : new FormControl('', [
      Validators.required
    ]),
  },)

  onSubmit(e: Event) {
    e.preventDefault()

    if (this.loginForm.invalid) {
      console.log("unable to submit form")
      return
    }

    const credentials = {email: this.email?.value, password:this.password?.value};

    this.authService.login(credentials).subscribe((data) => {
      console.log(data);
    })
    
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
  
  showPassword() {
    this.passType = "text";
    this.passVisible = true;
  }

  hidePassword() {
    this.passType = "password";
    this.passVisible = false;
  }

}
