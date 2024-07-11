import {Header} from './modules/Header/Header';
import {Footer} from './modules/Footer/Footer';
import {Goods} from './modules/Goods/Goods';

import {Filter} from './modules/Filter/Filter';
import {Hero} from './modules/Hero/Hero';
import {Order} from './modules/Order/Order';
import {Subscribe} from './modules/Subscribe/Subscribe';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {fetchCart, registerCart} from './redux/cartSlice';

export function App() {
  const dispatch = useDispatch();
  const [titleGods, setTitleGods] = useState('');
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const initCart = async () => {
      await dispatch(registerCart());
      await dispatch(fetchCart());
    };
    initCart();
  }, [dispatch]);

  return (<>

    <Header setTitleGods={setTitleGods} searchValue={searchValue} setSearchValue={setSearchValue} />

    <main>
      <Hero />

      <Filter setTitleGods={setTitleGods} />

      <Goods title={titleGods} setSearchValue={setSearchValue} />

      <Subscribe />
    </main>

    <Footer />

    <Order />

  </>);
}
