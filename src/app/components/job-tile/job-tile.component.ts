import { Component, OnInit, Input } from '@angular/core';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-job-tile',
  templateUrl: './job-tile.component.html',
  styleUrls: ['./job-tile.component.css']
})
export class JobTileComponent implements OnInit {
  
  @Input() title: string;
  @Input() description: string;
  @Input() imageURL: string; 
  @Input() jid: string;

  goToJob() {
    UtilitiesService.redirect('job/' + this.jid)
  }

  constructor() { }

  ngOnInit() {
  }

}
