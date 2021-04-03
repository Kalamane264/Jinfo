import { UserService } from 'src/app/services/user.service';
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

  constructor(
    private knowledgeBaseService: KnowledgeBaseService,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    if(this.userService.userLoggedIn) {
      this.getFolyamats();
    } else {
      this.userService.loginHappened.subscribe(x => {
        if(x) {
          this.getFolyamats();
        }
      });
    }
  }

  getFolyamats(){
    this.knowledgeBaseService.getFolyamats().subscribe(folyamats => {
      this.folyamats = folyamats;
      console.log('diz folyamacc', this.folyamats);
    });
  }
}
