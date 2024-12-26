import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Book } from '@shared/service/book';
import { BookService } from '@shared/service/book.service';

@Component({
  selector: 'app-search-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './search-list.component.html',
  styleUrl: './search-list.component.css'
})
export default class SearchListComponent implements OnInit{
  private readonly _svc: BookService = inject(BookService);
  private readonly _routerAct: ActivatedRoute = inject(ActivatedRoute);
  private readonly _router: Router = inject(Router);
  private readonly books = this._svc.books();
  public findedBooks: Book[] = [];
  public queryParams = this._routerAct.queryParams;

  public onBookSelect(book: any) {
    const selectedBook = book.target.value;

    if (selectedBook) {
      this._router.navigate(['app/book'], {
        queryParams: {
          book: selectedBook.toLowerCase(),
        },
      });
    }
  }

  ngOnInit(): void {
    this.extractBooks();
  }

  private extractBooks(): void {
    this.queryParams.subscribe((params) => {
      if (params['genre'] && !params['title']) {
        this.findedBooks = (this.books || []).filter((book) => {
          return book.genre.toLowerCase() === params['genre'];
        });
      }

      if (!params['genre'] && params['title']) {
        this.findedBooks = (this.books || []).filter((book) => {
          return book.title.toLowerCase().includes(params['title']);
        });
      }

      if (params['genre'] && params['title']) {
        this.findedBooks = (this.books || []).filter((book) => {
          return book.genre.toLowerCase() === params['genre'] && book.title.toLowerCase().includes(params['title']);
        });
      }
    });
  }
}
