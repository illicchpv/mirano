import './filter.scss';
import {Choices} from '../Choices/Choices';
import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchGoods, setGoodsTitle} from '../../redux/goodsSlice';
import {debounce, gatValidFilters} from '../../const';
import {setFilters} from '../../redux/filterSlice';

export function Filter() {
  const dispatch = useDispatch();
  const [openChoice, setOpenChoice] = useState(null);

  let filters = useSelector((state) => state.filter.filters);

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
      dispatch(setGoodsTitle(validFilters.type));
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
    dispatch(setFilters(newFilters));
    // setFilters(newFilters);
    setOpenChoice(null);
  };

  const handlePriceChange = ({target}) => {
    let {name, value} = target;
    if (isNaN(parseInt(value))) value = '';
    const newFilters = {...filters, [name]: value};
    dispatch(setFilters(newFilters));
  };

  console.log('current filters.type: ', filters.type);

  return (<>

    <section className="filter">
      <h2 className="visually-hidden"></h2>
      <div className="container">
        <form className="filter__form">
          <fieldset className="filter__group">
            <input className="filter__radio" type="radio" name="type"
              value="bouquets" id="flower"
              checked={filters.type === 'bouquets'}
              onChange={handleTypeChange}
            />
            <label className="filter__label filter__label_flower"
              htmlFor="flower">Цветы</label>

            <input className="filter__radio" type="radio" name="type"
              value="toys" id="toys"
              checked={filters.type === 'toys'}
              onChange={handleTypeChange}
            />
            <label className="filter__label filter__label_toys"
              htmlFor="toys">Игрушки</label>

            <input className="filter__radio" type="radio" name="type"
              value="postcards" id="postcard"
              checked={filters.type === 'postcards'}
              onChange={handleTypeChange}
            />
            <label className="filter__label filter__label_postcard"
              htmlFor="postcard">Открытки</label>
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
