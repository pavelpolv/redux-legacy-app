import { App as AntApp, ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { store } from './store';
import { componentsConfig, theme } from './theme';

dayjs.locale('ru');

export const App = () => (
  <Provider store={store}>
    <ConfigProvider locale={ruRU} theme={theme} {...componentsConfig}>
      <AntApp>
        <RouterProvider router={router} />
      </AntApp>
    </ConfigProvider>
  </Provider>
);
