import { releaseChildren, useProxy, autoRun } from '@tylerlong/use-proxy';
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Button, Space, Typography } from 'antd';

const auto = (render, props): JSX.Element | null => {
  const [r, refresh] = useState(null);
  useEffect(() => {
    console.log('effect');
    const proxy = useProxy(props);
    const { start, stop } = autoRun(proxy, () => {
      refresh(render());
    });
    start();
    return () => {
      console.log('release');
      stop();
      releaseChildren(proxy);
    };
  }, []);
  return r;
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
