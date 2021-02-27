import { StatuteService } from './../../services/statute.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-statute',
  templateUrl: './statute.component.html',
  styleUrls: ['./statute.component.scss']
})
export class StatuteComponent implements OnInit {

  uid = "";

  constructor(
    private route: ActivatedRoute,
    private statuteService: StatuteService) { }

  ngOnInit(): void {
    this.uid = this.route.snapshot.paramMap.get('uid')!;
    console.log("uid", this.uid);
    this.getJsz(this.uid);
  }

  getJsz(uid: string){
    this.statuteService.GetJogszabalySzovegJelenlegiDatumSzerint(uid).subscribe(jsz => {
      console.log("jsz", jsz);
    })
  }

}
