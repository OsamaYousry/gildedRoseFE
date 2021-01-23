import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ItemDTO } from './dtos/ItemDTO';
import { ItemsServiceService } from './services/items-service.service';
import { AppState } from './state/app.state';
import { retrievedItems, updateItems } from './state/items.actions';
import { selectItems } from './state/items.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gilded-rose-fe';
  $items = this.store.pipe(select(selectItems)).subscribe(v => this.itemsList = v);
  itemsList: ReadonlyArray<ItemDTO> = [];
  constructor(private itemsService: ItemsServiceService, private store: Store<AppState>) {

  }

  updateItems() {
    this.itemsService.updateItems(this.itemsList).subscribe(items => {
      this.store.dispatch(retrievedItems({ items: items }))
    })
  }
}
