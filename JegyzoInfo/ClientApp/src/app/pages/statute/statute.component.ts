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

}
