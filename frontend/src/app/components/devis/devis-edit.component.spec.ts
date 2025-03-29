import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevisEditComponent } from './devis-edit.component';

describe('DevisEditComponent', () => {
  let component: DevisEditComponent;
  let fixture: ComponentFixture<DevisEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevisEditComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DevisEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
