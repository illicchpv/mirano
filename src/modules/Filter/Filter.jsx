import './filter.scss';
import {Choices} from '../Choices/Choices';
import {useState} from 'react';

export function Filter() {
    const [isOpen, setIsOpen] = useState('');
    console.log('isOpen: ', isOpen);

    const handlerChangeChoice = (name) => setIsOpen(p => {
        if(p === name) return '';
        return name;
    });

    return (<>

        <section className="filter">
            <h2 className="visually-hidden"></h2>
            <div className="container">
                <form className="filter__form">
                    <fieldset className="filter__group">
                        <input className="filter__radio" type="radio" name="type"
                            value="bouquets" id="flower" defaultChecked />
                        <label className="filter__label filter__label_flower"
                            htmlFor="flower">Цветы</label>

                        <input className="filter__radio" type="radio" name="type" value="toys"
                            id="toys" />
                        <label className="filter__label filter__label_toys"
                            htmlFor="toys">Игрушки</label>

                        <input className="filter__radio" type="radio" name="type"
                            value="postcards" id="postcard" />
                        <label className="filter__label filter__label_postcard"
                            htmlFor="postcard">Открытки</label>
                    </fieldset>


                    <fieldset className="filter__group filter__group_choices">
                        <Choices buttonLabel="Цена" name="price" isOpen={isOpen} cc={handlerChangeChoice}>
                            <fieldset className="filter__price">
                                <input className="filter__input-price" type="text" name="minPrice"
                                    placeholder="от" />
                                <input className="filter__input-price" type="text" name="maxPrice"
                                    placeholder="до" />
                            </fieldset>
                        </Choices>
                        {/* <div className="filter__choices choices">
                            <button className="filter__select choices__btn"
                                type="button">Цена</button>

                            <div className="choices__box filter__choices-box">
                                <fieldset className="filter__price">
                                    <input className="filter__input-price" type="text" name="minPrice"
                                        placeholder="от" />
                                    <input className="filter__input-price" type="text" name="maxPrice"
                                        placeholder="до" />
                                </fieldset>
                            </div>
                        </div> */}

                        <Choices buttonLabel="Тип товара" className="filter__choices_type"
                            name="type" isOpen={isOpen} cc={handlerChangeChoice}
                        >

                            <ul className="filter__type-list">
                                <li className="filter__type-item">
                                    <button className="filter__type-button"
                                        type="button">Монобукеты</button>
                                </li>
                                <li className="filter__type-item">
                                    <button className="filter__type-button" type="button">Авторские
                                        букеты</button>
                                </li>
                                <li className="filter__type-item">
                                    <button className="filter__type-button" type="button">Цветы в
                                        коробке</button>
                                </li>
                                <li className="filter__type-item">
                                    <button className="filter__type-button" type="button">Цветы в
                                        корзине</button>
                                </li>
                                <li className="filter__type-item">
                                    <button className="filter__type-button" type="button">Букеты из
                                        сухоцветов</button>
                                </li>
                            </ul>
                        </Choices>
                        {/* <div className="filter__choices filter__choices_type choices">
                            <button className="filter__select choices__btn" type="button">Тип
                                товара</button>

                            <div
                                className="choices__box filter__choices-box filter__choices-box_type">
                                <ul className="filter__type-list">
                                    <li className="filter__type-item">
                                        <button className="filter__type-button"
                                            type="button">Монобукеты</button>
                                    </li>
                                    <li className="filter__type-item">
                                        <button className="filter__type-button" type="button">Авторские
                                            букеты</button>
                                    </li>
                                    <li className="filter__type-item">
                                        <button className="filter__type-button" type="button">Цветы в
                                            коробке</button>
                                    </li>
                                    <li className="filter__type-item">
                                        <button className="filter__type-button" type="button">Цветы в
                                            корзине</button>
                                    </li>
                                    <li className="filter__type-item">
                                        <button className="filter__type-button" type="button">Букеты из
                                            сухоцветов</button>
                                    </li>
                                </ul>
                            </div>
                        </div> */}
                    </fieldset>
                </form>
            </div>
        </section>

    </>);
}

// export function Choices() {

//     return (<>


//     </>);
// }

