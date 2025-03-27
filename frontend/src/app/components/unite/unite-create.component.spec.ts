import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniteCreateComponent } from './unite-create.component';

describe('UniteCreateComponent', () => {
  let component: UniteCreateComponent;
  let fixture: ComponentFixture<UniteCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniteCreateComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UniteCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
