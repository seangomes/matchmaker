import { Pipe, PipeTransform } from '@angular/core';
import { Match } from '../models/match';

@Pipe({
  name: 'matchFilter'
})
export class MatchFilterPipe implements PipeTransform {

  transform(matches: Match[], selectedMatchType: string, selectedRank: string, selectedMap: string): any {
    if (matches !== null) {
      if (matches && matches.length){
        return matches.filter(match =>{
            if (selectedMatchType && match.matchType.toLowerCase().indexOf(selectedMatchType.toLowerCase()) === -1){
                return false;
            }
            if (selectedRank && match.rank.toLowerCase().indexOf(selectedRank.toLowerCase()) === -1){
                return false;
            }
            // if (selectedMap && match.maps.toLowerCase().indexOf(selectedMap.toLowerCase()) === -1){
            //     return false;
            // }
            return true;
       })
    }
    else{
        return matches;
    }
  }
}

}

