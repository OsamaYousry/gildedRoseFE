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
    let form: FormGroup = fixture.componentInstance.inputForm;
    let validItem = { name: 'Test1', quality: 10, sellIn: 5 };
    form.patchValue(validItem);
    form.updateValueAndValidity();
    fixture.detectChanges();
    validateButtonPress(fixture, true, store, validItem);
  })


  it('should reset form after adding item', () => {
    let fixture = TestBed.createComponent(InputFormComponent);
    let form: FormGroup = fixture.componentInstance.inputForm;
    let validItem = { name: 'Test1', quality: 10, sellIn: 5 };
    form.patchValue(validItem);
    form.updateValueAndValidity();
    fixture.detectChanges();
    validateButtonPress(fixture, true, store, validItem);
    fixture.detectChanges();
    expect(form.value.name).toBeNull();
    expect(form.value.quality).toBeNull();
    expect(form.value.sellIn).toBeNull();
  })

});

function validateFormFieldError(formControlName: string, value: number | null, error: string, errorMessage: string):
  ComponentFixture<InputFormComponent> {
  let fixture = TestBed.createComponent(InputFormComponent);
  let form: FormGroup = fixture.componentInstance.inputForm;
  let formControl: AbstractControl = form.controls[formControlName];
  updateFormControlValue(formControl, value);
  fixture.detectChanges();
  let errorMessageElement = fixture.debugElement.query(By.css('mat-error')).nativeElement;
  expect(formControl).toBeTruthy();
  expect(formControl.hasError(error));
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

function updateFormControlValue(formControl: AbstractControl, value: any) {
  formControl.setValue(value);
  formControl.markAsTouched();
  formControl.updateValueAndValidity();
}
