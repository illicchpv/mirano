import {Header} from './modules/Header/Header';
import {Footer} from './modules/Footer/Footer';
import {Goods} from './modules/Goods/Goods';

import {Filter} from './modules/Filter/Filter';
import {Hero} from './modules/Hero/Hero';
import {Order} from './modules/Order/Order';
import {Subscribe} from './modules/Subscribe/Subscribe';
import {useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {fetchCart, registerCart} from './redux/cartSlice';

export function App() {
  const dispatch = useDispatch();
  const [titleGods, setTitleGods] = useState('');
  const filterRef = useRef(null);


  useEffect(() => {
    const initCart = async () => {
      await dispatch(registerCart());
      await dispatch(fetchCart());
    };
    initCart();
  }, [dispatch]);

  const scrollToFilter = () => {
    if(filterRef.current) filterRef.current.scrollIntoView({block: 'start', behavior: 'smooth'});
  }

  return (<>

    <Header setTitleGods={setTitleGods} scrollToFilter={scrollToFilter} />

    <main>
      <Hero />

      <Filter setTitleGods={setTitleGods} filterRef={filterRef} />

      <Goods title={titleGods} />

      <Subscribe />
    </main>

    <Footer />

    <Order />

  </>);
}
