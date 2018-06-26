// const Home = () => import('../components/Home.vue');
// const Item = () => import('../components/Item.vue');
// const Foo = () => import('../components/Foo.vue');

import Home from '../components/Home.vue'
import Item from '../components/Item.vue'
import Foo from '../components/Foo.vue'

export default [
  { path: '/', component: Home },
  { path: '/item/:id', component: Item },
  { path: '/foo', component: Foo },
];