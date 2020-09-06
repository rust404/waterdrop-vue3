import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
import RecordAdd from "/@/views/record/RecordAdd.vue";
import RecordDetail from "/@/views/record/RecordDetail.vue";
import RecordEdit from "/@/views/record/RecordEdit.vue";
import CategoryAdd from "/@/views/category/CategoryAdd.vue";
import CategoryEdit from "/@/views/category/CategoryEdit.vue";
import CategoryManage from "/@/views/category/CategoryManage.vue";
import NotFound from "/@/views/NotFound.vue";
import Statistics from "/@/views/Statistics.vue";

const routes:RouteRecordRaw[] = [
  {
    path: "/record/detail",
    component: RecordDetail,
  },
  {
    path: "/record/edit/:id",
    component: RecordEdit,
  },
  {
    path: "/record/add",
    component: RecordAdd,
  },
  {
    path: "/category/edit/:id",
    component: CategoryEdit,
  },
  {
    path: "/category/add/:type",
    component: CategoryAdd,
  },
  {
    path: "/category/manage",
    component: CategoryManage,
  },
  {
    path: "/statistics",
    component: Statistics,
  },
  {
    path: "/",
    redirect: "/record/add",
  },
  // https://github.com/vuejs/vue-router-next/blob/master/playground/router.ts
  { path: '/:data(.*)', component: NotFound},
  // {
  //   path: "*",
  //   redirect: "/404",
  // },
];

const history = createWebHashHistory()

const router = createRouter({
  history,
  routes,
});

export default router;
