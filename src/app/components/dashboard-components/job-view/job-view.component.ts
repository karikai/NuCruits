import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProviderService } from 'src/app/services/provider.service';
import { Job } from 'src/app/models/job';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-job-view',
  templateUrl: './job-view.component.html',
  styleUrls: ['./job-view.component.css']
})
export class JobViewComponent implements OnInit {
  isLoaded: boolean;
  userObject
  job: Job;
  companyObject;
  applying = false;

  apply() {
    const check = this.userObject.accountType === 'student' && this.applying === false;
    console.log(check);
    console.log(this.userObject.accountType);
    if (check) {
      this.applying = true;
      this.userObject.jobSeeker.applyForJob(this.job.jobId);
      setTimeout(() => {
        this.applying = false;
      }, 1000)
    }
  }

  constructor(private objectProvider: ProviderService, private activatedRoute: ActivatedRoute) {
    const paramId = this.activatedRoute.snapshot.paramMap.get("jid");
    this.userObject = this.objectProvider.userObject;
    this.userObject.profileManager.getJob(paramId).then((job) => {
      console.log(job)
      if (job.employer === this.userObject.uid) {
        UtilitiesService.redirect('applicants/' + job.jobId)
      }
      this.job = job;
      this.userObject.profileManager.getUserInfo(job.employer).then((info) => {
        this.companyObject = {
          name: info.companyName,
          picture: info.profilePicture
        }
      })
      console.log(job)
      this.isLoaded = true;
    })
  }

  ngOnInit() {
  }

}
