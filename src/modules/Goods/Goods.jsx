import {Cart} from '../Cart/Cart';
import {Card} from '../Card/Card';
import {goodsArray} from '../../goodsArray';

export function Goods() {

    return (<>

        <section className="goods">
            <div className="container goods__container">
                <div className="goods__box">
                    <h2 className="goods__title">Цветы</h2>

                    <ul className="goods__list">

                        {goodsArray.map((el) => {
                            return (<>

                                <li key={el.id} className="goods__item">
                                    <Card {...el} className='goods__card' />
                                </li>

                            </>);
                        })}

                    </ul>
                </div>

                <Cart />

            </div>
        </section>

    </>);
}
