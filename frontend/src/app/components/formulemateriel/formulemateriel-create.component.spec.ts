import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulematerielCreateComponent } from './formulemateriel-create.component';

describe('FormulematerielCreateComponent', () => {
  let component: FormulematerielCreateComponent;
  let fixture: ComponentFixture<FormulematerielCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulematerielCreateComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormulematerielCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
