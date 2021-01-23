import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';


@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent implements OnInit {
  inputForm: FormGroup = this.fb.group({
    name: [null, [Validators.required]],
    quality: [null, [Validators.required, Validators.max(50), Validators.min(0)]],
    sellIn: [null, [Validators.required]]
  });
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.inputForm.get("name")?.valueChanges.pipe(debounceTime(200), distinctUntilChanged()).subscribe(v => {
      if (v == 'Sulfuras, Hand of Ragnaros') {
        this.inputForm.get('quality')?.setValue(80);
        this.inputForm.get('quality')?.disable();
      } else {
        this.inputForm.get('quality')?.enable();
      }
    })
  }

}
