import { select } from '@ngrx/store'
import { AppState } from './app.state'
import { selectItems } from './items.selectors'

describe('Selectors', () => {
    const initialState: AppState = {
        items: {
            loading: false,
            entity: [{ id: 1, name: 'Test1', quality: 20, sellIn: 5 }],
        },
    }
    it('should select all items', () => {
        const result = selectItems(initialState)
        expect(result)
    })
})
