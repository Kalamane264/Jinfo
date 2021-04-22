import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../../services/category.service';
import { Kategoria } from './../../interfaces/kategoria';
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
  categories: Kategoria[] = [];
  catid = '';
  selectedCatname = ''

  constructor(
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.catid = this.activatedRoute.snapshot.paramMap.get('catid')!;
    console.log('catid', this.catid);
    this.getArticlesListNew();
    this.getCategories();
  }

  getCategories() {
    this.categoryService.kategoriaV2sBySiteID().subscribe(cats => {
      this.selectedCatname = cats.find(c => c.kategoriaV2ID == parseInt(this.catid))?.nev!;
      this.categories = cats.filter(c => c.kategoriaV2ID != 76);
      console.log('Cikkek categories', this.categories);
    });
  }

  getArticlesListNew() {
    let data = {
      Tol: 0,
      Max: 0,
      Kategoriav2ids: this.catid == null? '' : this.catid
    };
    this.categoryService.LegfrissebbCikkekBySiteIDandFirstCikkIDandKategoriaV2IDs(data).subscribe(cikks => {
      this.articleList = cikks;
      console.log('núártikülsz', this.articleList/* .map(s => s.kategoriaV2andSEOSiteKategoriaV2s) */);
      this.getGivenAmountOfArticlesNew();
    });
  }

  getArticlesList() {
    this.articleService.getArticles().subscribe(articleList => {
      this.articleList = articleList;
      console.log("Ertiküliszt", articleList);
      this.getGivenAmountOfArticles();
    });
  }

  getGivenAmountOfArticlesNew(){
    let article = this.articleList[this.articles.length]
    this.articles.push(article);
    console.log('Ertikül', article);
    if (this.articles.length < this.counter && this.articles.length < this.articleList.length){
      this.getGivenAmountOfArticlesNew();
    }
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
    this.getGivenAmountOfArticlesNew();
  }

  clickCat(kategoriaV2ID: number) {
    console.log('kategoriaV2ID', kategoriaV2ID);
  }
}
