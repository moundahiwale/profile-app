import { IRequestStates } from './../../models/irequeststates';
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
  public requestStates: IRequestStates = {
    loading: false,
    error: false,
    saving: false,
  };
  public errorMessage: string;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.fetchProfile();
  }

  async fetchProfile(): Promise<void> {
    try {
      this.requestStates.loading = true;

      this.user = await this.profileService.getProfileUser();

      this.requestStates.loading = false;
    } catch (error) {
      console.error('Failed to fetch user profile, retrying...');
      this.fetchProfile();
    }
  }

  async saveFirstName(): Promise<void> {
    try {
      this.requestStates = { error: false, saving: true };

      await this.profileService.setName(this.user.firstName);

      this.requestStates.saving = false;
    } catch (error) {
      this.requestStates = { error: true, saving: false };
      this.errorMessage = `${error.error}`;
    }
  }

  onKeyUp(): void {
    if (this.requestStates.error) {
      this.requestStates.error = false;
      this.errorMessage = '';
    }
  }
}
