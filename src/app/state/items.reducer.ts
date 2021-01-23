import { state } from "@angular/animations";
import { createReducer, on } from "@ngrx/store";
import { ItemDTO } from "../dtos/ItemDTO";
import { addItem, deleteItem, retrievedItems, updateItems } from "./items.actions";

export const initialState: { entity: ReadonlyArray<ItemDTO>, loading: boolean } = { entity: [], loading: false };

export const itemsReducer = createReducer(
    initialState,
    on(retrievedItems, (state, { items }) => { return { loading: false, entity: items }; }),
    on(addItem, (state, item) => {
        let newItem: ItemDTO = {
            id: incrementID(state.entity), name: item.name,
            quality: item.quality, sellIn: item.sellIn
        };
        return { ...state, entity: [...state.entity, newItem] };
    }),
    on(deleteItem, (state, item) => { return { ...state, entity: state.entity.filter(i => i.id !== item.id) } }),
    on(updateItems, (state, { items }) => { return { ...state, loading: true } })
)

function incrementID(state: ReadonlyArray<ItemDTO>): number {
    let maxID: number = state.length > 0 ? state.reduce((p, c: ItemDTO) => {
        if (p > c?.id) return p;
        else return c.id;
    }, 0) : 0;
    return maxID + 1;
}