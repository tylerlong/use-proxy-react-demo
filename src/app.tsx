import React from 'react';
import { Button, Space, Typography } from 'antd';
import { auto } from '@tylerlong/use-proxy/lib/react';

import { Store } from './store';

const { Text, Title } = Typography;

const App = (props: { store: Store }) => {
  const { store } = props;
  const render = () => (
    <>
      <Title>Untitled App</Title>
      <Space>
        <Button
          onClick={() => {
            store.count -= 1;
          }}
        >
          -
        </Button>
        <Text>{store.count}</Text>
        <Button
          onClick={() => {
            store.count += 1;
          }}
        >
          +
        </Button>
      </Space>
    </>
  );
  return auto(render, props);
};

export default App;
