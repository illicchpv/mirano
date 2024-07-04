import {Header} from './modules/Header/Header';
import {Footer} from './modules/Footer/Footer';
import {Goods} from './modules/Goods/Goods';

import {Filter} from './modules/Filter/Filter';
import {Hero} from './modules/Hero/Hero';
import {Order} from './modules/Order/Order';
import {Subscribe} from './modules/Subscribe/Subscribe';

export function App() {

    return (<>

        <Header />

        <main>
            <Hero />

            <Filter />

            <Goods />

            <Subscribe />
        </main>

        <Footer />

        <Order />

    </>);
}
