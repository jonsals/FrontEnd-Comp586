import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistService } from '../together/Share/ArtistService';

@Component({
  selector: 'app-album-page',
  templateUrl: './album-page.component.html',
  styleUrls: ['./album-page.component.css'],
})
export class AlbumPageComponent implements OnInit {
  constructor(public router: ActivatedRoute, public artistApi: ArtistService) {}
  songList: SongList[] = [];
  songDisplay: SongList[] = [];
  songNotEmpty: boolean = true;
  ngOnInit(): void {
    const id = +this.router.snapshot.params['id'];
    this.getAlbum(id);
    this.getAllSong(id);
  }

  getAlbum(id: number) {
    this.artistApi.getSingleAlbum(id).subscribe((res) => {
      this.songList = res;
    });
  }

  getAllSong(id: number) {
    this.artistApi.getAllSongName().subscribe((res) => {
      this.songList = res;
      this.displaySameAlbumId(id);
    });
  }

  displaySameAlbumId(id: any) {
    this.songDisplay = [];
    var x = 0;
    for (var i = 0; i < this.songList.length; i++) {
      if (this.songList[i].albumId == id) {
        this.songDisplay[x] = this.songList[i];
        x++;
      }
    }
    console.log(this.songDisplay);
    if (this.songDisplay.length == 0) {
      this.songListEmpty();
    }
  }

  songListEmpty() {
    this.songNotEmpty = false;
  }
}

interface SongList {
  songId: number;
  songName: string;
  minute: number;
  seconds: number;
  albumId: number;
  albumInfo: Album[];
}

interface Album {
  id: number;
  name: string;
  price: number;
  totalNumberOfSongs: number;
  artistId: number;
}
