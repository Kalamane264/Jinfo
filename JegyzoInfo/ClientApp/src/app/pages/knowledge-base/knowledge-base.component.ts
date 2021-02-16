import { Folyamat } from './../../interfaces/folyamat';
import { KnowledgeBaseService } from './../../services/knowledge-base.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-knowledge-base',
  templateUrl: './knowledge-base.component.html',
  styleUrls: ['./knowledge-base.component.scss']
})
export class KnowledgeBaseComponent implements OnInit {

  folyamats: Folyamat[] = [];

  constructor(private knowledgeBaseService: KnowledgeBaseService) { }

  ngOnInit(): void {
    this.getFolyamats();
  }

  getFolyamats(){
    this.knowledgeBaseService.getFolyamats().subscribe(folyamats => {
      this.folyamats = folyamats;
      console.log('diz folyamacc', this.folyamats);
    });
  }
}
