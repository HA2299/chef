// import './App.css';
import Routes from './routes/router'
import { AuthProvider } from './auth/AuthContext';
import { Provider } from 'react-redux';
import store from './redux/store';
import { AuthModalProvider } from './context/AuthModalContext';

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <AuthModalProvider>
          <Routes />
        </AuthModalProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;

