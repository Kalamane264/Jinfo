import { SpinnerService } from './../../services/spinner.service';
import { CategoryService } from './../../services/category.service';
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
  legfrissebbLegfrissebbCikk = new Article();

  constructor(
    private knowledgeBaseService: KnowledgeBaseService,
    private articleService: ArticleService,
    public userService: UserService,
    private categoryService: CategoryService,
    private spinnerService: SpinnerService
    ) { }

  ngOnInit(): void {
    this.headerLeftSideData();
    this.getFolyamats();
    this.getArticles();
    this.headerLeftSideData();

    console.log('loginHappened', this.userService.loginHappened.value);
  }

  headerLeftSideData() {
    this.categoryService.kategoriaV2sBySiteID().subscribe(cats => {
      let legfrissebbKat = cats.find(c => c.nev === 'Legfrissebb');
      if(legfrissebbKat !== undefined) {
        let data = {
          Tol: 0,
          Max: 1,
          Kategoriav2ids: legfrissebbKat.kategoriaV2ID.toString()
        };
        this.categoryService.LegfrissebbCikkekBySiteIDandFirstCikkIDandKategoriaV2IDs(data).subscribe(firstLegfrissebb => {
          if(firstLegfrissebb) {
            this.legfrissebbLegfrissebbCikk = firstLegfrissebb[0];
          }
        });
      }
    });
  }

  getFolyamats(){
    this.spinnerService.showSpinner();
    this.knowledgeBaseService.getFolyamats().subscribe(folyamats => {
      this.spinnerService.hideSpinner();
      folyamats.sort((a, b) => {
        return +new Date(b.frissitesDatum) - +new Date(a.frissitesDatum);
      });
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
