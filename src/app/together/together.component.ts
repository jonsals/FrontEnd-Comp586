import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ArtistService } from './Share/ArtistService';
import { AlbumModel } from './album.model';
import { newAlbumModel } from './newAlbum.model';
import { newArtistModel } from './newArtist.model';
import { newSongModel } from './newSong.model';

@Component({
  selector: 'app-together',
  templateUrl: './together.component.html',
  styleUrls: ['./together.component.css'],
})
export class TogetherComponent implements OnInit {
  constructor(
    private artistApi: ArtistService,
    private formbuilder: FormBuilder
  ) {}
  defaultImg: string = 'https://i.stack.imgur.com/34AD2.jpg';
  updating: boolean = false;
  showDeleteOption: boolean = false;
  //---------------------
  displayId: number = 0;
  displayAlbumId: number = 0;
  ArtistFormGroup!: FormGroup;
  ArtistObj: newArtistModel = new newArtistModel();
  artistInfo: Artist[] = [];
  ArtistSelected: string = '';
  //---------------------
  //---------------------
  albumDetails: Album[] = [];
  displayAlbum: Album[] = [];
  AlbumFormGroup!: FormGroup;
  AlbumObj: newAlbumModel = new newAlbumModel();
  AlbumSelected: string = '';
  // ---------------------------------------
  songList: SongList[] = [];
  songDisplay: SongList[] = [];
  SongFormGroup!: FormGroup;
  SongObj: newSongModel = new newSongModel();

  //----------------------------------------
  songNotEmpty: boolean = true;
  notEmpty: boolean = true;
  sendToPost: AlbumModel = new AlbumModel();

  ngOnInit(): void {
    this.ArtistFormGroup = this.formbuilder.group({
      artistId: [''],
      name: [''],
      genre: [''],
      imageFile: [''],
    });

    this.AlbumFormGroup = this.formbuilder.group({
      albumName: [''],
      regularPrice: [''],
      totalNumberOfSongs: [''],
      artistId: [''],
      imageName: [''],
      imageFile: [''],
      imageUrl: [''],
    });

    this.SongFormGroup = this.formbuilder.group({
      songName: [''],
      minute: [''],
      seconds: [''],
      albumId: [''],
    });
    this.getAllArtist();
    this.getAlbums();
    this.getAllSong();
  }

  changeToFalse() {
    this.updating = false;
  }
  getAllArtist() {
    this.artistApi.getArtist().subscribe((res) => (this.artistInfo = res));
  }

  getArtistId(data: any, name: any) {
    this.displayId = data;
    this.ArtistSelected = name;
    this.displayAlbumId = 0;
    this.notEmpty = true;
    this.songDisplay = [];
    this.showDeleteOption = true;
    this.displaySameId(data);
  }
  addArtist() {
    const formData = new FormData();
    formData.append('name', this.ArtistFormGroup.value.name);
    formData.append('genre', this.ArtistFormGroup.value.genre);
    formData.append('imageName', this.ArtistFormGroup.value.name);
    formData.append('imageFile', this.ArtistFormGroup.value.imageFile);
    this.artistApi.postNewArtist(formData).subscribe((res) => {
      this.getAllArtist();

      this.ArtistObj.imageUrl = this.defaultImg;
      this.ArtistFormGroup.reset();
      document.getElementById('exitArtist')?.click();
    });
  }

  EditArtistButton(id: number) {
    this.updating = true;
    this.artistApi.getSingleArtist(id).subscribe((res) => {
      this.ArtistFormGroup.controls['name'].setValue(res.name);
      this.ArtistFormGroup.controls['genre'].setValue(res.genre);
      this.ArtistFormGroup.controls['imageFile'].setValue('');
    });
  }

  deleteThisArtist(id: number) {
    this.artistApi.deleteArtist(id).subscribe((res) => {
      for (var i = 0; i < this.displayAlbum.length; i++) {
        this.displaySameAlbumId(this.displayAlbum[i].id);
        this.DeleteAlbum(this.displayAlbum[i].id);
      }
      alert('Album is delete');
    });
  }
  inputFileArtist(event: any) {
    if (event.target.files && event.target.files[0]) {
      let imagefile = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (x) => {
        this.ArtistObj.imageFile = imagefile;
        this.ArtistFormGroup.value.imageFile = imagefile;
        this.ArtistObj.imageUrl = x.target?.result;
      };
      reader.readAsDataURL(imagefile);
    }
  }

  // ----------------------Albums---------------------------------------------------
  getAlbums() {
    this.artistApi.getAllDetails().subscribe((res) => {
      this.albumDetails = res;
      (error: any) => {
        console.log(error);
      };
    });
  }

  inputFileAlbum(event: any) {
    this.AlbumObj.imageUrl = this.AlbumFormGroup.value.imageUrl;
  }

  postAlbum() {
    this.AlbumObj.name = this.AlbumFormGroup.value.albumName;
    this.AlbumObj.regularPrice = this.AlbumFormGroup.value.regularPrice;
    this.AlbumObj.artistId = this.displayId;
    this.AlbumObj.totalNumberOfSongs =
      this.AlbumFormGroup.value.totalNumberOfSongs;
    this.AlbumObj.imageUrl = this.AlbumFormGroup.value.imageUrl;

    const album = JSON.stringify(this.AlbumObj);
    this.artistApi.postNewAlbum(album).subscribe((res) => {
      this.AlbumObj.imageUrl = this.defaultImg;
      this.AlbumFormGroup.reset();
      document.getElementById('exitAlbum')?.click();
      this.getAlbums();
      setTimeout(() => this.displaySameId(this.displayId), 1000);
    });
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
    this.notEmpty = false;
  }

  EditAlbumButton(id: number) {
    this.updating = true;
    this.artistApi.getSingleAlbum(id).subscribe((res) => {
      this.AlbumFormGroup.controls['albumName'].setValue(res[0].name);
      this.AlbumFormGroup.controls['regularPrice'].setValue(
        res[0].regularPrice
      );
      this.AlbumFormGroup.controls['totalNumberOfSongs'].setValue(
        res[0].totalNumberOfSongs
      );
    });
  }

  AlbumIdChange(data: any, name: any) {
    this.displayAlbumId = data;
    this.AlbumSelected = name;
    this.songNotEmpty = true;
    this.displaySameAlbumId(data);
  }

  DeleteAlbum(id: number) {
    this.artistApi.deleteAlbum(id).subscribe((res) => {
      alert('Album deleted');
      this.getAlbums();
      setTimeout(() => this.displaySameId(this.displayId), 1000);
      for (var i = 0; i < this.songDisplay.length; i++) {
        this.DeleteSong(this.songDisplay[i].songId);
      }
    });
  }

  updateAlbum() {
    console.log(this.displayAlbumId);
    this.AlbumObj.id = this.displayAlbumId;
    this.AlbumObj.name = this.AlbumFormGroup.value.albumName;
    this.AlbumObj.regularPrice = this.AlbumFormGroup.value.regularPrice;
    this.AlbumObj.artistId = this.displayId;
    this.AlbumObj.totalNumberOfSongs =
      this.AlbumFormGroup.value.totalNumberOfSongs;
    this.AlbumObj.imageUrl = this.AlbumFormGroup.value.imageUrl;

    const album = JSON.stringify(this.AlbumObj);
    console.log(album);
    this.artistApi.updateAlbum(this.displayAlbumId, album).subscribe((res) => {
      alert('Update Successful');
    });
  }
  // ----------------------------Songs---------------------------------------------

  getAllSong() {
    this.artistApi.getAllSongName().subscribe((res) => {
      this.songList = res;
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
    if (this.songDisplay.length == 0) {
      this.songListEmpty();
    }
  }

  postSong() {
    this.SongObj.songName = this.SongFormGroup.value.songName;
    this.SongObj.minute = this.SongFormGroup.value.minute;
    this.SongObj.seconds = this.SongFormGroup.value.seconds;
    this.SongObj.albumId = this.displayAlbumId;
    const song = JSON.stringify(this.SongObj);
    let id = 'albumRow' + this.displayAlbumId;

    this.artistApi.postNewSong(song).subscribe((res) => {
      this.getAllSong();
      setTimeout(
        () => this.AlbumIdChange(this.displayAlbumId, this.AlbumSelected),
        1000
      );
      this.SongFormGroup.reset();
      let exitModal = document.getElementById('exitSong');
      exitModal?.click();
    });
  }
  songListEmpty() {
    this.songNotEmpty = false;
  }

  EditSongButton(id: number) {
    this.updating = true;
    this.artistApi.getSingleSong(id).subscribe((res) => {
      this.SongFormGroup.controls['songName'].setValue(res.songName);
      this.SongFormGroup.controls['minute'].setValue(res.minute);
      this.SongFormGroup.controls['seconds'].setValue(res.seconds);
    });
  }

  DeleteSong(id: number) {
    this.artistApi.deleteSong(id).subscribe((res) => {
      alert('Song deleted');
      this.getAllSong();
      setTimeout(
        () => this.AlbumIdChange(this.displayAlbumId, this.AlbumSelected),
        100
      );
    });
  }
}

// -------------------------------------------------------------------------

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
