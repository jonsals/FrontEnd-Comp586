import { Component, OnInit } from '@angular/core';
import { ArtistService } from 'src/app/together/Share/ArtistService';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css'],
})
export class AlbumListComponent implements OnInit {
  personDetails: PersonDetails[] = [];

  constructor(public serviceApi: ArtistService) {}

  ngOnInit(): void {
    this.getDetails();
  }

  getDetails() {
    this.serviceApi.getAllDetails().subscribe((res) => {
      this.personDetails = res;
      // this.displaySameId();
      // this.callParentGreet();
      // console.log(this.personDetails);
    });
  }
}

interface PersonDetails {
  id: number;
  favoriteFood: string;
  age: number;
  differentSize: number;
  personId: number;
  peopleName: People[];
}

interface People {
  id: number;
  name: string;
  lastName: string;
  randomId: number;
  image: string;
}
