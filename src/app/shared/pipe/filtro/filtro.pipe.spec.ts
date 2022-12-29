import { FiltroPipe } from './filtro.pipe';

let filtro:FiltroPipe;
let list: {name: string, lastName: string}[] = [
  {name: 'john', lastName:"santo"},
  {name: 'manuel', lastName:"perez"},
  {name: 'samuel', lastName:"casandra"},
  {name: 'junior', lastName:"velazquez"},
  {name: 'gabriel', lastName:"valdes"},
]

beforeAll( () => {
  filtro = new FiltroPipe()
});

describe('FiltroPipe', () => {
  it('create an instance', () => {
    expect(filtro).toBeTruthy();
  });

  it('filter list with a property', () => {
    let result = filtro.transform(list,['name'],'el')
    expect(result.length).toEqual(3)
  });

  it('filter list with two property', () => {
    let result = filtro.transform(list,['name', 'lastName'],'sa')   
    expect(result.length).toEqual(2)
  });

  it('filter without property', () => {
    let result = filtro.transform(list)
    expect(result).toEqual(list)
  })
});
