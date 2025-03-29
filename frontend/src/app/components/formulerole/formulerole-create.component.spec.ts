import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormuleroleCreateComponent } from './formulerole-create.component';

describe('FormuleroleCreateComponent', () => {
  let component: FormuleroleCreateComponent;
  let fixture: ComponentFixture<FormuleroleCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormuleroleCreateComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormuleroleCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
