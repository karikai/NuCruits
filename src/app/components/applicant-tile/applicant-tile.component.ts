import { Component, OnInit, Input } from '@angular/core';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-applicant-tile',
  templateUrl: './applicant-tile.component.html',
  styleUrls: ['./applicant-tile.component.css']
})
export class ApplicantTileComponent implements OnInit {

  @Input() name: string;
  @Input() major: string;
  @Input() id: string;
  @Input() picture: string;

  goToProfile() {
    UtilitiesService.redirect('cruit/' + this.id)
  }

  constructor() { }

  ngOnInit() {
  }

}
