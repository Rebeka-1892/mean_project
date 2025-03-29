import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeEditComponent } from './demande-edit.component';

describe('DemandeEditComponent', () => {
  let component: DemandeEditComponent;
  let fixture: ComponentFixture<DemandeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemandeEditComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DemandeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
