import { Component, OnInit, Input } from '@angular/core';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-profile-tab',
  templateUrl: './profile-tab.component.html',
  styleUrls: ['./profile-tab.component.css']
})
export class ProfileTabComponent implements OnInit {
  @Input() id;
  @Input() name;
  @Input() picture;

  goToProfile() {
    UtilitiesService.redirect('cruit/' + this.id)
  }

  constructor() { }

  ngOnInit() {
  }

}
