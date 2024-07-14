import {useDispatch, useSelector} from 'react-redux';
import style from './Order.module.scss';
import {closeOrder, sentOrder, updateOrderData} from '../../redux/orderSlice';
import classNames from 'classnames';
import {useCallback, useEffect} from 'react';

export function Order() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.order.isOpen);
  const orderId = useSelector((state) => state.order.orderId);
  const orderData = useSelector((state) => state.order.data);
  const itemsCart = useSelector((state) => state.cart.items);

  const handlerOrderClose = useCallback(() => {
    dispatch(closeOrder());
  }, [dispatch]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    dispatch(updateOrderData({[name]: value, }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sentOrder());
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        // dispatch(closeOrder());
        handlerOrderClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);

      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, handlerOrderClose]);

  if (!isOpen) return;

  return (<>

    <div className={style.order} onClick={handlerOrderClose}>
      <div className={style.wrapper} onClick={e => e.stopPropagation()}>
        {orderId ?
          (<>

            <h2 className={style.title}>Заказ оформлен!</h2>
            <p className={style.id}>Ваш номер заказа: {orderId}</p>

          </>) : (<>

            <h2 className={style.title}>Оформить заказ</h2>
            <form className={style.form} id="order"
              onSubmit={handleSubmit}
            >
              <fieldset className={style.fieldset}>
                <legend className={style.legend}>Данные заказчика</legend>
                <div className={style["input-group"]}>
                  <input className={style.input}
                    type="text"
                    name="buyerName"
                    value={orderData.buyerName}
                    onChange={handleChange}
                    placeholder="Имя" />
                  <input
                    className={style.input} type="text"
                    name="buyerPhone"
                    value={orderData.buyerPhone}
                    onChange={handleChange}
                    placeholder="Телефон" />
                </div>
              </fieldset>
              <fieldset className={style.fieldset}>
                <legend className={style.legend}>Данные получателя</legend>
                <div className={style["input-group"]}>
                  <input className={style.input}
                    type="text"
                    name="recipientName"
                    value={orderData.recipientName}
                    onChange={handleChange}
                    placeholder="Имя" />
                  <input
                    className={style.input} type="text"
                    name="recipientPhone"
                    value={orderData.recipientPhone}
                    onChange={handleChange}
                    placeholder="Телефон" />
                </div>
              </fieldset>
              <fieldset className={style.fieldset}>
                <legend className={style.legend}>Адрес</legend>
                <div className={style["input-group"]}>
                  <input className={style.input}
                    type="text"
                    name="street"
                    value={orderData.street}
                    onChange={handleChange}
                    placeholder="Улица" />

                  <input className={classNames(style.input, style.input_min)}
                    type="text"
                    name="house"
                    value={orderData.house}
                    onChange={handleChange}
                    placeholder="Дом" />

                  <input className={classNames(style.input, style.input_min)}
                    type="text"
                    name="apartment"
                    value={orderData.apartment}
                    onChange={handleChange}
                    placeholder="Квартира" />
                </div>
              </fieldset>

              <fieldset className={style.fieldset}>
                <div className={style.payment}><label className={style["label-radio"]}>
                  <input
                    className={style.radio} type="radio"
                    name="paymentOnline"
                    value={orderData.paymentOnline === 'true'}
                    onChange={handleChange}
                    defaultChecked />Оплата онлайн</label>
                </div>
                <div className={style.delivery}>
                  <label htmlFor="delivery">Доставка 01.07</label>
                  <input type="hidden"
                    name="deliveryDate"
                    value={orderData.deliveryDate}
                    onChange={handleChange}
                  />
                  <div className={style["select-wrapper"]}>
                    <select className={style.select}
                      name="deliveryTime"
                      value={orderData.deliveryTime}
                      onChange={handleChange}
                      id="delivery">
                      <option value="9-12">с 9:00 до 12:00</option>
                      <option value="12-15">с 12:00 до 15:00</option>
                      <option value="15-18">с 15:00 до 18:00</option>
                      <option value="18-21">с 18:00 до 21:00</option>
                    </select></div>
                </div>
              </fieldset>
            </form>
            <div className={style.footer}>
              <p className={style.total}>
                {itemsCart.reduce((acc, el) => acc + el.price * el.quantity, 0)}
                &nbsp;₽
              </p>
              <button className={style.button} type="submit" form="order">Заказать</button>
            </div>

          </>)}


      </div>
      <button className={style.close} type="button">×</button>
    </div>

  </>);


}
