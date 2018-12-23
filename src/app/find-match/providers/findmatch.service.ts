import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Match } from '../models/match';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FindmatchService {

  private matchesCollection: AngularFirestoreCollection<Match>;
  public matches$ : Observable<Match[]>;

  constructor(private afs: AngularFirestore) {
    this.matchesCollection = afs.collection<Match>('matches');
    this.matches$ = this.matchesCollection.valueChanges();
   }


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
}
