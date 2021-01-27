import { Component, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { ItemDTO } from 'src/app/dtos/ItemDTO'
import { AppState } from 'src/app/state/app.state'
import { deleteItem } from 'src/app/state/items.actions'
import { selectItems } from 'src/app/state/items.selectors'

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
    displayedColumns: string[] = ['name', 'quality', 'sellIn', 'deleteItem']
    items = this.store.pipe(select(selectItems))
    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {}

    deleteItem(item: ItemDTO) {
        this.store.dispatch(deleteItem(item))
    }
}
