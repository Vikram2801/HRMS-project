import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule,MatInputModule,MatCheckboxModule,ReactiveFormsModule,FormsModule,CommonModule,MatIconModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  encapsulation:ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  submitted:boolean=false;
  hide:boolean=true
  ngOnInit(): void {
    this.loginForm=new FormGroup({
      email:new FormControl('',[Validators.required,Validators.pattern(/^[\w+]+([\.-]?\w+)\+?\d@[\w-]+(\.\w+){1,2}$/i)]),
      password:new FormControl('',[Validators.required,Validators.minLength(8)])
    })
  }
  onLog(){
    if(this.loginForm.invalid){
      this.submitted=true;
      this.loginForm.markAllAsTouched();
      return;
    }
  }

}
