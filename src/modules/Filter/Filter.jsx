import './filter.scss';
import {Choices} from '../Choices/Choices';
import {useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {fetchGoods} from '../../redux/goodsSlice';
import {debounce, gatValidFilters} from '../../const';
import {FilterRadio} from './FilterRadio';

const filterTypes = [
  {title: 'Цветы ', value: 'bouquets'},
  {title: 'Игрушки ', value: 'toys'},
  {title: 'Открытки ', value: 'postcards'},
];

export function Filter({setTitleGods}) {
  const dispatch = useDispatch();
  const [openChoice, setOpenChoice] = useState(null);

  const [filters, setFilters] = useState({
    type: 'bouquets', // bouquets     toys     postcards
    minPrice: '',
    maxPrice: '',
    category: '',
    //search
    //list
  });

  const prevFiltersRef = useRef({});

  const debFetchGoods = useRef(debounce((filters) => {
    dispatch(fetchGoods(filters));
  }, 1300)).current;

  useEffect(() => {
    const validFilters = gatValidFilters(filters);
    const prevFilters = prevFiltersRef.current;
    console.log('prevFilters.type: ', prevFilters.type, 'validFilters.type: ', validFilters.type);
    if (prevFilters.type !== validFilters.type) {
      dispatch(fetchGoods(validFilters));
      setTitleGods(filterTypes.find(item => item.value === validFilters.type).title);
    } else {
      console.log('--------debounce debFetchGoods: ');
      debFetchGoods(validFilters);
    }
    prevFiltersRef.current = validFilters;
  }, [filters, dispatch, debFetchGoods]);

  const handleChoicesToggle = (v) => {
    setOpenChoice(p => {
      if (v === p) return null;
      return v;
    });
  };

  const handleTypeChange = ({target}) => {
    const {value} = target;
    const newFilters = {
      ...filters, type: value,
      minPrice: '', maxPrice: '', category: '',
    };
    setFilters(newFilters);
    setOpenChoice(-1);
  };

  const handlePriceChange = ({target}) => {
    let {name, value} = target;
    if (isNaN(parseInt(value))) value = '';
    const newFilters = {...filters, [name]: value};
    setFilters(newFilters);
  };

  console.log('current filters.type: ', filters.type);

  return (<>

    <section className="filter">
      <h2 className="visually-hidden"></h2>
      <div className="container">
        <form className="filter__form">

          <fieldset className="filter__group">
            {filterTypes.map((item) => <FilterRadio key={item.value}
              handleTypeChange={handleTypeChange}
              data={item}
              type={filters.type}
            />)}

          </fieldset>


          <fieldset className="filter__group filter__group_choices">
            <Choices buttonLabel="Цена"
              isOpen={openChoice === 1}
              handleChoicesToggle={() => handleChoicesToggle(1)} >
              <fieldset className="filter__price">
                <input className="filter__input-price" type="text" name="minPrice"
                  value={filters.minPrice}
                  onChange={handlePriceChange}
                  placeholder="от" />
                <input className="filter__input-price" type="text" name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handlePriceChange}
                  placeholder="до" />
              </fieldset>
            </Choices>

            <Choices buttonLabel="Тип товара"
              isOpen={openChoice === 2}
              handleChoicesToggle={() => handleChoicesToggle(2)} >


              <ul className="filter__type-list">
                <li className="filter__type-item">
                  <button className="filter__type-button"
                    type="button">Монобукеты</button>
                </li>
                <li className="filter__type-item">
                  <button className="filter__type-button" type="button">Авторские
                    букеты</button>
                </li>
                <li className="filter__type-item">
                  <button className="filter__type-button" type="button">Цветы в
                    коробке</button>
                </li>
                <li className="filter__type-item">
                  <button className="filter__type-button" type="button">Цветы в
                    корзине</button>
                </li>
                <li className="filter__type-item">
                  <button className="filter__type-button" type="button">Букеты из
                    сухоцветов</button>
                </li>
              </ul>
            </Choices>
          </fieldset>
        </form>
      </div>
    </section>

  </>);
}
