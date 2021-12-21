import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistService } from '../together/Share/ArtistService';

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.css'],
})
export class ArtistPageComponent implements OnInit {
  constructor(
    public router: ActivatedRoute,
    public artistApi: ArtistService,
    public nav: Router
  ) {}
  ArtistId: number = 0;
  singleArtist: Artist[] = [];
  getAllAlbums: Album[] = [];
  displaySameAlbums: Album[] = [];
  notEmpty: boolean = true;
  artistName: string = 'Temp';
  ngOnInit(): void {
    const id = +this.router.snapshot.params['id'];
    this.ArtistId = id;
    this.getArtist(id);
    this.getAlbums();
  }

  getArtist(id: number) {
    this.artistApi.getSingleArtist(id).subscribe((res) => {
      this.artistName = res.name;
      this.singleArtist = res;
      console.log(this.singleArtist);
    });
  }
  getAlbums() {
    this.artistApi.getAllDetails().subscribe((res) => {
      this.getAllAlbums = res;
      this.displaySameId(this.ArtistId);
      (error: any) => {
        console.log(error);
      };
    });
  }
  displaySameId(id: any) {
    this.displaySameAlbums = [];
    var x = 0;
    for (var i = 0; i < this.getAllAlbums.length; i++) {
      if (this.getAllAlbums[i].artistId == id) {
        this.displaySameAlbums[x] = this.getAllAlbums[i];
        x++;
      }
    }
    if (this.displaySameAlbums.length == 0) {
      this.valuesAreEmpty();
    }
  }
  valuesAreEmpty() {
    this.notEmpty = false;
  }

  onClick(data: number) {
    this.nav.navigate(['/albumPage', data]);
  }
}

interface Album {
  id: number;
  name: string;
  price: number;
  totalNumberOfSongs: number;
  artistId: number;
  artist: Artist[];
  imageUrl: string;
}
interface Artist {
  artistId: number;
  name: string;
  genre: string;
  imageName: string;
  imageFile: any;
  imageUrl: string;
}
