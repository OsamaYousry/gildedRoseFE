import { createAction, props } from "@ngrx/store";
import { ItemDTO } from "../dtos/ItemDTO";

export const addItem = createAction('[Items List] Add Item', props<ItemDTO>())
export const deleteItem = createAction('[Items List] Delete Item', props<{ id: number }>())
export const updateItems = createAction('[Items List] Update Item')
export const retrievedItems = createAction('[Items List] Retrieve Items', props<{ items: ItemDTO[] }>())