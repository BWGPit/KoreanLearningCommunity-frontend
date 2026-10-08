import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Boxbox } from './boxbox';

describe('Boxbox', () => {
  let component: Boxbox;
  let fixture: ComponentFixture<Boxbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Boxbox],
    }).compileComponents();

    fixture = TestBed.createComponent(Boxbox);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
