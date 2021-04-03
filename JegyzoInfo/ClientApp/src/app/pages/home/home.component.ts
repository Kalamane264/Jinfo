import { UserService } from 'src/app/services/user.service';
import { Article } from './../../interfaces/article';
import { ArticleService } from './../../services/article.service';
import { Component, OnInit } from '@angular/core';
import { Folyamat } from 'src/app/interfaces/folyamat';
import { KnowledgeBaseService } from 'src/app/services/knowledge-base.service';
import { Esemeny } from 'src/app/interfaces/esemeny';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  article: Article = new Article();
  folyamats: Folyamat[] = [];

  constructor(
    private knowledgeBaseService: KnowledgeBaseService,
    private articleService: ArticleService,
    public userService: UserService
    ) { }

  ngOnInit(): void {
    this.getFolyamats();
    this.getArticles();
  }

  getFolyamats(){
    this.knowledgeBaseService.getFolyamats().subscribe(folyamats => {
      this.folyamats = folyamats.slice(0, 3);
      console.log('home folyamats resp', folyamats);
      console.log('home folyamats slice', this.folyamats);
    });
  }

  getArticles(){
    this.articleService.getArticles().subscribe(articles => {
      console.log('cikks', articles);

      if (articles.length > 0) {
        this.article = articles[0];
      }
    });
  }
}
