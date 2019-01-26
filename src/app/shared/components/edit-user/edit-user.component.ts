import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../../core/providers/auth/auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  public user: User;
  public respondMessage: string = '';
  public userDetailsForm: FormGroup;
  public url: string;

  public countries = ["Denmark", "Sweden", "Norway"];
  public favweapons = ["AK-47", "Galil AR", "M4A4", "M4A1-S", "AWP", "FAMAS", "Desert Eagle"];
  public ranks = ["Silver1", "Silver2", "Silver3", "Silver4", "SilverElite", "SilverEliteMaster",
                   "Goldnova1", "Goldnova2", "Goldnova3", "Goldnovamaster",
                   "MasterGuardian", "MasterGuardian2", "MasterGuardianElite",
                  "DistinguishedMasterGuardian", "LegendaryEagle", "LegendaryEagleMaster", "SupremeMasterFirstClass", "TheGlobalElite"];

  constructor(private authService: AuthService, public fb: FormBuilder) {
    this.authService.currentUser$.subscribe((data) => {
      this.user = data;

      if(this.user) {
        this.userDetailsForm.patchValue({
          firstname: this.user.firstname,
          lastname: this.user.lastname,
          age: this.user.age,
          country: this.user.country,
          favweap: this.user.favweap,
          rank: this.user.rank,
          clan: this.user.clan
        });
        this.url = this.user.photoURL;
      }

    });

   }

  ngOnInit() {
    this.userDetailsForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      age: [],
      country: [''],
      favweap: [''],
      rank: [''],
      clan: ['']
    });
  }

  readUrl(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event:any) => {
        this.url = event.target.result;
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  changeUserDetails() {
    if(this.userDetailsForm.valid) {

      this.user = {
        uid: this.user.uid,
        age: this.userDetailsForm.value.age !== undefined ? this.userDetailsForm.value.age : null,
        email: this.user.email,
        username: this.user.username,
        isOnline: this.user.isOnline,
        photoURL: this.url !== undefined ? this.url : "",
        clan: this.userDetailsForm.value.clan !== undefined ? this.userDetailsForm.value.clan : "",
        country: this.userDetailsForm.value.country !== undefined ? this.userDetailsForm.value.country : "",
        rank: this.userDetailsForm.value.rank !== undefined ? this.userDetailsForm.value.rank : "",
        firstname: this.userDetailsForm.value.firstname !== undefined ? this.userDetailsForm.value.firstname : "",
        lastname: this.userDetailsForm.value.lastname !== undefined ? this.userDetailsForm.value.lastname : ""
      }


      //goto service
      this.authService.changeUser(this.user);


      this.respondMessage = 'Your user is now updated!';
    }

  }

}
