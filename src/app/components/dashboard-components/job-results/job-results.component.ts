import { Component, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/services/provider.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-results',
  templateUrl: './job-results.component.html',
  styleUrls: ['./job-results.component.css']
})
export class JobResultsComponent implements OnInit {
  userObject: any;
  originalList = [];
  jobList = [];
  isLoaded: boolean; 
  keyword: string;

  collectionsOfFour() {
    let jobLength = this.jobList.length;
    const fourJobArray = [];
    let tempArray = [];
    let currentJobIndex = 0;
    let count = 0;
    while(jobLength > 0) {
      if (jobLength === 1 && currentJobIndex !== 4) {
        fourJobArray.push(tempArray);
      }

      if (currentJobIndex > 4) {
        fourJobArray.push(tempArray);
        tempArray = [];
        currentJobIndex = 0;
      } else {
        tempArray.push(this.jobList[count]);
      }

      currentJobIndex ++;
      count ++;
      jobLength --;
    }

    return fourJobArray;
  }

  searchByKeyword(keyword) {
    keyword = keyword.toLowerCase();
    const searchedJobs = [];
    this.originalList.forEach((job) => {
      if (job.positionTitle.toLowerCase().includes(keyword)) {
        searchedJobs.push(job);
      }
    })
    this.jobList = searchedJobs;
  }

  constructor(private provider: ProviderService, private activatedRoute: ActivatedRoute) {
    const jobId = this.activatedRoute.snapshot.paramMap.get("keyword");
    this.userObject = this.provider.userObject;
    this.userObject.profileManager.getAllJobs().then((jobs) => {
      this.originalList = jobs;
      this.jobList = jobs;
      this.searchByKeyword(jobId);
      this.isLoaded = true;
    })
  }

  ngOnInit() {
  }

}
