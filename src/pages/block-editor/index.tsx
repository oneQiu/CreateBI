import BlockEditor from '@/components/BlockEditor';

const BlockEditorPage = () => {
  return (
    <div style={{ background: '#f3f5f7' }} className={'h-full flex flex-col p-4'}>
      <h2 className={'text-center'}>Block Editor</h2>
      <div className={'flex-1'}>
        <BlockEditor />
      </div>
    </div>
  );
};

export default BlockEditorPage;
