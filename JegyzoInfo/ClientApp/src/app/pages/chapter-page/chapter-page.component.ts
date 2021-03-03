import { Folyamat } from './../../interfaces/folyamat';
import { KnowledgeBaseService } from 'src/app/services/knowledge-base.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chapter-page',
  templateUrl: './chapter-page.component.html',
  styleUrls: ['./chapter-page.component.scss']
})
export class ChapterPageComponent implements OnInit {

  folyamat = new Folyamat();
  parentFolyamat = new Folyamat();

  constructor(
    private route: ActivatedRoute,
    private knowledgeBaseService: KnowledgeBaseService
  ) { }

  ngOnInit(): void {
    let seoUrl = this.route.snapshot.paramMap.get('seourl');
    if(seoUrl) {
      this.getFolyamat(seoUrl);
    }
  }

  getFolyamat(seoUrl: string) {
    this.knowledgeBaseService.folyamatAgListazasaFoFolyamatSEOURLSzerint(seoUrl).subscribe(folyamat => {
    // this.knowledgeBaseService.folyamatAgListazasaFoFolyamatIDSzerint(seoUrl).subscribe(folyamat => {
      this.folyamat = folyamat;
      console.log("folyamat", folyamat);
      if(folyamat.parentID) {
        this.getParentFolyamat(folyamat.parentID);
      }
    });
  }

  getParentFolyamat(id: number){
    this.knowledgeBaseService.folyamatAgListazasaFoFolyamatIDSzerint(id).subscribe(parentFolyamat => {
      this.parentFolyamat = parentFolyamat;
    });
  }
}
