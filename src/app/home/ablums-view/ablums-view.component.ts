import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ArtistService } from 'src/app/together/Share/ArtistService';

@Component({
  selector: 'app-ablums-view',
  templateUrl: './ablums-view.component.html',
  styleUrls: ['./ablums-view.component.css'],
})
export class AblumsViewComponent implements OnInit {
  @Input() artistInt: number = 0;
  @Output() albumId = new EventEmitter();

  constructor(public artistApi: ArtistService, public router: Router) {}
  albumDetails: Album[] = [];
  displayAlbum: Album[] = [];
  ListEmpty: boolean = true;
  ngOnInit(): void {
    this.getAlbums();
  }

  getAlbums() {
    this.artistApi.getAllDetails().subscribe((res) => {
      this.albumDetails = res;
      console.log(this.albumDetails);
      this.displaySameId(this.artistInt);
      (error: any) => {
        console.log(error);
      };
    });
  }
  selectedAlbum(data: any) {
    console.log('clicked');
    this.albumId.emit(data);
  }

  displaySameId(id: any) {
    this.displayAlbum = [];
    var x = 0;
    for (var i = 0; i < this.albumDetails.length; i++) {
      if (this.albumDetails[i].artistId == id) {
        this.displayAlbum[x] = this.albumDetails[i];
        x++;
      }
    }
    if (this.displayAlbum.length == 0) {
      this.valuesAreEmpty();
    }
  }
  valuesAreEmpty() {
    this.ListEmpty = false;
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

interface Album {
  id: number;
  name: string;
  price: number;
  totalNumberOfSongs: number;
  artistId: number;
  artist: Artist[];
}
