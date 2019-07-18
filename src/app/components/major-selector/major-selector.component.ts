import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-major-selector',
  templateUrl: './major-selector.component.html',
  styleUrls: ['./major-selector.component.css']
})
export class MajorSelectorComponent implements OnInit {
  major: string;

  @Output() majorEmitter: EventEmitter<string> = new EventEmitter <string>();

  sendMajor(major) {
    this.majorEmitter.emit(major)
  }

  constructor() { }

  ngOnInit() {
  }

}
