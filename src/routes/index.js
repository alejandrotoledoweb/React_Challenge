import App from '../pages/App';
import Calendar from '../pages/Calendar';
import NewRemainder from '../components/NewRemainder';


const Routes = [
  {
    path: '/',
    component: App,
    exact: true
  },
  {
    path: '/calendar',
    component: Calendar,
    exact: true
  },
  {
    path: '/newremainder',
    component: NewRemainder,
    exact: true
  }
];

export default Routes;
