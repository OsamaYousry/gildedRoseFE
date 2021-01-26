import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { deleteItem } from 'src/app/state/items.actions';

import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let store: MockStore;
  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [TableComponent],
      providers: [
        provideMockStore({ initialState: { items: { loading: false, entity: [] } } }),
      ],
      imports: [MatTableModule, MatIconModule]
    })
      .compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should list items returned from selector', () => {
    let newState = {
      items: {
        loading: false, entity: [{ name: 'Test1', id: 1, quality: 50, sellIn: 5 },
        { name: "Test2", id: 2, quality: 40, sellIn: 6 }]
      }
    };
    store.setState(newState);
    store.refreshState();
    fixture.detectChanges();
    const elementsList = fixture.debugElement.queryAll(By.css("tr"));
    expect(elementsList.length).toEqual(newState.items.entity.length + 1)
  })

  it('should call delete item on icon press', () => {
    let newState = {
      items: {
        loading: false, entity: [{ name: 'Test1', id: 1, quality: 50, sellIn: 5 },
        { name: "Test2", id: 2, quality: 40, sellIn: 6 }]
      }
    };
    store.setState(newState);
    store.refreshState();
    fixture.detectChanges();
    const buttonElements = fixture.debugElement.queryAll(By.css("mat-icon"));
    const dispatchSpy = spyOn(store, 'dispatch');
    const expectedAction = deleteItem(newState.items.entity[0]);
    buttonElements[0].nativeElement.click()
    expect(dispatchSpy).toHaveBeenCalledOnceWith(expectedAction);
  })
});
