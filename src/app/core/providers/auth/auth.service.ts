import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from "../../../shared/models/user";
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()

export class AuthService {

  private userCollection: AngularFirestoreCollection<User>;
  private currentUserSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  public currentUser$: Observable<User> = this.currentUserSubject.asObservable();
  public users$: Observable<User[]>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
    this.currentUser$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          this.userCollection.doc(user.uid).update({
            isOnline: true
          }).then(() => {
            const fbUser : User = {
              uid: user.uid,
              email: user.email,
              isOnline: true,
              photoURL: user.photoURL,
              username: user.displayName,
              rooms:[]
            }
            this.currentUserSubject.next(fbUser);
          });

          return this.afs.doc<User>('users/' + user.uid).valueChanges();
        }
        else {
          return of(null);
        }
      }));
      this.userCollection = afs.collection<User>('users');
      this.users$ = this.userCollection.valueChanges();
      this.currentUser$.subscribe((data) => {
        if(data) {
          this.currentUserSubject.next(data);
        }
      });
   }

   get getCurrentUser() {
     return this.currentUserSubject.getValue();
   }

   getUserById(userId:string) : User {
      return this.userCollection.doc<User>(userId).snapshotChanges().subscribe();
   }

   loginWithEmailAndPassword(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((userData) => {
        console.log(userData.user);
        //update subject


        //update online status for user
        this.userCollection.doc(userData.user.uid).update({
          isOnline: true
        })
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/wrong-password':
            return error.message;
          case 'auth/user-not-found':
            return error.message;
          case 'auth/user-disabled':
            return error.message;
          case 'auth/invalid-email':
            return error.message;
          case 'auth/weak-password':
            return error.message;
        }
      });
  }

  register(email: string, password: string, username: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((userData) => {
      var photoURLSet = userData.user.photoURL;
      if (userData.user.photoURL === undefined || userData.user.photoURL === null) {
        photoURLSet = 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
        userData.user.updateProfile({
          photoURL: photoURLSet,
          displayName: username
        });
      }

      let newUser: User = {
        email: userData.user.email,
        photoURL: photoURLSet,
        username: username,
        isOnline: false,
        uid: userData.user.uid,
      }
      this.userCollection.doc(userData.user.uid).set(newUser)
      .then((docRef) => {
        this.router.navigate(['home']);
      });
    }).catch((error) => console.log(error));
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      let tempUser = this.currentUserSubject.getValue();
      if (tempUser) {
        this.userCollection.doc(tempUser.uid).update({
          isOnline: false
        })
          .then(() => {
            //this.currentUser = new User;
            this.currentUserSubject.next(null);
            //localStorage.removeItem('currentuser');
            this.router.navigate(['home']);
          });
      }
    });
  }

  //Change user details
  changeUser(user: User) {
    if (user) {
      this.userCollection.doc(user.uid).update(user)
      .then((docRef) => {
        this.router.navigate(['home']);
      });
    }
  }

}
