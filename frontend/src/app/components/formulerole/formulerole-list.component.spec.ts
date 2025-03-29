import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormuleroleListComponent } from './formulerole-list.component';

describe('FormuleroleListComponent', () => {
  let component: FormuleroleListComponent;
  let fixture: ComponentFixture<FormuleroleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormuleroleListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormuleroleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
