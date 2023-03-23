import { useProxy } from '@tylerlong/use-proxy';
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Button, Space, Typography } from 'antd';
import { auto } from '@tylerlong/use-proxy/lib/react';

const { Title, Text } = Typography;

// global state
class Store {
  public count = 0;
}

const store = useProxy(new Store());

const App = (props: { store: Store }) => {
  const { store } = props;
  // local state
  const [time, setTime] = useState(Date.now());
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(Date.now());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  const render = () => {
    console.log('render');
    return (
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
          {time}
        </Space>
      </>
    );
  };
  return auto(render, props);
};

const container = document.createElement('div');
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App store={store} />);
