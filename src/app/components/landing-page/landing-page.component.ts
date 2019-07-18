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

  goSignUp() {
    UtilitiesService.redirect('sign-up');
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
