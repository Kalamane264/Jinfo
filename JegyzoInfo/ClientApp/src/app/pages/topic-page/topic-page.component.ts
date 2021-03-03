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

  constructor(private knowledgeBaseService: KnowledgeBaseService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let seoUrl: string = this.route.snapshot.paramMap.get('seourl')!;
    this.getFolyamat(seoUrl);
  }

  getFolyamat(seoUrl: string){
    // this.knowledgeBaseService.folyamatAgListazasaFoFolyamatIDSzerint(id).subscribe(folyamat => {
    this.knowledgeBaseService.folyamatAgListazasaFoFolyamatSEOURLSzerint(seoUrl).subscribe(folyamat => {
      console.log('Folyamat resp', folyamat);
      this.folyamat = folyamat;
    })
  }
}
