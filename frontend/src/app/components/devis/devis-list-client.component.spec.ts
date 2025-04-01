import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevisListClientComponent } from './devis-list-client.component';

describe('DevisListClientComponent', () => {
  let component: DevisListClientComponent;
  let fixture: ComponentFixture<DevisListClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevisListClientComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DevisListClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
