import { IProfileState } from '../../../app/models/iprofilestate';

export class ProfileState {
  private profileState = {} as IProfileState;

  public createProfileState(
    firstName: string,
    lastName: string
  ): IProfileState {
    this.profileState.firstName = firstName;
    this.profileState.lastName = lastName;

    return this.profileState;
  }
}
