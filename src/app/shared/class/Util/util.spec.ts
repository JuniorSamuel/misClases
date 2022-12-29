import { Util } from './util';

describe('Util', () => {
 
  it('Funcition AddDaysToDate', ()=> {
    let date = new Date(2020, 9, 9);
    let dateTest = new Date(2020, 9, 10);
    expect( Util.addDaysToDate(date,1)).toEqual(dateTest)
  })
});
