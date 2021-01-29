import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  menuIsOpened = false;

  constructor() { }

  ngOnInit(): void {
  }

  clickSandvichMenu(){
    this.menuIsOpened = !this.menuIsOpened;
  }
}
