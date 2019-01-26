import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FindMatchRoutingModule } from './find-match-routing.module';
import { FindMatchComponent } from './components/find-match/find-match.component';
import { ChatMessageComponent } from './components/chat-message/chat-message.component';
import { MatchSearchComponent } from './components/match-search/match-search.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { TabComponent } from './components/tab/tab.component';

//PIPES
import { MatchFilterPipe } from './pipes/match-filter.pipe';
import { PersonalChatMessageComponent } from './components/personal-chat-message/personal-chat-message.component';

@NgModule({
  declarations: [FindMatchComponent, ChatMessageComponent, MatchSearchComponent, TabsComponent, TabComponent, MatchFilterPipe, PersonalChatMessageComponent],
  imports: [
    CommonModule,
    FindMatchRoutingModule,
    FormsModule
  ]
})
export class FindMatchModule { }
