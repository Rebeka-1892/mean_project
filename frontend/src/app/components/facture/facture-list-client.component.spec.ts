import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureListClientComponent } from './facture-list-client.component';

describe('FactureListClientComponent', () => {
  let component: FactureListClientComponent;
  let fixture: ComponentFixture<FactureListClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FactureListClientComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FactureListClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
