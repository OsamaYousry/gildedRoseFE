import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ItemDTO } from 'src/app/dtos/ItemDTO';
import { addItem } from 'src/app/state/items.actions';

import { InputFormComponent } from './input-form.component';

describe('InputFormComponent', () => {
  let component: InputFormComponent;
  let fixture: ComponentFixture<InputFormComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputFormComponent],
      providers: [provideMockStore({ initialState: { items: { loading: false, entity: [] } } })],
      imports: [FormsModule,
        ReactiveFormsModule, MatAutocompleteModule, MatInputModule, BrowserAnimationsModule]
    })
      .compileComponents();
    store = TestBed.inject(MockStore)
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should validate quality not less than 0', () => {
    validateFormFieldError('quality', -1, 'min', 'Quality cannot be less than zero');
    validateButtonPress(fixture, false, store, { name: '', quality: 0, sellIn: 0, id: 0 })
  });

  it('should validate quality not more than 50', () => {
    validateFormFieldError('quality', 51, 'max', 'Quality cannot be more than 50');
    validateButtonPress(fixture, false, store, { name: '', quality: 0, sellIn: 0, id: 0 })
  });

  it('should validate quality not empty', () => {
    validateFormFieldError('quality', null, 'required', 'Quality is required');
    validateButtonPress(fixture, false, store, { name: '', quality: 0, sellIn: 0, id: 0 })
  });

  it('should disable and set value for quality in case of Sulfuras', async () => {
    let fixture = TestBed.createComponent(InputFormComponent);
    fixture.componentInstance.ngOnInit();
    updateFormControlValue('name', 'Sulfuras, Hand of Ragnaros', fixture);
    await fixture.whenStable()
    let inputElement = fixture.debugElement.query(By.css(`input#quality`)).nativeElement;
    expect(inputElement.disabled).toBeTruthy();
    expect(inputElement.value).toBe('80');
  })

  it('should reenable value for name and throw error for quality', async () => {
    let fixture = TestBed.createComponent(InputFormComponent);
    fixture.componentInstance.ngOnInit();
    updateFormControlValue('name', 'Sulfuras, Hand of Ragnaros', fixture);
    await fixture.whenStable();
    updateFormControlValue('name', 'Aged Brie', fixture);
    await fixture.whenStable();
    let inputElement = fixture.debugElement.query(By.css(`input#quality`)).nativeElement;
    inputElement.dispatchEvent(new Event('focus'));
    inputElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    await fixture.whenStable();
    let errorMessageElement = fixture.debugElement.query(By.css('mat-error')).nativeElement;
    expect(inputElement.disabled).toBeFalsy();
    expect(inputElement.value).toBe('80');
    expect(errorMessageElement.innerHTML).toContain('Quality cannot be more than 50');
  })

  it('should validate sell-in not empty', () => {
    validateFormFieldError('sellIn', null, 'required', 'Sell In is required');
    validateButtonPress(fixture, false, store, { name: '', quality: 0, sellIn: 0, id: 0 })
  })

  it('should validate name not empty', () => {
    fixture = validateFormFieldError('name', null, 'required', 'Name is required');
    validateButtonPress(fixture, false, store, { name: '', quality: 0, sellIn: 0, id: 0 })
  })

  it('should call addItem if valid', () => {
    let fixture = TestBed.createComponent(InputFormComponent);
    let validItem = { name: 'Test1', quality: 10, sellIn: 5 };
    updateFormControlValue('name', validItem.name, fixture);
    updateFormControlValue('quality', validItem.quality, fixture);
    updateFormControlValue('sellIn', validItem.sellIn, fixture);
    fixture.detectChanges();
    validateButtonPress(fixture, true, store, validItem);
  })


  it('should reset form after adding item', async () => {
    let fixture = TestBed.createComponent(InputFormComponent);
    let validItem = { name: 'Test1', quality: 10, sellIn: 5 };
    updateFormControlValue('name', validItem.name, fixture);
    updateFormControlValue('quality', validItem.quality, fixture);
    updateFormControlValue('sellIn', validItem.sellIn, fixture);
    fixture.detectChanges();
    validateButtonPress(fixture, true, store, validItem);
    fixture.detectChanges();
    await fixture.whenStable();
    let inputElement = fixture.debugElement.query(By.css(`input#name`)).nativeElement;
    expect(inputElement.value).toBe('');
    inputElement = fixture.debugElement.query(By.css(`input#quality`)).nativeElement;
    expect(inputElement.value).toBe('');
    inputElement = fixture.debugElement.query(By.css(`input#sellIn`)).nativeElement;
    expect(inputElement.value).toBe('');
    let errorMessageElement = fixture.debugElement.query(By.css('mat-error'));
    expect(errorMessageElement).toBeNull();
  })

});

function validateFormFieldError(formControlName: string, value: number | string | null, error: string, errorMessage: string):
  ComponentFixture<InputFormComponent> {
  let fixture = TestBed.createComponent(InputFormComponent);
  updateFormControlValue(formControlName, value, fixture);
  let errorMessageElement = fixture.debugElement.query(By.css('mat-error')).nativeElement;
  expect(errorMessageElement.innerHTML).toContain(errorMessage);
  return fixture;
}

function validateButtonPress(fixture: ComponentFixture<InputFormComponent>, valid: boolean,
  store: MockStore, item: any) {
  const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
  const dispatchSpy = spyOn(store, 'dispatch');
  buttonElement.click();
  let expectedAction = addItem(item);
  if (valid) {
    expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
  } else {
    expect(dispatchSpy).not.toHaveBeenCalledWith(expectedAction);
  }
}

function updateFormControlValue(formControl: string, value: number | string | null,
  fixture: ComponentFixture<InputFormComponent>) {
  fixture.detectChanges();
  let inputElement = fixture.debugElement.query(By.css(`input#${formControl}`)).nativeElement;
  inputElement.dispatchEvent(new Event('focus'));
  inputElement.value = value;
  inputElement.dispatchEvent(new Event('input'));
  inputElement.dispatchEvent(new Event('blur'));
  fixture.detectChanges();
}
