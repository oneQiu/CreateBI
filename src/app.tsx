import { defineAppConfig } from 'ice';
import { defineAuthConfig } from '@ice/plugin-auth/types';
import { defineRequestConfig } from '@ice/plugin-request/types';
import { Result } from 'antd';

// 权限
export const authConfig = defineAuthConfig(async () => ({
  initialAuth: {},
  NoAuthFallback: () => {
    return (
      <Result
        status={'403'}
        title={'无权限'}
        subTitle={'对不起，暂无访问权限。'}
      />
    );
  },
}));

// 请求
export const requestConfig = defineRequestConfig({
  baseURL: '/api',
  headers: {},
  withCredentials: true,
  // 拦截器
  interceptors: {
    request: {},
    response: {},
  },
});

// App config, see https://v3.ice.work/docs/guide/basic/app
export default defineAppConfig(() => ({}));
