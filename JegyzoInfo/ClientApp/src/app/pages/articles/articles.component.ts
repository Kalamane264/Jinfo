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
      // this.categories.forEach(c => c.checked = true);
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
      cikks.forEach(c => {
        c.kategoriaV2andSEOSiteKategoriaV2s = c.kategoriaV2andSEOSiteKategoriaV2s.filter(k => k.kategoriaV2ID !== 76);
      });
      this.articles = cikks;
      console.log('núártikülsz', this.articles/* .map(s => s.kategoriaV2andSEOSiteKategoriaV2s) */);
      // this.getGivenAmountOfArticlesNew();
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

  clickMoreArticles(){
    this.counter += this.dose;
    this.getGivenAmountOfArticlesNew();
  }

  isSelected(kategoriaV2andSEOSiteKategoriaV2s: Kategoria[]): boolean{

    let checkeds = this.categories.filter(c => c.checked === true);
    if(checkeds.length == 0) {
      return true;
    }

    let ret = false;
    kategoriaV2andSEOSiteKategoriaV2s.forEach(k => {
      checkeds.forEach(checkedCat => {
        if(k.kategoriaV2ID === checkedCat.kategoriaV2ID) {
          ret = true;
        }
      })
    });
    return ret;
  }
}
