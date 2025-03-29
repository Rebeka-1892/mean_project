import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosteEditComponent } from './poste-edit.component';

describe('PosteEditComponent', () => {
  let component: PosteEditComponent;
  let fixture: ComponentFixture<PosteEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PosteEditComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PosteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
