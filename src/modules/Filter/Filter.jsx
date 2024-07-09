import './filter.scss';
import {Choices} from '../Choices/Choices';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {fetchGoods} from '../../redux/goodsSlice';
import {gatValidFilters} from '../../const';

export function Filter() {
  const dispatch = useDispatch();
  const [openChoice, setOpenChoice] = useState(null);

  const [filters, setFilters] = useState({
    type: 'bouquets', // bouquets     toys     postcards
    minPrice: '',
    maxPrice: '',
    //search
    //list
    category: '',
  });

  const handleChoicesToggle = (v) => {
    setOpenChoice(p => {
      if (v === p) return null;
      return v;
    });
  };

  const handleTypeChange = ({target}) => {
    const {value} = target;
    const newFilters = {...filters, type: value};
    setFilters(newFilters);
  };

  useEffect(() => {
    const validFilters = gatValidFilters(filters);
    dispatch(fetchGoods(validFilters));
  }, [filters]);


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

            <input className="filter__radio" type="radio" name="type" value="toys"
              id="toys"
              checked={filters.type === 'toys'}
              onChange={handleTypeChange}
            />
            <label className="filter__label filter__label_toys"
              htmlFor="toys">Игрушки</label>

            <input className="filter__radio" type="radio" name="type"
              value="postcards" id="postcard"
              checked={filters.type === 'postcard'}
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
                  placeholder="от" />
                <input className="filter__input-price" type="text" name="maxPrice"
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
