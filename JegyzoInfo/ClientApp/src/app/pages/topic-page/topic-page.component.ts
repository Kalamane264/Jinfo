import { Folyamat } from './../../interfaces/folyamat';
import { KnowledgeBaseService } from './../../services/knowledge-base.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-topic-page',
  templateUrl: './topic-page.component.html',
  styleUrls: ['./topic-page.component.scss']
})
export class TopicPageComponent implements OnInit {

  public folyamat = new Folyamat();
  URLid: number = 0;

  constructor(private knowledgeBaseService: KnowledgeBaseService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id: string = this.route.snapshot.paramMap.get('id')!;
    this.URLid = parseInt(id);
    this.getFolyamat(this.URLid);
  }

  getFolyamat(id: number){
    this.knowledgeBaseService.folyamatAgListazasaFoFolyamatIDSzerint(id).subscribe(folyamat => {
      console.log('Folyamat resp', folyamat);
      this.folyamat = folyamat;
    })
  }
}
