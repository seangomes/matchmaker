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
      createdDate: this.genereateDate(),
      createdByUserId: this.authService.getCurrentUser.uid,
      isActice:true
    }
    //Adding the room
    chatRoomRef.doc(newChatRoomId).set(newChat).then(() => {
      console.log("room added");

      let roomIdToString = newChatRoomId;
      let userUpdateObject = {
        roomIdToString:true
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

  genereateDate() {
    var date = new Date(),
      year = date.getFullYear(),
      month = (date.getMonth() + 1).toString(),
      formatedMonth = (month.length === 1) ? ("0" + month) : month,
      day = date.getDate().toString(),
      formatedDay = (day.length === 1) ? ("0" + day) : day,
      hour = date.getHours().toString(),
      formatedHour = (hour.length === 1) ? ("0" + hour) : hour,
      minute = date.getMinutes().toString(),
      formatedMinute = (minute.length === 1) ? ("0" + minute) : minute,
      second = date.getSeconds().toString(),
      formatedSecond = (second.length === 1) ? ("0" + second) : second;
    return formatedDay + "-" + formatedMonth + "-" + year + " " + formatedHour + ':' + formatedMinute + ':' + formatedSecond;
  }

}
