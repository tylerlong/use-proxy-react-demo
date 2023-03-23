import { useProxy } from '@tylerlong/use-proxy';

export class Store {
  public count = 0;
}

const store = useProxy(new Store());

export default store;
