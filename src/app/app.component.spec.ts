import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';
import { updateItems } from './state/items.actions';
import { selectLoading } from './state/items.selectors';


describe('AppComponent', () => {
  let store: MockStore;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        provideMockStore({ initialState: { items: { loading: false } } }),
      ],
    }).compileComponents();
    store = TestBed.inject(MockStore);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have a title 'Gilded Rose Inventory'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const title = fixture.debugElement.query(By.css("mat-card-title")).nativeElement;
    expect(title.innerHTML).toContain('Gilded Rose Inventory');
  });

  it('should have a loading bar in case of loading state', () => {
    const fixture = TestBed.createComponent(AppComponent);
    store.setState({ items: { loading: true } });
    store.refreshState();
    fixture.detectChanges();
    const loadingBar = fixture.debugElement.query(By.css("mat-progress-bar")).nativeElement;
    expect(loadingBar).toBeDefined();
  });

  it('should remove loading bar in case of no loading state', () => {
    const fixture = TestBed.createComponent(AppComponent);
    store.setState({ items: { loading: false } });
    store.refreshState();
    fixture.detectChanges();
    const loadingBar = fixture.debugElement.query(By.css("mat-progress-bar"));
    expect(loadingBar).toBeNull();
  });

  it('should dispatch update action on button click', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const button = fixture.debugElement.query(By.css("button.end-button")).nativeElement;
    const dispatchSpy = spyOn(store, 'dispatch');
    const expectedAction = updateItems();
    button.click();
    expect(dispatchSpy).toHaveBeenCalledOnceWith(expectedAction);
  })
});
