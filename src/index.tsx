import { releaseChildren, useProxy } from '@tylerlong/use-proxy';
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Button, Space, Typography } from 'antd';
import { ProxyEvent } from '@tylerlong/use-proxy/lib/models';

const auto = (render, props): JSX.Element => {
  const [, refresh] = useState(false);
  useEffect(() => {
    const proxy = useProxy(props);
    const listener = (event: ProxyEvent) => {
      if (event.name === 'set') {
        refresh((r) => !r);
      }
    };
    proxy.__emitter__.on('event', listener);
    return () => {
      proxy.__emitter__.off('event', listener);
      releaseChildren(proxy);
    };
  }, []);
  return render();
};

const { Title, Text } = Typography;

class Store {
  public count = 0;
}

const store = useProxy(new Store());

const App = (props: { store: Store }) => {
  const { store } = props;
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
