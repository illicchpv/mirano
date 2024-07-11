import './goods.scss';

import {Cart} from '../Cart/Cart';
import {Card} from '../Card/Card';
import {useSelector} from 'react-redux';

import {API_URL, searchRezTitle} from '../../const';
import {useEffect, useRef} from 'react';

export function Goods({title, setSearchValue}) {
  const {items: goods, status: goodsStatus} = useSelector((state) => state.goods);
  const goodsRef = useRef(null);

  useEffect(() => {
    if(title === searchRezTitle) {
      goodsRef.current.scrollIntoView({block: "start", behavior: "smooth"});
      setSearchValue("");
    }
  }, [title]);


  let content = null;
  if (goodsStatus === 'loading') {
    content = <p>Loading...</p>;

  }

  if (goodsStatus === 'succeeded' && goods.length > 0) {
    content = (<ul className="goods__list">

      {goods.map((el) => {
        return (

          <li key={el.id} className="goods__item">
            <Card
              className='goods__card'
              id={el.id} img={`${API_URL}${el.photoUrl}`} title={el.name} dateDelivery={"сегодня в 14:00"} price={el.price}
            />
          </li>

        );
      })}

    </ul>);
  }

  if(goods.length === 0) {
    content = <h2 className="goods__404">По вашему запросу ничего не найдено.</h2>;
  }

  // goods {id: 38, name: 'Букет из тюльпан Dolche vita (51 шт)', categories: Array(2), price: 6700, photoUrl: '/img/38.jpg'}
  return (<>

    <section className="goods">
      <div className="container goods__container">
        <div className="goods__box">
          <h2 className="goods__title" ref={goodsRef} >
            {title}
          </h2>

          {content}

        </div>

        <Cart />

      </div>
    </section>

  </>);
}
