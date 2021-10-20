import { Provider } from 'react-redux';
import { useStore } from '../store/store';


function MaterialUICRUD({ Component, pageProps }){
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}


export default MaterialUICRUD;