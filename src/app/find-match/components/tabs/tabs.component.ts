import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Tab } from '../../models/tab';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent {

  tabs:Tab[] = [];
  @Output() selected = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  selectTab(tab: Tab) {
    this.tabs.forEach((tab) => {
      tab.active = false;
    });
    tab.active = true;
  }

  addTab(tab: Tab) {
    if (this.tabs.length === 0) {
      tab.active = true;
    }
    this.tabs.push(tab);
  }

}
