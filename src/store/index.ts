import { createStore, StoreOptions } from "vuex";

import { category } from "./modules/category";
import { record } from "./modules/record";

const options: StoreOptions<{}> = {
  state: {},
  modules: {
    category,
    record,
  },
};

export default createStore(options);
