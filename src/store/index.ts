import { createStore, StoreOptions } from "vuex";

import { category } from "./modules/category";
import { record } from "./modules/record";

const store: StoreOptions<{}> = {
  state: {},
  modules: {
    category,
    record,
  },
};

export default createStore(store);
