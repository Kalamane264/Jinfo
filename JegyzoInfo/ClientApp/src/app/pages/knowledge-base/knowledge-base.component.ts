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

  constructor(
    private knowledgeBaseService: KnowledgeBaseService,
    private userService: UserService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.getFolyamats();
  }

  getFolyamats(){
    this.knowledgeBaseService.getFolyamats().subscribe(folyamats => {
      this.folyamats = folyamats;
      console.log('diz folyamacc', this.folyamats);
    });
  }

  clickMoreInfo(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(MoreInfoDialogComponent, dialogConfig);
  }
}
