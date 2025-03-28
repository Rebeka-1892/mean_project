import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterielCreateComponent } from './materiel-create.component';

describe('MaterielCreateComponent', () => {
  let component: MaterielCreateComponent;
  let fixture: ComponentFixture<MaterielCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterielCreateComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MaterielCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
