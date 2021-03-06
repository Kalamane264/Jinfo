import { DemoMaterialModule } from './material-module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';

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
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { ArticleComponent } from './pages/article/article.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { BackComponent } from './components/back/back.component';
import { StatuteComponent } from './pages/statute/statute.component';
import { KnowledgeBaseComponent } from './pages/knowledge-base/knowledge-base.component';
import { TopicPageComponent } from './pages/topic-page/topic-page.component';
import { ChapterComponent } from './components/chapter/chapter.component';
import { DocumentSampleComponent } from './components/document-sample/document-sample.component';
import { VideosPageComponent } from './pages/videos-page/videos-page.component';
import { CoursesPageComponent } from './pages/courses-page/courses-page.component';
import { CourseComponent } from './components/course/course.component';
import { LoginComponent } from './components/_core/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { ViddurationPipe } from './pipes/vidduration.pipe';
import { LogoutDialogComponent } from './components/logout-dialog/logout-dialog.component';
import { ChapterPageComponent } from './pages/chapter-page/chapter-page.component';
import { MoreInfoDialogComponent } from './components/more-info-dialog/more-info-dialog.component';
import { RegistrationDialogComponent } from './components/registration-dialog/registration-dialog.component';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { CommonModule } from '@angular/common';
import { ForgotPassDialogComponent } from './components/forgot-pass-dialog/forgot-pass-dialog.component';
import { ThxDialogComponent } from './components/thx-dialog/thx-dialog.component';

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
    OnlineCoursesComponent,
    HowItWorksComponent,
    ArticleComponent,
    ArticlesComponent,
    BackComponent,
    StatuteComponent,
    KnowledgeBaseComponent,
    TopicPageComponent,
    ChapterComponent,
    DocumentSampleComponent,
    VideosPageComponent,
    CoursesPageComponent,
    CourseComponent,
    LoginComponent,
    ViddurationPipe,
    LogoutDialogComponent,
    ChapterPageComponent,
    MoreInfoDialogComponent,
    RegistrationDialogComponent,
    LoginDialogComponent,
    ForgotPassDialogComponent,
    ThxDialogComponent,
  ],
  entryComponents: [
    LogoutDialogComponent,
    MoreInfoDialogComponent,
    RegistrationDialogComponent,
    LoginDialogComponent,
    ForgotPassDialogComponent,
    ThxDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    NgxPageScrollCoreModule.forRoot({duration: 300, scrollOffset: 100}),
    NgxPageScrollModule,
    DemoMaterialModule
  ],
  providers: [
    CookieService,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
