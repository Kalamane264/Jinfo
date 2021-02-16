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

  public folyamat: Folyamat | undefined;
  public parentfolyamat: Folyamat | undefined;
  folyamats: Folyamat[] = [];
  URLid: number = 0;

  constructor(private knowledgeBaseService: KnowledgeBaseService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id: string = this.route.snapshot.paramMap.get('id')!;
    this.URLid = parseInt(id);
    //alert(this.URLid);
    this.getFolyamats();
  }

  getFolyamats(){
    this.knowledgeBaseService.getFolyamats().subscribe(folyamats => {
      this.folyamats = folyamats;
      console.log('Topic folyamacc', this.folyamats);

      this.folyamat = this.knowledgeBaseService.folyamatFindById(folyamats, this.URLid);
      console.log('Foundfolyamat', this.folyamat);
    });
  }
}
