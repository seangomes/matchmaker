import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FindMatchComponent } from './components/find-match/find-match.component';

const routes: Routes = [
  // { path: '', redirectTo: 'find-match', pathMatch: 'full' },
  { path: '', component: FindMatchComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FindMatchRoutingModule { }
