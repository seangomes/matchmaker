import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../../core/providers/auth/auth.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  currentUser: User;
  currentUserSubscription: Subscription;

  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.auth.currentUser$.subscribe(data => this.currentUser = data);
  }

  logout() {
    this.auth.signOut();
  }

  ngOnDestroy() {
   if(this.currentUserSubscription !== undefined) {
    this.currentUserSubscription.unsubscribe();
   }

  }

}
