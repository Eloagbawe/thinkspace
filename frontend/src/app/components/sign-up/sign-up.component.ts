import { Component, OnInit, inject,  } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup,
  Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { passwordValidator } from '../../directives/check-passwords/check-passwords.directive';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  private authService = inject(AuthService)

  signUpForm: FormGroup = new FormGroup({
    username : new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
    email : new FormControl('', [
      Validators.required
    ]),
    password : new FormControl('', [
      Validators.required
    ]),
    confirmPassword : new FormControl('', [
      Validators.required,
    ])
  },
    {validators: passwordValidator}
  )

  onSubmit() {

    if (this.signUpForm.invalid) {
      console.log("unable to submit form")
      return
    }

    const credentials = {username: this.username?.value, email: this.email?.value, password:this.password?.value};

    this.authService.signUp(credentials).subscribe((data) => {
      console.log(data);
    })
    
  }

  get username() {
    return this.signUpForm.get('username');
  }
  
  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }
  
  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

}
