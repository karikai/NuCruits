import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-employer-landing',
  templateUrl: './employer-landing.component.html',
  styleUrls: ['./employer-landing.component.css']
})
export class EmployerLandingComponent implements OnInit {

  goSignUp() {
    UtilitiesService.redirect('sign-up-employer');
  }

  constructor() {
    
  }

  ngOnInit() {
  }

}
