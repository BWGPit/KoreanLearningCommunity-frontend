import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlashCardBox } from './flash-card-box';

describe('FlashCardBox', () => {
  let component: FlashCardBox;
  let fixture: ComponentFixture<FlashCardBox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlashCardBox],
    }).compileComponents();

    fixture = TestBed.createComponent(FlashCardBox);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
