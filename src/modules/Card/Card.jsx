import {useDispatch} from 'react-redux';
import './card.scss';
import {addItemToCart} from '../../redux/cartSlice';

export function Card({className, id, img, title, dateDelivery, price}) {
  const dispatch = useDispatch();

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
          <button className="card__button"
            onClick={handlerAddToCart}
          >{price}&nbsp;₽</button>
        </div>
      </div>
    </article>

  </>);
}
