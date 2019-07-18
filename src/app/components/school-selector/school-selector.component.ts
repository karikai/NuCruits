import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-school-selector',
  templateUrl: './school-selector.component.html',
  styleUrls: ['./school-selector.component.css']
})
export class SchoolSelectorComponent implements OnInit {
  school: string;

  @Output() schoolEmitter: EventEmitter<string> = new EventEmitter<string>();

  sendSchool(school) {
    this.schoolEmitter.emit(school);
  }

  constructor() { }

  ngOnInit() {
  }

}
