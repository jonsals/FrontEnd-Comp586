import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArtistService } from 'src/app/together/Share/ArtistService';

@Component({
  selector: 'app-artist-view',
  templateUrl: './artist-view.component.html',
  styleUrls: ['./artist-view.component.css'],
})
export class ArtistViewComponent implements OnInit {
  constructor(public artistApi: ArtistService, public router: Router) {}
  public AlbumId: number = 0;

  artistInfo: Artist[] = [];
  ngOnInit(): void {
    this.getAllArtist();
  }

  getAllArtist() {
    this.artistApi.getArtist().subscribe((res) => (this.artistInfo = res));
  }
  getAlbumId(albumId: any) {
    this.AlbumId = albumId;
    console.log(albumId);
  }

  onClick(data: number) {
    this.router.navigate(['/artistPage', data]);
  }
}

interface Artist {
  artistId: number;
  name: string;
  genre: string;
  imageName: string;
  imageFile: any;
  imageUrl: string;
}
