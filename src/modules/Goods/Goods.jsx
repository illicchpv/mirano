import './goods.scss';

import {Cart} from '../Cart/Cart';
import {Card} from '../Card/Card';
import {useSelector} from 'react-redux';

import {API_URL} from '../../const';

export function Goods() {
  const {items: goods, status: goodsStatus, goodsTitle} = useSelector((state) => state.goods);
  console.log('goodsTitle: ', goodsTitle);


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
    
  } 

  // goods {id: 38, name: 'Букет из тюльпан Dolche vita (51 шт)', categories: Array(2), price: 6700, photoUrl: '/img/38.jpg'}
  return (<>

    <section className="goods">
      <div className="container goods__container">
        <div className="goods__box">
          <h2 className="goods__title">{goodsTitle}</h2>

          {content}

        </div>

        <Cart />

      </div>
    </section>

  </>);
}
