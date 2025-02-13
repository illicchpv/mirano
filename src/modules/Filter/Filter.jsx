import './filter.scss';
import {Choices} from '../Choices/Choices';
import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchGoods} from '../../redux/goodsSlice';
import {debounce} from '../../const';
import {FilterRadio} from './FilterRadio';
import {changeCategory, changePrice, changeType} from '../../redux/filtersSlice';
import classNames from 'classnames';
// console.log('changeCategory: ', changeCategory);

const filterTypes = [
  {title: 'Цветы ', value: 'bouquets'},
  {title: 'Игрушки ', value: 'toys'},
  {title: 'Открытки ', value: 'postcards'},
];

export function Filter({setTitleGods}) {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.filters);
  const categories = useSelector(state => state.goods.categories);
  const [openChoice, setOpenChoice] = useState(null);
  const prevFiltersRef = useRef(filters);
  const filterRef = useRef(null);

  const debFetchGoods = useRef(debounce((filters) => {
    dispatch(fetchGoods(filters));
  }, 500)).current;

  useEffect(() => {
    if (filters !== prevFiltersRef.current && !(openChoice > 0)) {
      filterRef.current?.scrollIntoView({block: 'start', behavior: 'smooth'});
    }
  }, [filters]);

  useEffect(() => {
    document.addEventListener("click", (e) => {
      const target = e.target.closest(".filter__group_choices");
      if (!target && (openChoice !== null || openChoice !== -1)) {
        setOpenChoice(-1);
      }
    });
  }, [openChoice]);


  useEffect(() => {
    const {minPrice: prevMinPrice, maxPrice: prevMaxPrice} = prevFiltersRef.current;
    // const prevFilters = prevFiltersRef.current;
    // console.log('prevFilters.type: ', prevFilters.type, 'filters.type: ', filters.type);
    if (!filters.type && !filters.search) {
      return;
    }

    if (prevMinPrice !== filters.minPrice || prevMaxPrice !== filters.maxPrice) {
      debFetchGoods(filters);
    } else {
      dispatch(fetchGoods(filters));
      const type = filterTypes.find(item => item.value === filters.type);
      if (type) {
        setTitleGods(type.title);
      }
      if (filters.search) {
        setTitleGods('Результаты поиска');
      }
    }

    prevFiltersRef.current = filters;
  }, [setTitleGods, filters, dispatch, debFetchGoods]);

  const handleChoicesToggle = (v) => {
    setOpenChoice(p => {
      if (v === p) return null;
      return v;
    });
  };

  const handleTypeChange = ({target}) => {
    const {value} = target;
    dispatch(changeType(value));
    setOpenChoice(-1);
  };

  const handlePriceChange = ({target}) => {
    let {name, value} = target;
    dispatch(changePrice({name, value}));
  };

  const handleCategoryChange = (cat) => {
    dispatch(changeCategory(cat));
    setOpenChoice(-1);
  };

  return (<>

    <section className="filter" ref={filterRef}>
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

            {categories.length ? (
              <Choices buttonLabel="Тип товара"
                isOpen={openChoice === 2}
                handleChoicesToggle={() => handleChoicesToggle(2)} >


                <ul className="filter__type-list">

                  <li className="filter__type-item">
                    <button className="filter__type-button" type="button"
                      onClick={() => handleCategoryChange('')}
                    >все товары</button>
                  </li>

                  {categories.map(el => (
                    // filter__type-button_active
                    <li key={el} className="filter__type-item">
                      <button type="button"
                        className={classNames(
                          "filter__type-button",
                          el === filters.category && 'filter__type-button_active'
                        )}
                        onClick={() => handleCategoryChange(el)}
                      >{el}</button>
                    </li>

                  ))}
                </ul>
              </Choices>
            ) : null}
          </fieldset>
        </form>
      </div>
    </section>

  </>);
}
