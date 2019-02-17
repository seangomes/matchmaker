import { UserService } from './../../core/providers/user/user.service';
import { Injectable } from '@angular/core';
import { AuthService } from '../../core/providers/auth/auth.service';
import { ChatRoom } from '../models/chatroom';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user';
import { Tab } from '../models/tab';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public myChatRoomCollection: AngularFirestoreCollection<ChatRoom>;
  public myActiceTabs: Tab[] = [];

  constructor(private authService: AuthService, private afs: AngularFirestore, private userService : UserService) {
    const currentUserId = this.authService.getCurrentUser.uid;

   }

  spawnRoom(guestUserId: string, spawner: User) {
    const chatRoomRef = this.afs.collection('chatrooms');
    //Generate new id
    const newChatRoomId = this.afs.createId();
    //Create new obj
    const newChat: ChatRoom = {
      chatRoomId:newChatRoomId,
      createdDate: Date.now.toString(),
      createdByUserId: this.authService.getCurrentUser.uid,
      isActice:true
    }
    //Adding the room
    chatRoomRef.doc(newChatRoomId).set(newChat).then(() => {
      console.log("room added");

      let userUpdateObject = {
        newChatRoomId:true
      }
      this.authService.getCurrentUser.rooms.push(userUpdateObject);
      //Adding new tab
      this.userService.getUserById(guestUserId).subscribe((guestUser : User) => {
        let newTab:Tab = {
          id:newChatRoomId,
          userId: guestUser.uid,
          active: true,
          tabTitle: spawner.username
        };

        this.myActiceTabs.push(newTab);
      });
    })







  }

  endChat(tabId: string) {

  }

  sendChatMessage(tabId: string) {

  }


}
