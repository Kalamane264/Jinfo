import { UserService } from 'src/app/services/user.service';
import { VideoService } from './../../services/video.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { Video } from 'src/app/interfaces/video';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
  @ViewChild('ngcarousel', { static: true }) ngCarousel: NgbCarousel;

  vids: Video[] = [];
  buttonGotoFullos = false;

  constructor(
    private videoService: VideoService,
    private userService: UserService
  ){

  }

  ngOnInit(): void {
    this.getVids();
    this.checkLogin();
  }

  checkLogin(){
    this.buttonGotoFullos = this.userService.userLoggedIn;

    this.userService.loginHappened.subscribe(x => {
      this.buttonGotoFullos = x;
    });
  }

  getVids(){
    this.videoService.GetLegfrissebbVideok(50).subscribe(vids => {
      this.vids = vids.filter(v => v.videoAltipus == "egyéb");
      console.log('Vids', this.vids);
    });
  }
}
