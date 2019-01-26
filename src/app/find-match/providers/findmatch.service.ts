import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Match } from '../models/match';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/providers/auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FindmatchService {

  private matchesCollection: AngularFirestoreCollection<Match>;
  public matches$: Observable<Match[]>;
  public activeSearchList : any[] = [];

  constructor(private afs: AngularFirestore, private authService: AuthService, private router: Router) {
    this.matchesCollection = afs.collection<Match>('matches');
    this.matches$ = this.matchesCollection.valueChanges();
  }


  ///Match section

  addMatch(match: Match) {
    this.matchesCollection.add(match)
      .then(() => {
        console.log("Match id added", match.id);
      })
      .catch(() => {
        console.log("Match id failed to add", match.id);
      });
  }

  removeMatch(match: Match) {
    this.matchesCollection.doc(match.id).delete()
      .then(() => {
        console.log("Match id deleted", match.id);
      })
      .catch(() => {
        console.log("Match id failed to delete", match.id);
      });
  }

  sendMessage(newMatch: Match) {

    let currentUser = this.authService.getCurrentUser;
    let dateNow = this.genereateDate();
    let refId = this.afs.createId();

    let matchObj: Match = {
      id: refId,
      postedby: currentUser.username,
      date: dateNow,
      maps: newMatch.maps,
      matchType: newMatch.matchType,
      rank: newMatch.rank,
      teamSize: newMatch.teamSize
    }
    this.matchesCollection.doc(refId).set(matchObj).then(() => {
      let activeMatchEnabled = {
        userId: currentUser.uid,
        matchId: matchObj.id
      }
      this.activeSearchList.push(activeMatchEnabled);
      this.router.navigate(['find-match']);
    });
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
