import { createReducer, on } from "@ngrx/store";
import { ItemDTO } from "../dtos/ItemDTO";
import { addItem, deleteItem, retrievedItems } from "./items.actions";

export const initialState: ReadonlyArray<ItemDTO> = [];

export const itemsReducer = createReducer(
    initialState,
    on(retrievedItems, (state, { items }) => items),
    on(addItem, (state, item) => [...state, item]),
    on(deleteItem, (state, item) => state.filter(i => i !== item))
)