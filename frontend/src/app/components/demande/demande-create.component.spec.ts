import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeCreateComponent } from './demande-create.component';

describe('DemandeCreateComponent', () => {
  let component: DemandeCreateComponent;
  let fixture: ComponentFixture<DemandeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemandeCreateComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DemandeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
