import { Outlet } from '@ice/runtime';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';

const Layout = () => {
  return (
    <ConfigProvider locale={zhCN}>
      Layout
      <Outlet />
    </ConfigProvider>
  );
};

export default Layout;
