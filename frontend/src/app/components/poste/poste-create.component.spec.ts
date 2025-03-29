import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosteCreateComponent } from './poste-create.component';

describe('PosteCreateComponent', () => {
  let component: PosteCreateComponent;
  let fixture: ComponentFixture<PosteCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PosteCreateComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PosteCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
