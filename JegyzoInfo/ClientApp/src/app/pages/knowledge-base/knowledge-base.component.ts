import { SpinnerService } from './../../services/spinner.service';
import { MoreInfoDialogComponent } from './../../components/more-info-dialog/more-info-dialog.component';
import { UserService } from 'src/app/services/user.service';
import { Folyamat } from './../../interfaces/folyamat';
import { KnowledgeBaseService } from './../../services/knowledge-base.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-knowledge-base',
  templateUrl: './knowledge-base.component.html',
  styleUrls: ['./knowledge-base.component.scss']
})
export class KnowledgeBaseComponent implements OnInit {

  folyamats: Folyamat[] = [];
  legfrissebb = true;
  cimszerint = false;
  legnepszerubb = false;

  constructor(
    private knowledgeBaseService: KnowledgeBaseService,
    public userService: UserService,
    private dialog: MatDialog,
    private spinnerService: SpinnerService
    ) { }

  ngOnInit(): void {
    this.getFolyamats();
  }

  getFolyamats(){
    this.spinnerService.showSpinner();
    this.knowledgeBaseService.getFolyamats().subscribe(folyamats => {
      this.spinnerService.hideSpinner();
      this.folyamats = folyamats;
      console.log('diz folyamacc', this.folyamats);
      this.orderByLegfrissebb();
    });
  }

  clickMoreInfo(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(MoreInfoDialogComponent, dialogConfig);
  }

  orderByName() {
    this.folyamats.sort((a, b) => {
      return (a.nev > b.nev) ? 1 : -1;
    });
  }

  orderByLegfrissebb() {
    this.folyamats.sort((a, b) => {
      return +new Date(b.frissitesDatum) - +new Date(a.frissitesDatum);
    });
  }
}
