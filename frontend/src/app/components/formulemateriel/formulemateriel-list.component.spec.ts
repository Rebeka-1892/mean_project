import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulematerielListComponent } from './formulemateriel-list.component';

describe('FormulematerielListComponent', () => {
  let component: FormulematerielListComponent;
  let fixture: ComponentFixture<FormulematerielListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulematerielListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormulematerielListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
