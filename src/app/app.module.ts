import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppRoutingModule } from './app-routing.module';
import { TimestampPipe } from './pipes/timestamp.pipe';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LearnMoreComponent } from './components/learn-more/learn-more.component';
import { StateContainerComponent } from './state-container/state-container.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FeedComponent } from './components/dashboard-components/feed/feed.component';
import { ProfileComponent } from './components/dashboard-components/profile/profile.component';
import { SettingsComponent } from './components/dashboard-components/settings/settings.component';
import { EditProfileComponent } from './components/dashboard-components/edit-profile/edit-profile.component';
import { JobResultsComponent } from './components/dashboard-components/job-results/job-results.component';
import { JobApplicationsComponent } from './components/dashboard-components/job-applications/job-applications.component';
import { JobViewComponent } from './components/dashboard-components/job-view/job-view.component';
import { JobPostComponent } from './components/dashboard-components/job-post/job-post.component';
import { JobListingsComponent } from './components/dashboard-components/job-listings/job-listings.component';
import { JobEditComponent } from './components/dashboard-components/job-edit/job-edit.component';
import { JobApplicantsComponent } from './components/dashboard-components/job-applicants/job-applicants.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FeedItemComponent } from './components/feed-item/feed-item.component';
import { JobTileComponent } from './components/job-tile/job-tile.component';
import { JobListingComponent } from './components/dashboard-components/job-listing/job-listing.component';
import { ApplicantTileComponent } from './components/applicant-tile/applicant-tile.component';
import { StateSelectorComponent } from './components/state-selector/state-selector.component';
import { SchoolSelectorComponent } from './components/school-selector/school-selector.component';
import { MajorSelectorComponent } from './components/major-selector/major-selector.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { MessageComponent } from './components/dashboard-components/message/message.component';
import { SignUpEmployersComponent } from './components/sign-up-employers/sign-up-employers.component';
import { ProfileTabComponent } from './components/profile-tab/profile-tab.component';
import { EmployerLandingComponent } from './components/employer-landing/employer-landing.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LearnMoreComponent,
    StateContainerComponent,
    SignInComponent,
    SignUpComponent,
    FeedbackComponent,
    NavbarComponent,
    FeedComponent,
    ProfileComponent,
    SettingsComponent,
    EditProfileComponent,
    JobResultsComponent,
    JobApplicationsComponent,
    JobViewComponent,
    JobPostComponent,
    JobListingsComponent,
    JobEditComponent,
    JobApplicantsComponent,
    DashboardComponent,
    FeedItemComponent,
    JobTileComponent,
    JobListingComponent,
    ApplicantTileComponent,
    StateSelectorComponent,
    SchoolSelectorComponent,
    MajorSelectorComponent,
    SideNavComponent,
    MessageComponent,
    SignUpEmployersComponent,
    ProfileTabComponent,
    TimestampPipe,
    EmployerLandingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
