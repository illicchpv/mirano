import {API_URL} from '../../const';
import style from './CartItem.module.scss';

export function CartItem({id, photoUrl, name, price, quantity}) {
  console.log('id: ', id);

    return (<>
        <li className={style.item}>
            <img className={style.img}
                src={`${API_URL}${photoUrl}`}
                alt={name} />
            <h4 className={style.title}>{name}</h4>
            <div className={style.counter}><button
                className={style.btn}>-</button>
                <input
                    className={style.input} type="number" max="99" min="0"
                    value={quantity} />
                <button className={style.btn}>+</button></div>
            <p className={style.price}>{price}&nbsp;₽</p>
        </li>

    </>);
}
