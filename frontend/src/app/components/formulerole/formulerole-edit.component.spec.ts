import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormuleroleEditComponent } from './formulerole-edit.component';

describe('FormuleroleEditComponent', () => {
  let component: FormuleroleEditComponent;
  let fixture: ComponentFixture<FormuleroleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormuleroleEditComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormuleroleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
