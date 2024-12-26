import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '@shared/service/book.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private readonly _router: Router = inject(Router);
  private readonly _svc: BookService = inject(BookService);
  public genres = this._svc.genres();

  public onGenreSelect(genre: any) {
    const selectedGenre = genre.target.value;

    if (selectedGenre) {
      this._router.navigate(['app/search'], {
        queryParams: {
          genre: selectedGenre.toLowerCase(),
        },
      });
    }
  }

  public onSearch(search: any) {
    const searchValue = search.target.value;

    if (searchValue) {
      this._router.navigate(['app/search'], {
        queryParams: {
          title: searchValue.toLowerCase(),
        },
      });
    }
  }
}
