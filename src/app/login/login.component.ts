import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted: boolean = false;
  hide: boolean = true;
  constructor(private auth: AuthService, private router: Router) { }
  ngOnInit(): void {

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }

  }
  onLog() {
    if (this.loginForm.invalid) {
      this.submitted = true;
      this.loginForm.markAllAsTouched();
      return;
    } else {
      this.auth.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          if (res?.token) {
            this.auth.setToken(res.token);
            this.auth.setUser(res.user);
            console.log('User data:', res.user);
            this.router.navigate(['/dashboard']);
          } else {
            alert('Login failed: No token received.');
          }
        },
        error: (err) => {
          console.error('Login error:', err);
          alert('Invalid credentials or server error.');
        }
      });
    }
  }
}
