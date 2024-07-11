import {Header} from './modules/Header/Header';
import {Footer} from './modules/Footer/Footer';
import {Goods} from './modules/Goods/Goods';

import {Filter} from './modules/Filter/Filter';
import {Hero} from './modules/Hero/Hero';
import {Order} from './modules/Order/Order';
import {Subscribe} from './modules/Subscribe/Subscribe';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {registerCart} from './redux/cartSlice';

export function App() {
  const dispatch = useDispatch();
  const [titleGods, setTitleGods] = useState('');

  useEffect(() => {
    const initCart = async () => {
      await dispatch(registerCart());
    };
    initCart();
  }, []);

  return (<>

    <Header setTitleGods={setTitleGods} />

    <main>
      <Hero />

      <Filter setTitleGods={setTitleGods} />

      <Goods title={titleGods} />

      <Subscribe />
    </main>

    <Footer />

    <Order />

  </>);
}
