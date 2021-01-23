import { ItemDTO } from "../dtos/ItemDTO";

export interface AppState {
    items: ReadonlyArray<ItemDTO>;
}