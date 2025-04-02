import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TacheEditComponent } from './tache-edit.component';

describe('TacheEditComponent', () => {
  let component: TacheEditComponent;
  let fixture: ComponentFixture<TacheEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TacheEditComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TacheEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
