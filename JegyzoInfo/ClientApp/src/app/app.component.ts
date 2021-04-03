import { SpinnerService } from './services/spinner.service';
import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{
  title = 'ClientApp';
  public spinnerCounter = 0;

  constructor(
    private router: Router,
    public spinnerService: SpinnerService,
    private cdr: ChangeDetectorRef
    ) { }


    ngAfterViewInit() {
      //this.message = 'all done loading :)'
      this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        window.scrollTo(0, 0)
    });

      this.spinnerService.spinnerCounterBehavior.subscribe(val => {

        // console.log("sCounter", val);
        this.spinnerCounter = val;
        this.cdr.detectChanges();
      });

    }

}
