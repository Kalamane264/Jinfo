import { StatuteService } from './../../services/statute.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-statute',
  templateUrl: './statute.component.html',
  styleUrls: [
    './statute.component.scss',
    './site.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class StatuteComponent implements OnInit {

  uid = "";
  jsz = null;

  searchTerm = "";

  constructor(
    private route: ActivatedRoute,
    private statuteService: StatuteService) { }

  ngOnInit(): void {
    this.uid = this.route.snapshot.paramMap.get('uid')!;
    console.log("uid", this.uid);
    this.getJsz(this.uid);
  }

  getJsz(uid: string){
    this.statuteService.getJogszabalySzovegHTMLJelenlegiDatumSzerint(uid).subscribe(jsz => {
      this.jsz = jsz;
      console.log("this.jsz", this.jsz);
    })
  }

  search() {
    //alert(this.searchTerm);
    if(this.searchTerm.length < 2) {
      alert('A kereséshez minimum 2 karakter hosszúságú szövegrészt írjon be!');
      return;
    }

    this.searchReset();
    let cumo = Array.from(document.getElementsByClassName("jszakaszSzoveg"));
    //console.log('cumo', cumo);

    cumo.forEach(element => {
      let slices = element.innerHTML.split(this.searchTerm);
      if(slices.length > 1) {
        let innerHtmlResult = "";
        slices.forEach((slice, index) => {
          if(index > 0) {
            innerHtmlResult += '<span class="searchFound">' + this.searchTerm + '</span>';
          }
          innerHtmlResult += slice;
        });
        element.innerHTML = innerHtmlResult;
      }
    });
  }

  searchReset() {
    let cumo = Array.from(document.getElementsByClassName("searchFound"));
    console.log('resetcumo', cumo);

    cumo.forEach(element => {
      console.log('outer', element.outerHTML);
      console.log('inner', element.innerHTML);
      element.outerHTML = element.innerHTML;
    });
  }

}
