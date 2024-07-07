// import './cartitem.scss';
import style from './CartItem.module.scss';

export function CartItem({img, title, price}) {

    return (<>
        <li className={style.item}>
            <img className={style.img}
                src={img}
                alt="Букет из роз Grand Avalanche (101 шт)" />
            <h4 className={style.title}>{title}</h4>
            <div className={style.counter}><button
                className={style.btn}>-</button>
                <input
                    className={style.input} type="number" max="99" min="0"
                    value="1" />
                <button className={style.btn}>+</button></div>
            <p className={style.price}>{price}&nbsp;₽</p>
        </li>

    </>);
}
