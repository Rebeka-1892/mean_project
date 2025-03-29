import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulematerielEditComponent } from './formulemateriel-edit.component';

describe('FormulematerielEditComponent', () => {
  let component: FormulematerielEditComponent;
  let fixture: ComponentFixture<FormulematerielEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulematerielEditComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormulematerielEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
