import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import * as fromApp from '../store/index';
import { Store } from '@ngrx/store';
import { fetchTotal } from 'src/store/actions/statistics.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'corona-app';

  public loading$: Observable<boolean>;

  constructor(
    private readonly store: Store<fromApp.AppState>
  ) {

    this.loading$ = this.store.select(fromApp.getLoadingState);
    this.store.dispatch(fetchTotal());

  }
}
