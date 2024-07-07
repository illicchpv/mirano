import './goods.scss';

import {Cart} from '../Cart/Cart';
import {Card} from '../Card/Card';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {fetchGoods} from '../../redux/goodsSlice';
import {API_URL} from '../../const';

export function Goods() {
  const dispatch = useDispatch();
  const {items: goods, status: goodsStatus, error} = useSelector((state) => state.goods);

  useEffect(() => {
    if (goodsStatus === 'idle') {
      dispatch(fetchGoods());
    }
  }, [goodsStatus, dispatch]);

  let content = null;
  if(goodsStatus === 'loading') {
    content = <p>Loading...</p>;

  } else if(goodsStatus === 'succeeded') {  
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

    </ul>)
    
  } else {
    content = <p>error: {error}</p>;
  }
  // goods {id: 38, name: 'Букет из тюльпан Dolche vita (51 шт)', categories: Array(2), price: 6700, photoUrl: '/img/38.jpg'}
  return (<>

    <section className="goods">
      <div className="container goods__container">
        <div className="goods__box">
          <h2 className="goods__title">Цветы</h2>

          {content}

        </div>

        <Cart />

      </div>
    </section>

  </>);
}
