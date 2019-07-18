import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-state-selector',
  templateUrl: './state-selector.component.html',
  styleUrls: ['./state-selector.component.css']
})
export class StateSelectorComponent implements OnInit {
  state: string;
  
  @Output() stateEmitter: EventEmitter<string> = new EventEmitter<string>();

  sendState(state) {
    this.stateEmitter.emit(state);
  }

  constructor() { }

  ngOnInit() {
  }

}
