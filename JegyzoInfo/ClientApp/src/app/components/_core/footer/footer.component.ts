import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  clickTwitt() {

    let w = 600;
    let h = 500;
    let left = (screen.width / 2) - (w / 2);
    let top = (screen.height / 2) - (h / 2);

    let urltoshare = escape(window.location.href);

    console.log('menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=' + h + ',width=' + w + ',left=' + left + ',top=' + top);

    this.popupwindow("http://www.twitter.com/share?url=" + urltoshare, "", 600, 500);
  }

  popupwindow(url: string, title: string, w: number, h: number) {
    var left = (screen.width/2)-(w/2);
    var top = (screen.height/2)-(h/2);
    return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
  }

}
