import { IRequestState } from '../../models/irequeststate';
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
  public userCopy: IProfile;
  public requestState: IRequestState;

  constructor(private profileService: ProfileService) {}

  initialiseRequestState(): void {
    this.requestState = {
      loading: false,
      saving: false,
      error: { error: false, message: '' },
    };
  }

  async getProfileUser(): Promise<void> {
    try {
      this.requestState.loading = true;

      this.user = await this.profileService.getProfileUser();
      this.userCopy = { ...this.user };

      this.requestState.loading = false;
    } catch (error) {
      console.error('Failed to fetch user profile, retrying...');
      this.getProfileUser();
    }
  }

  ngOnInit(): void {
    this.initialiseRequestState();
    this.getProfileUser();
  }

  resetEmail(): void {
    this.user.email = null;
    this.userCopy.email = null;
  }

  revertUserChange(): void {
    this.user = { ...this.userCopy };
  }

  async updateNameAndGenerateEmail(): Promise<void> {
    try {
      this.requestState = {
        error: { error: false, message: '' },
        saving: true,
      };
      this.resetEmail();

      const userResponse = await this.profileService.setName(
        this.user.firstName,
        this.user.lastName
      );
      this.requestState.saving = false;

      const { email } = await this.profileService.setUserEmail();
      this.user.email = email;

      // userCopy will be used to reset the user to previous state in case of an error
      this.userCopy = { ...userResponse };
    } catch (error) {
      this.requestState = {
        error: { error: true, message: `${error.error}` },
        saving: false,
      };
      this.resetEmail();
      this.revertUserChange();
    }
  }

  onInputKeyUp(): void {
    this.initialiseRequestState();
    this.resetEmail();
  }
}
