import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from 'react-router-dom';

import Home from './pages/Home';
import Game from './pages/Game';

function App() {
  return (
        <Router>
        <header>
          <nav>
          <NavLink to='/' >
                  Home
            </NavLink>
            <NavLink to='/game' >
              Game
            </NavLink>
          </nav>
        </header>
          <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/game' component={Game} />
            </Switch>
        </Router>
  );
}

export default App;
