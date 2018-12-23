import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../../core/providers/auth/auth.service';
import { CustomValidator } from './customValidator';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private afs: AngularFirestore) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', Validators.required],
      username: ['', [Validators.required], [CustomValidator.username(this.afs)]]
    })
  }

  get username() {
    return this.registerForm.get('username');
  }

  onRegisterFormSubmit() {
    if(this.registerForm.valid) {
      //calling the service
      this.authService.register(this.registerForm.value.email, this.registerForm.value.password, this.registerForm.value.username);
    }
  }
}
