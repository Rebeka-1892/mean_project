import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaildevisEditComponent } from './detaildevis-edit.component';

describe('DetaildevisEditComponent', () => {
  let component: DetaildevisEditComponent;
  let fixture: ComponentFixture<DetaildevisEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetaildevisEditComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DetaildevisEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
