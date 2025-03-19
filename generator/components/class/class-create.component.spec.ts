import { ComponentFixture, TestBed } from '@angular/core/testing';

import { [MajClass]CreateComponent } from './[MinClass]-create.component';

describe('[MajClass]CreateComponent', () => {
  let component: [MajClass]CreateComponent;
  let fixture: ComponentFixture<[MajClass]CreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [[MajClass]CreateComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent([MajClass]CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
