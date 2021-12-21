import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  readonly baseUrl = 'https://localhost:44358/api';
  readonly peopleUrl = this.baseUrl + '/People';
  readonly AlbumUrl = this.baseUrl + '/AlbumInfo';
  readonly SongUrl = this.baseUrl + '/SongInfo';
  readonly ArtistUrl = this.baseUrl + '/ArtistInfo';

  public listName: People[] = [];
  public list: any;

  constructor(private http: HttpClient) {}

  postNewName(data: any) {
    return this.http.post<any>(
      'https://localhost:44358/api/People/Create',
      data,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    );
  }

  getAllName() {
    return this.http.get<any>('https://localhost:44358/api/People').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  DeleteName(id: number) {
    console.log(this.baseUrl + 'People/' + id);
    return this.http.delete(this.baseUrl + '/' + id);
  }

  // -----------Album-------------------------------------------------------------------------------------------

  postNewDetails(data: any) {
    return this.http.post<any>(this.baseUrl + '/Create', data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  postNewAlbum(data: any) {
    console.log('--->' + data);
    return this.http.post<any>(this.AlbumUrl, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  getAllDetails() {
    return this.http.get<any>(this.AlbumUrl).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getSingleAlbum(id: number) {
    return this.http.get<any>(this.AlbumUrl + '/' + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  deleteAlbum(id: number) {
    return this.http.delete(this.AlbumUrl + '/' + id);
  }

  updateAlbum(id: number, data: any) {
    return this.http.post<any>(this.AlbumUrl + '/Update?id=' + id, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }
  // --------------Song------------------------------------------------------------------------------

  getAllSongName() {
    return this.http.get<any>(this.SongUrl).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  postNewSong(data: any) {
    return this.http.post<any>(this.SongUrl, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  getSingleSong(id: any) {
    return this.http.get<any>(this.SongUrl + '/' + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  deleteSong(id: number) {
    return this.http.delete(this.SongUrl + '/' + id);
  }
  // -----------Artist----------------------------------------------------------------------------------
  getArtist() {
    return this.http.get<any>('https://localhost:44358/api/ArtistInfo').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  getSingleArtist(id: any) {
    return this.http
      .get<any>('https://localhost:44358/api/ArtistInfo' + '/' + id)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  postNewArtist(data: any) {
    return this.http.post<any>('https://localhost:44358/api/ArtistInfo', data);
  }

  deleteArtist(id: number) {
    return this.http.delete(this.ArtistUrl + '/' + id);
  }
}

interface People {
  id: number;
  name: string;
  lastName: string;
  randomId: number;
  image: string;
}
