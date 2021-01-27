import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavigationComponent } from './components/_core/navigation/navigation.component';
import { FooterComponent } from './components/_core/footer/footer.component';
import { TopicComponent } from './components/topic/topic.component';
import { TopicsComponent } from './components/topics/topics.component';
import { VideosComponent } from './components/videos/videos.component';
import { CarouselConfigComponent } from './components/carousel-config/carousel-config.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OnlineCoursesComponent } from './components/online-courses/online-courses.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    NavigationComponent,
    TopicComponent,
    TopicsComponent,
    VideosComponent,
    CarouselConfigComponent,
    OnlineCoursesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
