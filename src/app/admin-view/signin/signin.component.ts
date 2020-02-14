import { AuthService } from '../admin-core/auth/auth.service';
import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyErrorStateMatcher } from '../admin-forms/MyErrorStateMatcher';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, OnDestroy {
  hide = true;
  loginForm: FormGroup;
  sub: Subscription;
  matcher = new MyErrorStateMatcher();
  @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  passwordAutofilled(isAutoFilled: boolean) {
      // tslint:disable-next-line: no-unused-expression
      this.loginForm.get('password').updateValueAndValidity;
  }

  emailAutofilled(isAutoFilled: boolean) {
      // tslint:disable-next-line: no-unused-expression
      this.loginForm.get('email').updateValueAndValidity;
  }

  login() {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;

    this.sub = this.authService
      .authenticate(email, password)
      .subscribe(() => this.router.navigateByUrl('/admin'),
        err => {
          console.log(err);
          this.loginForm.get('password').reset();
          this.emailInput.nativeElement.focus();
          this.snackBar.open('Invalid username or password', 'x', {duration: 2000});
        }
      );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
