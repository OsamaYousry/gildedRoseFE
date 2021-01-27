import { AppState } from './app.state'
import { addItem, deleteItem, retrievedItems } from './items.actions'
import * as fromReducer from './items.reducer'

describe('ItemsReducer', () => {
    it('Should return the new list', () => {
        const initialState = fromReducer.initialState
        let newList = [{ id: 1, name: 'Test1', quality: 40, sellIn: 4 }]
        const newState = fromReducer.itemsReducer(
            initialState,
            retrievedItems({ items: newList })
        )
        expect(newState.entity.length).toBe(newList.length)
        expect(newState.entity[0].name).toBe(newList[0].name)
    })

    it('Should add new item with new generated ID to empty list', () => {
        const initialState = { loading: false, entity: [] }
        let newItem = { name: 'Test1', quality: 40, sellIn: 4, id: 0 }
        const newState = fromReducer.itemsReducer(
            initialState,
            addItem(newItem)
        )
        expect(newState.entity.length).toBe(1)
        expect(newState.entity[0].id).toBe(1)
    })

    it('Should add new item with new incremented ID', () => {
        const initialState = {
            loading: false,
            entity: [{ id: 0, name: 'Test2', quality: 40, sellIn: 5 }],
        }
        let newItem = { name: 'Test1', quality: 40, sellIn: 4, id: 0 }
        const newState = fromReducer.itemsReducer(
            initialState,
            addItem(newItem)
        )
        expect(newState.entity.length).toBe(2)
        expect(newState.entity.find((i) => i.name === newItem.name)?.id).toBe(1)
    })

    it('Should delete item', () => {
        const initialState = {
            loading: false,
            entity: [{ id: 0, name: 'Test2', quality: 40, sellIn: 5 }],
        }
        let newItem = initialState.entity[0]
        const newState = fromReducer.itemsReducer(
            initialState,
            deleteItem(newItem)
        )
        expect(newState.entity.length).toBe(0)
        expect(
            newState.entity.find((i) => i.name === newItem.name)
        ).toBeUndefined()
    })
})
