import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {}

interface Album {
  id: number;
  name: string;
  price: number;
  totalNumberOfSongs: number;
  artistId: number;
  artist: Artist[];
}

interface SongList {
  songId: number;
  songName: string;
  minute: number;
  seconds: number;
  albumId: number;
  albumInfo: Album[];
}

interface Artist {
  artistId: number;
  name: string;
  genre: string;
  imageName: string;
  imageFile: any;
  imageUrl: string;
}
