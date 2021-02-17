import { ArticleService } from './../../services/article.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles(){
    this.articleService.getArticles().subscribe(articles => {
      console.log("Ertikülsz", articles);
    });
  }

}
