import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ItemsServiceService } from "../services/items-service.service";
import { EMPTY, of } from 'rxjs';
import { map, exhaustMap, withLatestFrom, switchMap } from 'rxjs/operators';
import { retrievedItems, updateItems } from "./items.actions";
import { selectItems } from "./items.selectors";
import { AppState } from "./app.state";
import { ActionType, Store } from "@ngrx/store";
import { ItemDTO } from "../dtos/ItemDTO";


@Injectable()
export class Itemseffects {

    updateItems$ = createEffect(() => this.actions$.pipe(
        ofType(updateItems),
        withLatestFrom(this.store.select(selectItems)),
        switchMap(([actionType, items]: [any, ReadonlyArray<ItemDTO>]) =>
            this.itemsService.updateItems(items).pipe(
                map(newItems => retrievedItems({ items: newItems }))
            )
        )
    )
    );

    constructor(
        private actions$: Actions,
        private itemsService: ItemsServiceService,
        private store: Store<AppState>
    ) { }
}
