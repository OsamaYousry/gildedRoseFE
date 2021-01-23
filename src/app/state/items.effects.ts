import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ItemsServiceService } from "../services/items-service.service";
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, exhaustMap, withLatestFrom, tap } from 'rxjs/operators';
import { Store } from "@ngrx/store";
import { AppState } from "./app.state";
import { selectItems } from "./items.selectors";
import { retrievedItems, updateItems } from "./items.actions";


@Injectable()
export class Itemseffects {

    updateItems$ = createEffect(() => this.actions$.pipe(
        ofType(updateItems),
        exhaustMap(action =>
            this.itemsService.updateItems(action.items).pipe(
                map(newItems => retrievedItems({ items: newItems }))
            )
        )
    )
    );

    constructor(
        private actions$: Actions,
        private itemsService: ItemsServiceService
    ) { }
}
