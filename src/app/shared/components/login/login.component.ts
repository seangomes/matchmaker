import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/providers/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public errorMessage;
  public user;
  loginForm: FormGroup;


  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService,) {}


  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required]]
    });
  }

  onLoginFormSubmit() {
    if(this.loginForm.valid) {
      //calling the service
      this.authService.loginWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password)
      .then((data) => {
        if(data) {
          this.errorMessage = data;
        }else {
          this.router.navigate(['home']);
        }
      });
    }
  }

}
