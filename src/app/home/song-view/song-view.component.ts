import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-song-view',
  templateUrl: './song-view.component.html',
  styleUrls: ['./song-view.component.css'],
})
export class SongViewComponent implements OnInit {
  @Input() albumInt: number = 0;
  constructor() {}

  ngOnInit(): void {}
}
