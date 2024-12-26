import { inject, Injectable, signal } from '@angular/core';
import { Book } from './book';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  public books = signal<Book[] | null>(null);
  public genres = signal<Set<string>>(new Set());
  public recomendations = signal<Book[] | null>(null);
  private readonly _apiUrl: string = environment.apiUrl;
  private readonly _httpClient: HttpClient = inject(HttpClient);

  constructor() {
    this.getBooks();
  }

  public getBooks(): void {
    this._httpClient
      .get<Book[]>(this._apiUrl)
      .pipe(
        tap((data: Book[]) => {
          this.books.set(data);
          this._extractGenresFromBooks();
        })
      )
      .subscribe();
  }

  private _extractGenresFromBooks(): void {
    const books = this.books();

    if (books) {
      const unrGenres = new Set(books.map((book: Book) => book.genre));
      this.genres.set(unrGenres);
    }
  }
}
