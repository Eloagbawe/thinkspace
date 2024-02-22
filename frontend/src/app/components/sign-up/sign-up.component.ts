import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup,
  Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { passwordValidator } from '../../directives/shared/shared.directive';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule, RouterLink ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  private authService = inject(AuthService)

  passType = "password";
  passVisible = false;

  confirmPassType = "password";
  confirmPassVisible = false;

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

  onSubmit(e: Event) {
    e.preventDefault();
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

  showPassword() {
    this.passType = "text";
    this.passVisible = true;
  }

  hidePassword() {
    this.passType = "password";
    this.passVisible = false;
  }

  showConfirmPassword() {
    this.confirmPassType = "text";
    this.confirmPassVisible = true;
  }
  
  hideConfirmPassword() {
    this.confirmPassType = "password";
    this.confirmPassVisible = false;
  }

}
