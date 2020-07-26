import { IProfileState } from '../../../app/models/iprofilestate';

export class ProfileStateHistory {
  private profileStates: IProfileState[] = [];

  public push(profileState: IProfileState): void {
    this.profileStates.push(profileState);
  }

  public peek(): IProfileState {
    const lastProfileStateIndex = this.profileStates.length - 1;
    return this.profileStates[lastProfileStateIndex];
  }
}
