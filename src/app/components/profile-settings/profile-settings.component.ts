import { IProfile } from './../../models/iprofile';
import { ProfileService } from './../../services/profile/profile.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
})
export class ProfileSettingsComponent implements OnInit {
  public title = 'Profile';
  public user: IProfile;

  constructor(private profile: ProfileService) {}

  ngOnInit(): void {}

  saveProfile(): void {}
}
