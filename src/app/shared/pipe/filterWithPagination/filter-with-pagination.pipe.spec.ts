import { FilterWithPaginationPipe } from './filter-with-pagination.pipe';

describe('FilterWithPaginationPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterWithPaginationPipe();
    expect(pipe).toBeTruthy();
  });
});
