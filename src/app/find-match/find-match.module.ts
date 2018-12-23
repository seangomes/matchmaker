import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FindMatchRoutingModule } from './find-match-routing.module';
import { FindMatchComponent } from './components/find-match/find-match.component';
import { ChatMessageComponent } from './components/chat-message/chat-message.component';
import { MatchSearchComponent } from './components/match-search/match-search.component';

@NgModule({
  declarations: [FindMatchComponent, ChatMessageComponent, MatchSearchComponent],
  imports: [
    CommonModule,
    FindMatchRoutingModule
  ]
})
export class FindMatchModule { }
