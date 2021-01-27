import { ItemDTO } from '../dtos/ItemDTO'

export interface AppState {
    items: { loading: boolean; entity: ReadonlyArray<ItemDTO> }
}
