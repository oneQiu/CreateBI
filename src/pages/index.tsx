import { Button, Modal } from 'antd';

export default () => {
  return (
    <div>
      <h2>Index</h2>
      <div className={'p-4 border-red-400 border-2'}>这里是侧额饰</div>
      <Button
        onClick={() => {
          Modal.confirm({});
        }}
      >
        触发
      </Button>
    </div>
  );
};
