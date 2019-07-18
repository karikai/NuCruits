import { Component, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/services/provider.service';
import { ActivatedRoute } from '@angular/router';
import { Job } from 'src/app/models/job';

@Component({
  selector: 'app-job-applicants',
  templateUrl: './job-applicants.component.html',
  styleUrls: ['./job-applicants.component.css']
})
export class JobApplicantsComponent implements OnInit {
  userObject;
  job: Job;
  applicants = [];
  isLoaded;

  collectionsOfFour() {
    let applicantLength = this.applicants.length;
    const fourApplicantArray = [];
    let tempArray = [];
    let currentIndex = 0;
    let count = 0;
    while(applicantLength > 0) {
      if (applicantLength === 1 && currentIndex !== 4) {
        fourApplicantArray.push(tempArray);
      }

      if (currentIndex > 4) {
        fourApplicantArray.push(tempArray);
        tempArray = [];
        currentIndex = 0;
      } else {
        tempArray.push(this.applicants[count]);
      }

      currentIndex ++;
      count ++;
      applicantLength --;
    }

    return fourApplicantArray;
  }

  constructor(private objectProvider: ProviderService, private activatedRoute: ActivatedRoute) {
    const paramId = this.activatedRoute.snapshot.paramMap.get("jid-app");
    this.userObject = this.objectProvider.userObject;
    this.userObject.profileManager.getJob(paramId).then((job) => {
      this.job = job;
      job.applicants.forEach((app) => {
        this.userObject.profileManager.getUserInfo(app).then((userInfo) => {
          const applicantObject = {
            name: userInfo.firstName + ' ' + userInfo.lastName,
            picture: userInfo.profilePicture,
            major: userInfo.major,
            id: userInfo.uid
          }
          this.applicants.push(applicantObject)
        })
      })
      console.log(this.applicants);
      this.isLoaded = true;
    })
  }

  ngOnInit() {
  }

}
