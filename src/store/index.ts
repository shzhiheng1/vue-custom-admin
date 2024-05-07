import { createPinia } from "pinia";
// store持久化存储，区别1.配置不同;2.默认存储方式不同
// import piniaPersist from "pinia-plugin-persist";
import piniaPersist from "pinia-plugin-persistedstate";

const store = createPinia();
store.use(piniaPersist);

export default store;
