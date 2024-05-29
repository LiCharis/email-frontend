<template>
  <!--  关闭缩小后登录名换行-->
  <a-row id="globalHeader" align="center" :wrap="false">
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :selected-keys="selectedKeys"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="title-bar">
            <img class="logo" src="../assets/mylogo.jpeg" />
            <div class="title">My Online Judge</div>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in visibleRoutes" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <a-space>
        <a-dropdown trigger="hover">
          <a-avatar trigger-type="mask">
            <img alt="avatar" :src="store.state.user?.loginUser?.userAvatar" />
            <template #trigger-icon>
              <IconEdit />
            </template>
          </a-avatar>
          <template #content>
            <a-doption>
              <a-button>个人中心</a-button>
            </a-doption>
            <a-doption>
              <a-button @click="logout">退出登录</a-button>
            </a-doption>
          </template>
        </a-dropdown>

        <div>{{ store.state.user?.loginUser?.userAccount ?? "未登录" }}</div>
      </a-space>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "@/router/routes";
import { useRoute, useRouter } from "vue-router";
import { computed, ref } from "vue";

const router = useRouter();
//当前路由
const route = useRoute();

//引入全局变量
const store = useStore();

//展示在菜单的路由数组
const visibleRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      //有hideInMenu属性的就隐藏掉
      return false;
    }
    // 根据当前登录用户权限过滤菜单
    if (!checkAccess(store.state.user.loginUser, item.meta?.access as string)) {
      //没有相应权限就不展示
      return false;
    }
    return true;
  });
});

//默认选中的为主页
const selectedKeys = ref(["/"]);
//路由跳转后，更新选中的菜单项
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});

const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};
const logout = async () => {
  const res = await UserControllerService.userLogoutUsingPost();
  if (res.code == 0) {
    message.success("退出成功");
    router.push({
      path: "/user/login",
    });
  } else {
    message.error("退出失败");
  }
};

// setTimeout(() => {
//   store.dispatch("user/getLoginUser", {
//     username: "li",
//     userRole: ACCESS_EMUM.ADMIN,
//   });
// }, 3000);
</script>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.title {
  color: #444;
  margin-left: 14px;
}

.logo {
  height: 48px;
}
</style>
