import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FindMatchRoutingModule } from './find-match-routing.module';
import { FindMatchComponent } from './components/find-match/find-match.component';
import { ChatMessageComponent } from './components/chat-message/chat-message.component';
import { MatchSearchComponent } from './components/match-search/match-search.component';


//PIPES
import { MatchFilterPipe } from './pipes/match-filter.pipe';
import { PersonalChatMessageComponent } from './components/personal-chat-message/personal-chat-message.component';
import { ActiveChatListComponent } from './components/active-chat-list/active-chat-list.component';

@NgModule({
  declarations: [FindMatchComponent, ChatMessageComponent, MatchSearchComponent, MatchFilterPipe, PersonalChatMessageComponent, ActiveChatListComponent],
  imports: [
    CommonModule,
    FindMatchRoutingModule,
    FormsModule
  ]
})
export class FindMatchModule { }
