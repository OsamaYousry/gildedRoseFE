import { TestBed } from '@angular/core/testing'
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing'

import { ItemsServiceService } from './items-service.service'
import { HttpClient } from '@angular/common/http'
import { ItemDTO } from '../dtos/ItemDTO'

describe('ItemsServiceService', () => {
    let service: ItemsServiceService
    let httpClient: HttpClient
    let httpTestingController: HttpTestingController

    beforeEach(() => {
        TestBed.configureTestingModule({ imports: [HttpClientTestingModule] })
        service = TestBed.inject(ItemsServiceService)
        httpTestingController = TestBed.inject(HttpTestingController)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })

    it('should send put request to update items', () => {
        let items: ReadonlyArray<ItemDTO> = [
            { name: 'Test1', quality: 10, sellIn: 15, id: 1 },
        ]
        service.updateItems(items).subscribe((res) => {
            expect(res).toBeDefined()
        })
        const req = httpTestingController.expectOne('/api')
        expect(req.request.method).toEqual('PUT')
        req.flush(items)
        httpTestingController.verify()
    })
})
