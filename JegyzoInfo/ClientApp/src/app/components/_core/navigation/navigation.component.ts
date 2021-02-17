import { logging } from 'protractor';
import { Component, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { PageScrollService } from 'ngx-page-scroll-core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  menuIsOpened = false;
  loginIsOpened = false;

  constructor(private pageScrollService: PageScrollService, @Inject(DOCUMENT) private document: any) { }

  ngOnInit(): void {
  }

  clickSandvichMenu(){
    this.menuIsOpened = !this.menuIsOpened;
  }

  clickLogin(){
    this.loginIsOpened = !this.loginIsOpened;
  }
}
