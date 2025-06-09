import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LyricsService {
  private baseUrl = 'https://api.lyrics.ovh/v1';
  private localJsonUrl = 'assets/gospel-lyrics.json';

  constructor(private http: HttpClient) { }

  /**
   * Try API first, fallback to local gospel JSON
   */
  getLyrics(artist: string, title: string): Observable<{ lyrics: string }> {
    return this.http.get<{ lyrics: string }>(`${this.baseUrl}/${artist}/${title}`).pipe(
      catchError(() => {
        // If API fails, search the local JSON
        return this.getLocalLyrics().pipe(
          map((songs) => {
            const found = songs.find(
              (s: any) =>
                s.artist.toLowerCase().trim() === artist.toLowerCase().trim() &&
                s.title.toLowerCase().trim() === title.toLowerCase().trim()
            );
            if (found) {
              return { lyrics: found.lyrics };
            } else {
              throw new Error('Lyrics not found in external API or local file.');
            }
          })
        );
      })
    );
  }

  /**
   * Load all local gospel lyrics from JSON file
   */
  public getLocalLyrics(): Observable<any[]> {
    return this.http.get<any[]>(this.localJsonUrl);
  }
}
