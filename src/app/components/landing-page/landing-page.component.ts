import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  isSignIn = false;
  slideNumber = 1;

  goSignUp() {
    UtilitiesService.redirect('sign-up');
  }

  slideChange() {
    if (this.slideNumber === 3) {
      this.slideNumber = 1
    } else {
      this.slideNumber++;
    }
  }

  constructor(private provider: ProviderService) {
    const userObject = this.provider.userObject;
    if (userObject) {
      this.isSignIn = true;
    }
  }

  ngOnInit() {
  }

}
