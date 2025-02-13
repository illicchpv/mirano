import {Header} from './modules/Header/Header';
import {Footer} from './modules/Footer/Footer';
import {Goods} from './modules/Goods/Goods';

import {Filter} from './modules/Filter/Filter';
import {Hero} from './modules/Hero/Hero';
import {Order} from './modules/Order/Order';
import {Subscribe} from './modules/Subscribe/Subscribe';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {changeDeliveryDate, fetchCart, registerCart} from './redux/cartSlice';

export function App() {
  const dispatch = useDispatch();
  const [titleGods, setTitleGods] = useState('');

  useEffect(() => {
    const iId = setInterval(() => {
      console.log('iId: ', iId);
      dispatch(changeDeliveryDate());
    }, 3000);
    return () => clearInterval(iId);
  }, []);

  useEffect(() => {
    const initCart = async () => {
      await dispatch(registerCart());
      await dispatch(fetchCart());
    };
    initCart();
  }, [dispatch]);

  return (<>

    <Header />

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
