import { Article } from './../../interfaces/article';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  article: Article;
  latogatovezerloCikk: Article;
  seoUrl = "";
  szaki: any;
  daysOld = 0;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private router: Router) { }

  ngOnInit(): void {
    this.seoUrl = this.route.snapshot.paramMap.get('id')!;
    this.getArticle();
  }

  reset(){
    this.article = {} as Article;
    this.latogatovezerloCikk = {} as Article;
    this.szaki = null;
    this.daysOld = 0;
  }

  getArticle() {
    this.articleService.getArticleBySeoUrl(this.seoUrl).subscribe(article => {
      this.article = article;
      if(article.latogatovezerloCikkID) {
        this.getLatogatovezerloCikk(article.latogatovezerloCikkID);
      }
      console.log('article', article);
      this.countDaysOld(article.megjelenesDatum);
      this.getSzaki(article.szakertoID);
    });
  }

  getLatogatovezerloCikk(latogatovezerloCikkID: number){
    this.articleService.getArticle(latogatovezerloCikkID).subscribe(latogatovezerloCikk => {
      this.latogatovezerloCikk = latogatovezerloCikk;
      console.log('latogatovezerloCikk', latogatovezerloCikk);
    })
  }

  getSzaki(id: number) {
    this.articleService.getSzakertoAdatokFullBySzakertoId(id).subscribe(szaki => {
      this.szaki = szaki;
      console.log('szaki', szaki)
    });
  }

  redirToNew(target: string){
    this.reset();
    this.router.navigate(['cikk', target]);
    this.seoUrl = target;
    console.log('redir', this.seoUrl);
    this.getArticle();
  }

  countDaysOld(date: Date){
    date = new Date(date);
    let now = new Date();
    // console.log('faísutzas', date);

    const diffTime = Math.abs(now.valueOf() - date.valueOf());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    // console.log('diffdayz', diffDays);
    this.daysOld = diffDays;
  }
}
