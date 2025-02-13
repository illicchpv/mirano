import './goods.scss';

import {Cart} from '../Cart/Cart';
import {Card} from '../Card/Card';
import {useSelector} from 'react-redux';

import {API_URL} from '../../const';
import {Preload} from '../Preload/Preload';

export function Goods({title}) {
  const {items: goods, status: goodsStatus, error} = useSelector((state) => state.goods);
  const ddTitle = useSelector((state) => state.cart.deliveryDate.title);

  let content = null;
  if (goodsStatus === 'loading') {
    content = <Preload/>;
  }

  if (goodsStatus === 'succeeded' && goods.length > 0) {
    content = (<ul className="goods__list">

      {goods.map((el) => {

        return (

          <li key={el.id} className="goods__item">
            <Card
              className='goods__card'
              id={el.id} img={`${API_URL}${el.photoUrl}`} title={el.name} dateDelivery={ddTitle} price={el.price}
            />
          </li>

        );
      })}

    </ul>);
  }

  if(goodsStatus === 'succeeded' && goods.length === 0) {
    content = <p>По вашему запросу ничего не найдено</p>;
  }

  if(goodsStatus === 'failed') {
    content = <p>{error}</p>;
  }

  // goods {id: 38, name: 'Букет из тюльпан Dolche vita (51 шт)', categories: Array(2), price: 6700, photoUrl: '/img/38.jpg'}
  return (<>

    <section className="goods" 
      style={{position: goodsStatus === 'loading' ? 'relative' : ''}}
    >
      <div className="container goods__container">
        <div className="goods__box">
          <h2 className="goods__title">
            {title}
          </h2>

          {content}

        </div>

        <Cart />

      </div>
    </section>

  </>);
}
