import './cart.scss';

import {CartItem} from '../CartItem/CartItem';

import {useDispatch, useSelector} from 'react-redux';
import {toggleCart} from '../../redux/cartSlice';
import {openOrder} from '../../redux/orderSlice';
import {useEffect, useRef} from 'react';
import {Preload} from '../Preload/Preload';

export function Cart() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.cart.isOpen);
  const items = useSelector((state) => state.cart.items);
  const status = useSelector((state) => state.cart.status);
  const ddTitle = useSelector((state) => state.cart.deliveryDate.title);
  const cartRef = useRef(null);

  const handlerCartToggle = () => {
    dispatch(toggleCart());
  };
  const handlerOrderOpen = () => {
    dispatch(openOrder());
  };

  useEffect(() => {
    if (isOpen) {
      cartRef.current.scrollIntoView({block: 'start', behavior: 'smooth'});
    }

    return () => {
      console.log("Cart demounted");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (<>

    <section className="cart cart_open" ref={cartRef}>
      <div className="cart__container">
        <div className="cart__header">
          <h3 className="cart__title">Ваш заказ</h3>

          <button className="cart__close"
            onClick={handlerCartToggle}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <rect x="5" y="5.70715" width="1" height="25"
                transform="rotate(-45 5 5.70715)" fill="#D17D2F" />
              <rect x="22.6777" y="5" width="1" height="25"
                transform="rotate(45 22.6777 5)" fill="#D17D2F" />
            </svg>
          </button>
        </div>

        <p className="cart__date-delivery">{ddTitle}</p>

        {status === 'loading' && <div className='cart__preload'><Preload /></div> }
        {status !== 'loading' && (
          <ul className="cart__list">

            {items.map((el) => {

              return (

                <CartItem key={el.id} {...el} />

              );
            })}

          </ul>
        )}

        <div className="cart__footer">
          <button className="cart__order-btn" disabled={!items.length}
            onClick={handlerOrderOpen}
          >Оформить</button>
          <p className="cart__price cart__price_total">
            {items.reduce((acc, el) => acc + el.price * el.quantity, 0)}
            &nbsp;₽
          </p>
        </div>
      </div>
    </section>

  </>);
}
