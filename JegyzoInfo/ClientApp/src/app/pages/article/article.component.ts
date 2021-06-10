import { UserService } from './../../services/user.service';
import { ExpertService } from './../../services/expert.service';
import { Article } from './../../interfaces/article';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { Route } from '@angular/compiler/src/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MoreInfoDialogComponent } from 'src/app/components/more-info-dialog/more-info-dialog.component';
import { RegistrationDialogData } from 'src/app/interfaces/registration-dialog-data';
import { Diak } from 'src/app/interfaces/diak';
import { RegistrationDialogComponent } from 'src/app/components/registration-dialog/registration-dialog.component';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ArticleComponent implements OnInit {

  article = new Article();
  latogatovezerloCikk = new Article();
  seoUrl = "";
  szaki: any;
  daysOld = 0;
  fullUrl = '';

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private expertService: ExpertService,
    private router: Router,
    private dialog: MatDialog,
    public userService: UserService) { }

  ngOnInit(): void {
    this.fullUrl = window.location.href;
    this.seoUrl = this.route.snapshot.paramMap.get('id')!;
    this.getArticle();
  }

  reset(){
    this.article = new Article();
    this.latogatovezerloCikk = new Article();
    this.szaki = null;
    this.daysOld = 0;
  }

  getArticle() {
    this.articleService.CikkFullBySEOUrlAndSiteID(this.seoUrl).subscribe(article => {
      article.kategoriaV2andSEOSiteKategoriaV2s = article.kategoriaV2andSEOSiteKategoriaV2s.filter(k => k.kategoriaV2ID != 76);
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
    this.expertService.getSzakertoAdatokFullBySzakertoId(id).subscribe(szaki => {
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

    const diffTime = Math.abs(now.valueOf() - date.valueOf());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    this.daysOld = diffDays;
  }

  clickMoreInfo() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    // dialogConfig.disableClose = true;

    const dialogRef = this.dialog.open(MoreInfoDialogComponent, dialogConfig);
  }

  clickCat(kategoriaV2ID: number) {
    console.log('catClick');
  }

  clickRegistration() {
    let data = new RegistrationDialogData();
    data.kepzesId = 2281;
    data.diakMe = new Diak();
    data.itsme = true;
    data.reducedForm = true;

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = data;

    const dialogRef = this.dialog.open(RegistrationDialogComponent, dialogConfig);
  }
}
