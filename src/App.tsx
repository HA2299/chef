// import './App.css';
import Routes from './routes/router'
import { AuthProvider } from './auth/AuthContext';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Provider>
  );
}

export default App;