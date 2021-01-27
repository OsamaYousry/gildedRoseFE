import { Component, OnInit, ViewChild } from '@angular/core'
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    FormGroupDirective,
    Validators,
} from '@angular/forms'
import { Store } from '@ngrx/store'
import { debounceTime, distinctUntilChanged } from 'rxjs/operators'
import { ItemDTO } from 'src/app/dtos/ItemDTO'
import { addItem } from 'src/app/state/items.actions'

@Component({
    selector: 'app-input-form',
    templateUrl: './input-form.component.html',
    styleUrls: ['./input-form.component.scss'],
})
export class InputFormComponent implements OnInit {
    inputForm: FormGroup = this.fb.group({
        name: [null, [Validators.required]],
        quality: [
            null,
            [Validators.required, Validators.max(50), Validators.min(0)],
        ],
        sellIn: [null, [Validators.required]],
    })
    @ViewChild(FormGroupDirective) formDirective?: FormGroupDirective
    isLoading: boolean = false
    defaultNames: string[] = [
        'Aged Brie',
        'Backstage passes to a TAFKAL80ETC concert',
        'Conjured',
        'Sulfuras, Hand of Ragnaros',
    ]
    constructor(private fb: FormBuilder, private store: Store) {}

    ngOnInit(): void {
        this.inputForm
            .get('name')
            ?.valueChanges.pipe(debounceTime(200), distinctUntilChanged())
            .subscribe((v) => {
                if (v === 'Sulfuras, Hand of Ragnaros') {
                    this.inputForm.get('quality')?.setValue(80)
                    this.inputForm.get('quality')?.disable()
                } else {
                    this.inputForm.get('quality')?.enable()
                    if (this.inputForm.get('quality')?.value) {
                        this.inputForm.get('quality')?.markAsTouched()
                        this.inputForm
                            .get('quality')
                            ?.updateValueAndValidity({ onlySelf: true })
                    }
                }
            })
    }

    getErrorMessage(): string {
        let formControl: AbstractControl | null = this.inputForm.get('quality')
        if (formControl?.hasError('required')) return 'Quality is required'
        else if (formControl?.hasError('min'))
            return 'Quality cannot be less than zero'
        else if (formControl?.hasError('max'))
            return 'Quality cannot be more than 50'
        else return ''
    }

    addItem(): void {
        if (this.inputForm.valid) {
            let item: ItemDTO = this.inputForm.getRawValue()
            this.isLoading = true
            this.store.dispatch(addItem(item))
            this.isLoading = false
            this.resetForm()
        }
    }

    resetForm() {
        this.formDirective?.resetForm()
    }
}
