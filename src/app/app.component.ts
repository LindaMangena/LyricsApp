import { Component, OnInit } from '@angular/core';
import { LyricsService } from './lyrics.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  artist = '';
  title = '';
  lyrics = '';
  error = '';
  today = new Date();

  africanLyrics: any[] = [];
  selected: any = null;

  constructor(private lyricsService: LyricsService) {}

  ngOnInit(): void {
    this.lyricsService.getLocalLyrics().subscribe((data) => {
      this.africanLyrics = data;
    });
  }

  fetchLyrics(): void {
    this.lyrics = '';
    this.error = '';

    this.lyricsService.getLyrics(this.artist, this.title).subscribe({
      next: (res) => {
        this.lyrics = res.lyrics;
      },
      error: (err) => {
        this.lyrics = '';
        this.error = err.message || 'Lyrics not found.';
      }
    });
  }

  selectSong(song: any): void {
    this.selected = { ...song };
    this.artist = song.artist;
    this.title = song.title;
    this.lyrics = song.lyrics;
    this.error = '';
  }

  updateLyrics(): void {
    const index = this.africanLyrics.findIndex((s) => s.id === this.selected.id);
    if (index !== -1) {
      this.africanLyrics[index].lyrics = this.selected.lyrics;
      this.lyrics = this.selected.lyrics;
      this.error = '';
    }
  }
}
