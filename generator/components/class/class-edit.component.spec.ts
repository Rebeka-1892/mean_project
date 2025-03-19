import { ComponentFixture, TestBed } from '@angular/core/testing';

import { [MajClass]EditComponent } from './[MinClass]-edit.component';

describe('[MajClass]EditComponent', () => {
  let component: [MajClass]EditComponent;
  let fixture: ComponentFixture<[MajClass]EditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [[MajClass]EditComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent([MajClass]EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
