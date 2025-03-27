import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniteEditComponent } from './unite-edit.component';

describe('UniteEditComponent', () => {
  let component: UniteEditComponent;
  let fixture: ComponentFixture<UniteEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniteEditComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UniteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
