import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { EmployerLandingComponent } from './components/employer-landing/employer-landing.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpEmployersComponent } from './components/sign-up-employers/sign-up-employers.component';
import { LearnMoreComponent } from './components/learn-more/learn-more.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { FeedComponent } from './components/dashboard-components/feed/feed.component';
import { JobApplicantsComponent } from './components/dashboard-components/job-applicants/job-applicants.component';
import { JobApplicationsComponent } from './components/dashboard-components/job-applications/job-applications.component';
import { JobViewComponent } from './components/dashboard-components/job-view/job-view.component';
import { JobListingComponent } from './components/dashboard-components/job-listing/job-listing.component';
import { JobEditComponent } from './components/dashboard-components/job-edit/job-edit.component';
import { JobListingsComponent } from './components/dashboard-components/job-listings/job-listings.component';
import { JobPostComponent } from './components/dashboard-components/job-post/job-post.component';
import { JobResultsComponent } from './components/dashboard-components/job-results/job-results.component';
import { ProfileComponent } from './components/dashboard-components/profile/profile.component';
import { MessageComponent } from './components/dashboard-components/message/message.component';
 
const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'employer', component: EmployerLandingComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'sign-up-employer', component: SignUpEmployersComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'learn-more', component: LearnMoreComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'messenger', component: MessageComponent },
  { path: 'feed', component: FeedComponent },
  { path: 'job-applicants', component: JobApplicantsComponent },
  { path: 'job-applications', component: JobApplicationsComponent },
  { path: 'job/:jid', component: JobViewComponent },
  { path: 'post-job', component: JobPostComponent  },
  { path: 'edit-job', component: JobEditComponent },
  { path: 'results', component: JobResultsComponent },
  { path: 'job-listing', component: JobListingComponent },
  { path: 'job-search/:keyword', component: JobResultsComponent },
  { path: 'job-listings', component: JobListingsComponent },
  { path: 'applicants', component: JobApplicantsComponent },
  { path: 'applicants/:jid-app', component: JobApplicantsComponent },
  { path: 'applications', component: JobApplicationsComponent },
  { path: 'cruit/:uid', component: ProfileComponent },
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}