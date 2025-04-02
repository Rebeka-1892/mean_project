import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaildevisListComponent } from './detaildevis-list.component';

describe('DetaildevisListComponent', () => {
  let component: DetaildevisListComponent;
  let fixture: ComponentFixture<DetaildevisListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetaildevisListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DetaildevisListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
