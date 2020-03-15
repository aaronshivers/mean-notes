import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ],
})
export class LoginComponent {
  private authSubscription: Subscription;
  userForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    this.userForm = this.formBuilder.group({
      email: '',
      password: ''
    })
  }

  private onLogin(): void {
    const email = this.userForm.value.email;
    const password = this.userForm.value.password;
    console.log(email, password);

    this.authService.login({ email, password })
      .subscribe(() => this.router.navigateByUrl('/items'));
  }

  private onSignup(): void {
    const email = this.userForm.value.email;
    const password = this.userForm.value.password;
    console.log(email, password);

    this.authService.signup({ email, password })
      .subscribe(() => this.router.navigateByUrl('/items'));
  }
}
