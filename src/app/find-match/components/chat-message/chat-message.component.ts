import { AuthService } from './../../../core/providers/auth/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { Match } from '../../models/match';
import { ChatService } from '../../providers/chat.service';
import { User } from '../../../shared/models/user';
import { Tab } from '../../models/tab';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {

  public selectedMatchType: string = '';
  public selectedRank: string = '';
  public selectedMap: string = '';

  public skillList = [
      { imageUrl: "../../../../assets/images/ranks/silver1.png", name: "Silver 1", selected: false },
      { imageUrl: "../../../../assets/images/ranks/silver2.png", name: "Silver 2", selected: false },
      { imageUrl: "../../../../assets/images/ranks/silver3.png", name: "Silver 3", selected: false },
      { imageUrl: "../../../../assets/images/ranks/silver4.png", name: "Silver 4", selected: false },
      { imageUrl: "../../../../assets/images/ranks/silverelite.png", name: "Silver Elite", selected: false },
      { imageUrl: "../../../../assets/images/ranks/goldnova1.png", name: "Goldnova 1", selected: false },
      { imageUrl: "../../../../assets/images/ranks/goldnova2.png", name: "Goldnova 2", selected: false },
      { imageUrl: "../../../../assets/images/ranks/goldnova3.png", name: "Goldnova 3", selected: false },
      { imageUrl: "../../../../assets/images/ranks/goldnovamaster.png", name: "Goldnova Master", selected: false },
      { imageUrl: "../../../../assets/images/ranks/masterguardian.png", name: "Master Guardian 1", selected: false },
      { imageUrl: "../../../../assets/images/ranks/masterguardian2.png", name: "Master Guardian 2", selected: false },
      { imageUrl: "../../../../assets/images/ranks/masterguardianelite.png", name: "Master Guardian Elite", selected: false },
      { imageUrl: "../../../../assets/images/ranks/DistinguishedMasterGuardian.png", name: "Distinguished Master Guardian", selected: false },
      { imageUrl: "../../../../assets/images/ranks/LegendaryEagle.png", name: "Legendary Eagle", selected: false },
      { imageUrl: "../../../../assets/images/ranks/LegendaryEagleMaster.png", name: "Legendary Eagle Master", selected: false },
      { imageUrl: "../../../../assets/images/ranks/SupremeMasterFirstClass.png", name: "Supreme Master First Class", selected: false },
      { imageUrl: "../../../../assets/images/ranks/TheGlobalElite.png", name: "The Global Elite", selected: false }
  ]

  public mapList = [
    { name: "Dust2", selected: false },
    { name: "Nuke", selected: false },
    { name: "Mirage", selected: false },
    { name: "Inferno", selected: false },
    { name: "Cobblestone", selected: false },
    { name: "Overpass", selected: false },
    { name: "Cache", selected: false },
    { name: "Train", selected: false }
  ]

  @Input() matchMessages : Match[];

  constructor(private chatService: ChatService, private authService: AuthService) { }

  ngOnInit() {
   
  }

  filterValues(text:string, textType:string) {
    switch (textType.toLowerCase()) {
      case "matchtype":
      this.selectedMatchType = text;
      break;
      case "rank":
      this.selectedRank = text;
      break;
      case "map":
      this.selectedMap = text;
      break;
    }
  }

  resetFilters() {
    this.selectedMap = '';
    this.selectedMatchType = '';
    this.selectedRank = '';
  }

  contactPlayer(matchInfo: Match, userId : string) {
    if(matchInfo) {
      //this.chatService.spawnChat(guestUserId, this.authService.getCurrentUser.uid);
      //add new tab
      let newTab : Tab = {
         id:userId,
         tabTitle: matchInfo.postedby,
         active:true,
         userId: this.authService.getCurrentUser.uid
      }
      this.chatService.addNewTab(newTab);
    }
  }

}
