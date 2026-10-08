import { TestBed } from '@angular/core/testing';
import { GetBox } from './get-box';

describe('GetBox', () => {
  let service: GetBox;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetBox);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
