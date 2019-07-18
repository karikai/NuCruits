import { Component, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-job-listings',
  templateUrl: './job-listings.component.html',
  styleUrls: ['./job-listings.component.css']
})
export class JobListingsComponent implements OnInit {
  isLoaded = false
  userObject;
  filledJobs = [];
  activeJobs = [];

  initialize() {
    this.userObject = this.provider.userObject;
    this.userObject.jobInteractor.getJobListings(this.userObject.uid).then((list) => {
      list.forEach(element => {
        if (element.hired) {
          this.filledJobs.push(element)
        } else {
          this.activeJobs.push(element)
        }
      });
    })
    this.isLoaded = true;
  }

  constructor(private provider: ProviderService) {
    this.initialize();
  }

  ngOnInit() {
  }

}
