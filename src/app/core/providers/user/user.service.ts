import { AuthService } from './../auth/auth.service';
import { User } from './../../../shared/models/user';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userCollection: AngularFirestoreCollection<User>;
  public users$: Observable<User[]>;

  constructor(private authService: AuthService, private router: Router, private afs: AngularFirestore) {
    this.userCollection = afs.collection('users');
  }

  getAllUsers() : Observable<User[]> {
    return this.userCollection.valueChanges();
  }

  getUserById(userId: string) : Observable<User> {
    return this.userCollection.doc<User>(userId).valueChanges();
  }

  editUser(user: User) {
    this.userCollection.doc<User>(user.uid).update(user).then(() => {
      this.router.navigate(['home']);
    });
  }

  deleteUserById(userId: string) {
    let user = this.userCollection.doc<User>(userId).delete().then(() => {
      console.log("Following user is deleted: ", user);
    });
  }
}
