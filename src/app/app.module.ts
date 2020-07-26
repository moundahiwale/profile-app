import { ProfileStateHistory } from './../utils/memento/profile-state/profile-state-history';
import { ProfileState } from './../utils/memento/profile-state/profile-state';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileSettingsComponent } from './components/profile-settings/profile-settings.component';

@NgModule({
  declarations: [AppComponent, ProfileSettingsComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [ProfileState, ProfileStateHistory],
  bootstrap: [AppComponent],
})
export class AppModule {}
