import {useDispatch} from 'react-redux';
import './card.scss';
import {addItemToCart} from '../../redux/cartSlice';
import {useState} from 'react';

export function Card({className, id, img, title, dateDelivery, price}) {
  const dispatch = useDispatch();
  const [btnHover, setBtnHover] = useState(false);

  const handlerAddToCart = () => {
    dispatch(addItemToCart({id, img, title, dateDelivery, price}))
  }
  // можно просто:  className="goods__card card"
  return (<>

    <article className={`${[className, 'card'].filter(el => el).join(' ')}`}>
      <img className="card__image"
        src={img}
        alt={title} />
      <div className="card__content">
        <h3 className="card__title">{title}
        </h3>
        <div className="card__footer">
          <p className="card__date-delivery">{dateDelivery}</p>
          <button className="card__button" title='Добавить в корзину'
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
            onClick={handlerAddToCart}
          >
            {btnHover && (<>В корзину</>) }
            {!btnHover && (<>{price}&nbsp;₽</>)}
          </button>
        </div>
      </div>
    </article>

  </>);
}
