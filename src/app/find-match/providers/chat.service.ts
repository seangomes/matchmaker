import { ChatMessage } from './../models/chatmessage';
import { UserService } from './../../core/providers/user/user.service';
import { Injectable } from '@angular/core';
import { AuthService } from '../../core/providers/auth/auth.service';
import { ChatRoom } from '../models/chatroom';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../../shared/models/user';
import { Tab } from '../models/tab';
import { Chat } from '../models/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public chatCollection: AngularFirestoreCollection<Chat>;
  public myTabsSubject: BehaviorSubject<Tab[]> = new BehaviorSubject<Tab[]>([]);
  public myActiceTabs$: Observable<Tab[]> = this.myTabsSubject.asObservable();

  constructor(private authService: AuthService, private afs: AngularFirestore, private userService : UserService) {
    const currentUserId = this.authService.getCurrentUser.uid;
    this.chatCollection = this.afs.collection('chats');
   }

  sendChatMessage(message:string, reciverUserId:string) {
    if(message == '' || reciverUserId == '') {
      return;
    }
    else
    {
      let currentUserId : string = this.authService.getCurrentUser.uid; 
      //create new ID
      const newChatId = this.afs.createId();
      //create object
      let newChatMessage : ChatMessage = {
        messageId: newChatId,
        senderId: currentUserId,
        reciverId: reciverUserId,
        timestamp: new Date().toString(),
        messageText: message
      }
      //check if chat node exsist
      const combinedUserId = this.setOneToOneChat(this.authService.getCurrentUser.uid, reciverUserId);
      this.chatCollection.doc(combinedUserId).get().subscribe(data => {
        if(data.exists){
          data.ref.set(newChatMessage).then(() => {
            console.log("chat exsisting and message added");
          });
        }
        else{
          this.chatCollection.doc(combinedUserId).set(newChatMessage).then(() => {
            console.log("chat NOT exsist but created and message added");
          })
        }
      });
    }
  }

  endChat(tabId: string) {

  }

  addNewTab(newTab:Tab) {
    let myNewTab = this.myTabsSubject.getValue();
    myNewTab.push(newTab);
    this.myTabsSubject.next(myNewTab);
  }
  

  private setOneToOneChat(userId1:string, userId2: string) {
    //Check if user1’s id is less than user2's
    if(userId1 < userId2) {
      return userId1+'_'+userId2;
    }else {
      return userId2+'_'+userId1;
    }
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
