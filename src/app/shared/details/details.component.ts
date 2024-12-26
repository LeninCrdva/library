import { Component, inject, OnInit, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Book } from '@shared/service/book';
import { BookService } from '@shared/service/book.service';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export default class DetailsComponent implements OnInit {
  private readonly _routeAct: ActivatedRoute = inject(ActivatedRoute);
  private readonly _bookSvc: BookService = inject(BookService);
  private readonly _sanitSvc: DomSanitizer = inject(DomSanitizer);
  private readonly _books = this._bookSvc.books();
  book = signal<Book | null>(null);
  safeUrl = signal<SafeResourceUrl | null>(null);

  ngOnInit(): void {
    this._routeAct.params.subscribe((params) => {
      if (this._books) {
        const id: number = params['id'];
        let book = this._books.find((book: Book) => book.id === Number(id));
        if (book) {
          const sanitUrl = this._sanitSvc.bypassSecurityTrustResourceUrl(book.access_url);
          this.safeUrl.set(sanitUrl);
          this.book.set(book);
        }
      }
    });
  }

  transformText(text: string): string {
    if (!text) {
      return '';
    }

    const paragraphs = text
      .split('\n')
      .map((paragraph) => `<p>${paragraph}</p>`);
    return paragraphs.join('');
  }

  getTransformedText(text: string): string {
    return this.transformText(text);
  }
}
