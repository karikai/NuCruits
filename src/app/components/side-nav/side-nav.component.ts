import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  keyword: string;
  userObject;
  isEmployer;

  signOut() {
    this.afa.auth.signOut().then(() => {
      UtilitiesService.redirect('');
    })
  }

  jobSearch() {
    UtilitiesService.redirect('/job-search/' + this.keyword);
  }

  constructor(private afa: AngularFireAuth, private provider: ProviderService) {
    this.userObject = this.provider.userObject;
    console.log(this.userObject)
    if (this.userObject.accountType === 'employer') {
      this.isEmployer = true;
    } else {
      this.isEmployer = false;
    }
  }

  ngOnInit() {
  }

}
