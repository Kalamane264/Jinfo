import { ArticleService } from './../../services/article.service';
import { Video } from './../../interfaces/Video';
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
    private articleService: ArticleService
    ) { }

  ngOnInit(): void {
    this.getVideos();
  }

  getVideos(){
    this.videoService.GetLegfrissebbVideokBySiteID(25).subscribe(videos => {
      this.videos = videos;
      console.log('vids', videos);
      videos.forEach(vid => {
        if(vid.szakertoIDs.length > 0) {
            this.getSzaki(vid);
        }
      })
    });
  }

  getSzaki(vid: Video){
    vid.szakis = [];
    vid.szakertoIDs.forEach(szakiid => {
      this.articleService.getSzakertoAdatokFullBySzakertoId(szakiid).subscribe(szaki => {
        vid.szakis.push(szaki);
        console.log('vids', vid);
      });
    })

  }



}
