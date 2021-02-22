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

  seoUrl = "";
  article: Article;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService) { }

  ngOnInit(): void {
    this.seoUrl = this.route.snapshot.paramMap.get('id')!;
    this.getArticle();
  }

  getArticle() {
    this.articleService.getArticleBySeoUrl(this.seoUrl).subscribe(article => {
      this.article = article;
      console.log('article', article);
    });
  }
}
