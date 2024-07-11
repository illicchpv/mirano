import {useDispatch} from 'react-redux';
import './card.scss';
import {addItemToCart} from '../../redux/cartSlice';
import {useState} from 'react';

export function Card({className, id, img, title, dateDelivery, price}) {
  const dispatch = useDispatch();
  const [buttonText, setButtonText] = useState(`${price}\u00A0₽`); // {// В корзину

  const handleMouseEnter = () => {
    setButtonText('В корзину');
  };
  const handleMouseLeave = () => {
    setButtonText(`${price}\u00A0₽`);
  };

  const handlerAddToCart = () => {
    dispatch(addItemToCart({productId: id, quantity: 1}));
  };

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
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </article>

  </>);
}
