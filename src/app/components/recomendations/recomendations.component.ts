import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BookService } from '@shared/service/book.service';

@Component({
  selector: 'app-recomendations',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './recomendations.component.html',
  styleUrl: './recomendations.component.css'
})
export class RecomendationsComponent {
  private readonly _router: Router = inject(Router);
  private readonly _svc: BookService = inject(BookService);
  public books = this._svc.books()?.sort(() => Math.random() - 0.5).slice(0, 6);


}
