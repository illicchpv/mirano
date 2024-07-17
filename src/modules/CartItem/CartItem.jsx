import {useDispatch} from 'react-redux';
import {API_URL, debounce} from '../../const';
import style from './CartItem.module.scss';
import {useState} from 'react';
import {addItemToCart} from '../../redux/cartSlice';

export function CartItem({id, photoUrl, name, price, quantity}) {
  const dispatch = useDispatch();
  const [inputQuantity, setInputQuantity] = useState(quantity);
  if(inputQuantity !== quantity) setInputQuantity(quantity);

  const debouncedInputChange = debounce((v) => dispatch(addItemToCart({productId: id, quantity: v})), 500);

  const handleInputChange = (event) => {
    const v = +event.target.value;
    setInputQuantity(v);
    dispatch(addItemToCart({productId: id, quantity: v}));
    debouncedInputChange(v);
  };
  const handleDec = () => {
    const v = inputQuantity - 1;
    setInputQuantity(v);
    debouncedInputChange(v);
  };
  const handleInc = () => {
    const v = inputQuantity + 1;
    setInputQuantity(v);
    debouncedInputChange(v);
  };

  return (<>
    <li className={style.item}>
      <img className={style.img}
        src={`${API_URL}${photoUrl}`}
        alt={name} />
      <h4 className={style.title}>{name}</h4>
      <div className={style.counter}>
        <button className={style.btn}
          onClick={handleDec}
        >-</button>
        <input
          className={style.input} type="number" max="99" min="0"
          value={inputQuantity}
          onChange={handleInputChange}
        />
        <button className={style.btn}
          onClick={handleInc}
        >+</button></div>
      <p className={style.price}>{price * quantity}&nbsp;₽</p>
    </li>

  </>);
}
