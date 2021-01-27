import { AppState } from './app.state'
import { selectItems, selectLoading } from './items.selectors'

describe('Selectors', () => {
    const initialState: AppState = {
        items: {
            loading: false,
            entity: [{ id: 1, name: 'Test1', quality: 20, sellIn: 5 }],
        },
    }
    it('should select all items', () => {
        const result = selectItems(initialState)
        expect(result.length).toBe(initialState.items.entity.length);
    })

    it('should select loading state', () => {
        const result = selectLoading(initialState)
        expect(result).toBe(initialState.items.loading);
    })
})
