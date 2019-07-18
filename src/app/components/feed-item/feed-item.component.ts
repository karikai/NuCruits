import { Component, OnInit, Input } from '@angular/core';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-feed-item',
  templateUrl: './feed-item.component.html',
  styleUrls: ['./feed-item.component.css']
})
export class FeedItemComponent implements OnInit {
  @Input() name;
  @Input() date;
  @Input() picture;
  @Input() content;
  @Input() id;

  goToProfile() {
    UtilitiesService.redirect('cruit/' + this.id)
  }

  constructor() { }

  ngOnInit() {
  }

}
