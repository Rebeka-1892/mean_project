import { ComponentFixture, TestBed } from '@angular/core/testing';

import { [MajClass]ListComponent } from './[MinClass]-list.component';

describe('[MajClass]ListComponent', () => {
  let component: [MajClass]ListComponent;
  let fixture: ComponentFixture<[MajClass]ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [[MajClass]ListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent([MajClass]ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
