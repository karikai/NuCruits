import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/models/job';
import { ProviderService } from 'src/app/services/provider.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-job-post',
  templateUrl: './job-post.component.html',
  styleUrls: ['./job-post.component.css']
})
export class JobPostComponent implements OnInit {
  userObject;
  job: Job;
  
  postJob() {
    this.userObject.jobInteractor.createJob(this.job);
  }

  constructor(private provider: ProviderService) {
    this.userObject = this.provider.userObject;
    this.job = new Job();
    this.job.hired = false;
    this.job.jobId = this.userObject.jobInteractor.randomJobId();
    this.job.employer = this.userObject.uid;
    this.job.date = firebase.firestore.Timestamp.now();
  }

  ngOnInit() {
  }

}
