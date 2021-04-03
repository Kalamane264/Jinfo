import { UserService } from 'src/app/services/user.service';
import { ExpertService } from './../../services/expert.service';
import { ArticleService } from './../../services/article.service';
import { Video } from './../../interfaces/video';
import { VideoService } from './../../services/video.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-videos-page',
  templateUrl: './videos-page.component.html',
  styleUrls: ['./videos-page.component.scss']
})
export class VideosPageComponent implements OnInit {

  videos: Video[] = [];


  constructor(
    private videoService: VideoService,
    private articleService: ArticleService,
    private expertService: ExpertService,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    if(this.userService.userLoggedIn) {
      this.getVideos();
    } else {
      this.userService.loginHappened.subscribe(x => {
        if(x) {
          this.getVideos();
        }
      })
    }
  }

  getVideos(){
    this.videoService.GetLegfrissebbVideok(50).subscribe(videos => {
      videos.forEach(vid => {
        vid.szakis = [];
      });
      this.videos = videos.filter(v => v.videoAltipus == "előadás");
      console.log('vids', videos);
      videos.forEach(vid => {
        if(vid.szakertoIDs.length > 0) {
            this.getSzaki(vid);
        }
      })
    });
  }

  getSzaki(vid: Video){
    vid.szakertoIDs.forEach(szakiid => {
      this.expertService.getSzakertoAdatokFullBySzakertoId(szakiid).subscribe(szaki => {
        vid.szakis.push(szaki);
      });
    })

  }



}
