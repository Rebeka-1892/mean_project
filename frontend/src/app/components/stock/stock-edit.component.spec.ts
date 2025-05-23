import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockEditComponent } from './stock-edit.component';

describe('StockEditComponent', () => {
  let component: StockEditComponent;
  let fixture: ComponentFixture<StockEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockEditComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(StockEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
