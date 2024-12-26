import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookService } from '@shared/service/book.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export default class HomeComponent {
  private readonly _svc: BookService = inject(BookService);
  public book = this._svc.books()?.sort(() => Math.random() - 0.5)[0];

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
