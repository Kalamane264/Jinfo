import { Component, OnInit } from '@angular/core';
import { Folyamat } from 'src/app/interfaces/folyamat';
import { KnowledgeBaseService } from 'src/app/services/knowledge-base.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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
