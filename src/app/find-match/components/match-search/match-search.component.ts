import { Component, OnInit } from '@angular/core';
import { FindmatchService } from "../../providers/findmatch.service";
import { Match } from '../../models/match';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/providers/auth/auth.service';

@Component({
  selector: 'app-match-search',
  templateUrl: './match-search.component.html',
  styleUrls: ['./match-search.component.css']
})
export class MatchSearchComponent implements OnInit {

  public validationMessage: string = '';


  public teamTypeList = [
    { name: "5vs5", selected: false },
    { name: "2vs2", selected: false }
  ];

  public matchTypeList = [
    { name: "Clan", selected: false },
    { name: "Mix", selected: false }
  ];

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

  public skillList = [
    [
      { imageUrl: "../../../../assets/images/ranks/silver1.png", name: "Silver 1", selected: false },
      { imageUrl: "../../../../assets/images/ranks/silver2.png", name: "Silver 2", selected: false },
      { imageUrl: "../../../../assets/images/ranks/silver3.png", name: "Silver 3", selected: false },
      { imageUrl: "../../../../assets/images/ranks/silver4.png", name: "Silver 4", selected: false },
      { imageUrl: "../../../../assets/images/ranks/silverelite.png", name: "Silver Elite", selected: false },
    ],
    [
      { imageUrl: "../../../../assets/images/ranks/goldnova1.png", name: "Goldnova 1", selected: false },
      { imageUrl: "../../../../assets/images/ranks/goldnova2.png", name: "Goldnova 2", selected: false },
      { imageUrl: "../../../../assets/images/ranks/goldnova3.png", name: "Goldnova 3", selected: false },
      { imageUrl: "../../../../assets/images/ranks/goldnovamaster.png", name: "Goldnova Master", selected: false }
    ],
    [
      { imageUrl: "../../../../assets/images/ranks/masterguardian.png", name: "Master Guardian 1", selected: false },
      { imageUrl: "../../../../assets/images/ranks/masterguardian2.png", name: "Master Guardian 2", selected: false },
      { imageUrl: "../../../../assets/images/ranks/masterguardianelite.png", name: "Master Guardian Elite", selected: false },
    ],
    [
      { imageUrl: "../../../../assets/images/ranks/DistinguishedMasterGuardian.png", name: "Distinguished Master Guardian", selected: false },
      { imageUrl: "../../../../assets/images/ranks/LegendaryEagle.png", name: "Legendary Eagle", selected: false },
      { imageUrl: "../../../../assets/images/ranks/LegendaryEagleMaster.png", name: "Legendary Eagle Master", selected: false },
      { imageUrl: "../../../../assets/images/ranks/SupremeMasterFirstClass.png", name: "Supreme Master First Class", selected: false },
      { imageUrl: "../../../../assets/images/ranks/TheGlobalElite.png", name: "The Global Elite", selected: false }
    ]
  ]

  //Selected values
  public selectedTeamSizeType = "";
  public selectedMatchType = "";
  public selectedMaps = [];
  public selectedRank = '';

  constructor(private findmatchService: FindmatchService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    //check if user has a match active
    this.findmatchService.activeSearchList.forEach((activeMatch) => {
      if(activeMatch.userId === this.authService.getCurrentUser.uid) {
        this.router.navigate(['find-match']);
      }
    });

  }

  addTeamType(teamType: any) {
    this.teamTypeList.forEach((item) => {
      item.selected = false;
    })
    if (teamType.selected) {
      this.selectedTeamSizeType = '';
      teamType.selected = false;
    } else {
      teamType.selected = true;
      this.selectedTeamSizeType = teamType.name;
    }
  }

  addMatchType(matchType: any) {
    this.matchTypeList.forEach((item) => {
      item.selected = false;
    })
    if (matchType.selected) {
      this.selectedMatchType = '';
      matchType.selected = false;
    } else {
      matchType.selected = true;
      this.selectedMatchType = matchType.name;
    }
  }

  addMap(map: any) {
    if (map.name) {
      //is map in list
      let mapInList = this.selectedMaps.includes(map.name);
      if (this.selectedMaps.length <= 1) {

        //check if map is in array
        if (mapInList) {
          //gets the index
          let itemIndex = this.selectedMaps.indexOf(map.name);
          map.selected = false;
          this.selectedMaps.splice(itemIndex, 1);
        } else {
          map.selected = true;
          this.selectedMaps.push(map.name);
        }
      }
      else {
        if (mapInList) {
          //remove it
          //gets the index
          let itemIndex = this.selectedMaps.indexOf(map.name);
          map.selected = false;
          this.selectedMaps.splice(itemIndex, 1);
        }
      }
    }
  }

  addRank(rank: any) {
    this.skillList.forEach((arr) => {
      arr.forEach((item) => {
        item.selected = false;
      })
    })
    if (rank.selected) {
      this.selectedRank = '';
      rank.selected = false;
    } else {
      this.selectedRank = rank.name;
      rank.selected = true;
    }
  }

  findMatch() {
    //Get validation field
    let maps = this.selectedMaps;
    let matchType = this.selectedMatchType;
    let rank = this.selectedRank;
    let teamSize = this.selectedTeamSizeType;
    if (maps.length > 0 && matchType !== '' && rank !== '' && teamSize !== '') {

      let match : Match = {
        maps: maps,
        matchType: matchType,
        rank: rank,
        date: '',
        id: '',
        postedby: '',
        teamSize: teamSize
      }

      this.findmatchService.sendMessage(match);
    } else {
      this.validationMessage = 'Please fullfill the search match form!';
    }
  }

}
