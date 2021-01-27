import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { ItemDTO } from '../dtos/ItemDTO'

@Injectable({
    providedIn: 'root',
})
export class ItemsServiceService {
    constructor(private http: HttpClient) {}

    updateItems(items: ReadonlyArray<ItemDTO>): Observable<ItemDTO[]> {
        return this.http.put<ItemDTO[]>('/api', items)
    }
}
