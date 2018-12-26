import { Component, OnInit, Input } from '@angular/core';
import { TabsComponent } from "../tabs/tabs.component";
import { Tab } from "../../models/tab";
@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit, Tab {

  @Input() tabTitle: string;
  

  constructor(private tabsComponent:TabsComponent) {
    
  }

  ngOnInit() {
    this.tabsComponent.addTab(this);
  }

}
