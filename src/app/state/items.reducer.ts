import { createReducer, on } from "@ngrx/store";
import { ItemDTO } from "../dtos/ItemDTO";
import { addItem, deleteItem, retrievedItems } from "./items.actions";

export const initialState: ReadonlyArray<ItemDTO> = [];

export const itemsReducer = createReducer(
    initialState,
    on(retrievedItems, (state, { items }) => items),
    on(addItem, (state, item) => {
        let newItem: ItemDTO = {
            id: incrementID(state), name: item.name,
            quality: item.quality, sellIn: item.sellIn
        };
        return [...state, newItem];
    }),
    on(deleteItem, (state, item) => state.filter(i => i.id !== item.id))
)

function incrementID(state: ReadonlyArray<ItemDTO>): number {
    let maxID: number = state.length > 0 ? state.reduce((p, c: ItemDTO) => {
        if (p > c?.id) return p;
        else return c.id;
    }, 0) : 0;
    return maxID + 1;
}