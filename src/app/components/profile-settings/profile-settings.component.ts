import { ProfileStateHistory } from '../../../utils/memento/profile-state/profile-state-history';
import { IProfileState } from './../../models/iprofilestate';
import { ProfileState } from '../../../utils/memento/profile-state/profile-state';
import { IRequestState } from '../../models/irequeststate';
import { IProfile } from './../../models/iprofile';
import { ProfileService } from './../../services/profile/profile.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';

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

  constructor(
    private profileService: ProfileService,
    private profileState: ProfileState,
    private profileStateHistory: ProfileStateHistory,
    public translate: TranslateService
  ) {}

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
      this.profileStateHistory.push(this.createProfileState());

      this.requestState.loading = false;
    } catch (error) {
      console.error('Failed to fetch user profile, retrying...');
      this.getProfileUser();
    }
  }

  ngOnInit(): void {
    this.translate.addLangs(environment.availableLanguages);
    this.translate.setDefaultLang(environment.defaultLanguage);

    this.initialiseRequestState();
    this.getProfileUser();
  }

  resetEmail(): void {
    this.user.email = null;
  }

  revertUserChange(): void {
    this.user = { ...this.userCopy };
  }

  createProfileState(): IProfileState {
    return this.profileState.createProfileState(
      this.user.firstName,
      this.user.lastName
    );
  }

  restoreProfileState(profileState: IProfileState): void {
    this.user.firstName = profileState.firstName;
    this.user.lastName = profileState.lastName;
  }

  async updateNameAndGenerateEmail(): Promise<void> {
    try {
      this.requestState = {
        error: { error: false, message: '' },
        saving: true,
      };
      this.resetEmail();

      await this.profileService.setName(
        this.user.firstName,
        this.user.lastName
      );
      this.requestState.saving = false;

      const { email } = await this.profileService.setUserEmail();
      this.user.email = email;

      this.profileStateHistory.push(this.createProfileState());
    } catch (error) {
      this.requestState = {
        error: { error: true, message: `${error.error}` },
        saving: false,
      };
      this.resetEmail();
      // Using peek instead of pop as there can be errors multiple times and popping
      // profile states on every error will return undefined at some stage
      this.restoreProfileState(this.profileStateHistory.peek());
    }
  }

  onInputKeyUp(): void {
    this.initialiseRequestState();
    this.resetEmail();
  }
}
