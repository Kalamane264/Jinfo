import { Article } from './../../interfaces/article';
import { ArticleService } from './../../services/article.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  articleList: Article[] = [];
  articles: Article[] = [];
  counter = 5;
  dose = 5;

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.getArticlesList();
  }

  getArticlesList(){
    this.articleService.getArticles().subscribe(articleList => {
      this.articleList = articleList;
      console.log("Ertiküliszt", articleList);
      this.getGivenAmountOfArticles();
    });
  }

  getGivenAmountOfArticles(){
    this.articleService.getArticle(this.articleList[this.articles.length].cikkID).subscribe(article => {
      this.articles.push(article);
      console.log('Ertikül', article);
      if (this.articles.length < this.counter && this.articles.length < this.articleList.length){
        this.getGivenAmountOfArticles();
      }
    });
  }

  clickMoreArticles(){
    this.counter += this.dose;
    this.getGivenAmountOfArticles();
  }
}
