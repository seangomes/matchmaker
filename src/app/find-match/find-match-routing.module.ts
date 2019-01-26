import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FindMatchComponent } from './components/find-match/find-match.component';
import { MatchSearchComponent } from './components/match-search/match-search.component';

const routes: Routes = [
  // { path: '', redirectTo: 'find-match', pathMatch: 'full' },
  { path: '', component: FindMatchComponent },
  { path: 'match-seach', component: MatchSearchComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FindMatchRoutingModule { }
