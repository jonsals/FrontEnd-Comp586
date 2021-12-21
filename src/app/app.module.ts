import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { LoginComponent } from './login/login.component';

import { TogetherComponent } from './together/together.component';
import { ArtistViewComponent } from './home/artist-view/artist-view.component';
import { AblumsViewComponent } from './home/ablums-view/ablums-view.component';
import { SongViewComponent } from './home/song-view/song-view.component';
import { ArtistPageComponent } from './artist-page/artist-page.component';
import { AlbumPageComponent } from './album-page/album-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    LoginComponent,

    TogetherComponent,
    ArtistViewComponent,
    AblumsViewComponent,
    SongViewComponent,
    ArtistPageComponent,
    AlbumPageComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'Login', component: LoginComponent },
      { path: 'together', component: TogetherComponent },
      { path: 'artistPage/:id', component: ArtistPageComponent },
      { path: 'albumPage/:id', component: AlbumPageComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
