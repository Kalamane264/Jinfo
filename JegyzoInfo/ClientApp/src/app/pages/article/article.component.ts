import { Article } from './../../interfaces/article';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  URLid: number = 0;
  article: Article;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService) { }

  ngOnInit(): void {
    let id: string = this.route.snapshot.paramMap.get('id')!;
    this.URLid = parseInt(id);
    this.getArticle();
  }

  getArticle() {
    this.articleService.getArticle(this.URLid).subscribe(article => {
      this.article = article;
      console.log('article', article);
    });
  }
}
