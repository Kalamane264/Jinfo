import { Article } from './../../interfaces/article';
import { ArticleService } from './../../services/article.service';
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
  article: Article;

  constructor(
    private knowledgeBaseService: KnowledgeBaseService,
    private articleService: ArticleService
    ) { }

  ngOnInit(): void {
    this.getFolyamats();
    this.getArticles();
  }

  getFolyamats(){
    this.knowledgeBaseService.getFolyamats().subscribe(folyamats => {
      this.folyamats = folyamats.slice(0, 3);
      // console.log('home folyamacc', this.folyamats);
    });
  }

  getArticles(){
    this.articleService.getArticles().subscribe(articles => {
      console.log('cikks', articles);

      if (articles.length > 0) {
        this.article = articles[0];
      }

     /*  if (articles.length > 0){
        this.articleService.getArticle(articles[0].cikkID).subscribe(article => {
          console.log('cikk', article);
        });
      } */

     /*  articles.forEach(article => {
        this.articleService.getArticle(article.cikkID).subscribe(article => {
          console.log('cikk', article);
        });
      }); */
    })
  }
}
