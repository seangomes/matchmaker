import { Component, OnInit } from '@angular/core';
import { FindmatchService } from '../../providers/findmatch.service';
import { Observable } from 'rxjs';
import { Match } from '../../models/match';

@Component({
  selector: 'app-find-match',
  templateUrl: './find-match.component.html',
  styleUrls: ['./find-match.component.css']
})
export class FindMatchComponent implements OnInit {

  tabPanels = ["FindMatch"];

  matches$ : Observable<Match[]>;

  constructor(private findMatchService: FindmatchService) { }

  ngOnInit() {
    this.matches$ = this.findMatchService.matches$;
  }

}
