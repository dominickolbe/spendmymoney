import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Firebase, { FirebaseContext } from './components/Firebase';
import Header from './components/Header';
import HomePage from './pages/Home';
import AddTransaction from './pages/AddTransaction';
import EditTransaction from './pages/EditTransaction';
import Settings from './pages/Settings';
import Login from './pages/Login';

const App = () => (
  <FirebaseContext.Provider value={new Firebase()}>
    <Router>
      <>
        <Header />
        <main>
          <Switch>
            <Route path='/add-transaction' component={AddTransaction} exact />
            <Route path="/transactions/:id/edit" component={EditTransaction} exact />
            <Route path='/settings' component={Settings} exact />
            <Route path='/login' component={Login} exact />
            <Route component={HomePage} />
          </Switch>
        </main>
      </>
    </Router>
  </FirebaseContext.Provider>
);

export default App;
