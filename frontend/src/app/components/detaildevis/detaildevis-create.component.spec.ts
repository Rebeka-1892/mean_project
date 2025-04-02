import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaildevisCreateComponent } from './detaildevis-create.component';

describe('DetaildevisCreateComponent', () => {
  let component: DetaildevisCreateComponent;
  let fixture: ComponentFixture<DetaildevisCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetaildevisCreateComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DetaildevisCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
