<script lang="ts" setup>
import { ref, computed, getCurrentInstance, watch, provide, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { userStore } from "./pinia/user";
import sideLogo from '@/assets/logo_side.png'
import Logo from '@/assets/logo.png'
import { useObserver } from "@/untils/observes";
import { tabStore } from "./pinia/tabs";
import { VueDraggable } from "vue-draggable-plus";
const elementRef = ref(null);
const { isIntersecting, observe } = useObserver();

let isCollapsed = ref(false);
const route = useRouter();
const userState = userStore();
let menuitemClasses = computed(() => {
  return ["menu-item", isCollapsed.value ? "collapsed-menu" : ""];
});
let activeName = computed((value) => {
  return route.currentRoute.value.name;
});
let alias = computed(() => {
  return route.currentRoute.value.meta.name;
});
let tabState = tabStore()
// const card = ref();
const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
// provide("card", card);
let loading2 = ref(false);
function toLoading2() {
  loading2.value = true;
  setTimeout(() => {
    loading2.value = false;
    userState.reset()
    route.push("/login");
  }, 1000);
}
type abcd = {
  a: number, c: any
} & {
  b: number
}
interface abc {
  a: number,
  b: number, c: string, d: number
}

type ad = abcd & abc
const acv: ad = reactive({
  a: 2,
  b: 3, c: 'a', d: 1
})
const toIndex = () => {
  route.push("/");
};
onMounted(() => {
  // observe(elementRef);
});
</script>
<template>
  <div v-if="activeName != 'login'" class="layout">
    <Layout>
      <Sider breakpoint="lg" collapsible collapsed-width="78" v-model="isCollapsed">
        <div style="width: 100%;;display: flex;justify-content: center;align-items: center;margin: 100px 0;">
          <Image v-if="!isCollapsed" :src="Logo" fit="fit" width="120px" height="50px" alt="" />
          <Image v-else :src="sideLogo" sizes="[]" fit="fit" width="50px" height="50px" alt="" />
        </div>
        <Menu ref="elementRef" :active-name="activeName" theme="dark" width="auto" :class="menuitemClasses">
          <MenuItem v-for="item in userState.menuList" :name="item.name" :to="item.path">
          <Icon :custom="'iconfont ' + item.icon" size="24"></Icon>
          <span>{{ item.title }}</span>
          </MenuItem>
        </Menu>
      </Sider>
      <Layout>
        <Header :style="{ textAlign: 'end', maginRight: '20px' }">
          <Space size="large" style="margin-right: 20px;">
            <Avatar :style="{ background: ColorList[Math.floor(Math.random() * 3)] }">{{ userState.getUserName4bit() }}
            </Avatar>
          </Space>
          <Button type="primary" :loading="loading2" icon="ios-power" @click="toLoading2">
            <span v-if="!loading2">退出</span>
            <span v-else>Loading...</span>
          </Button>
        </Header>
        <div>
          <VueDraggable v-model=" tabState.tabs">
            <Tag v-for="item in tabState.tabs" type="dot" closable checkable :color="item.color"
              @on-change="tabState.switchTab(item.name)" @on-close="tabState.removeTab(item.name)" :name="item.name">{{
              item.meta }}</Tag>
          </VueDraggable>

        </div>
        <Content :style="{
          height: 'calc(100vh - 100px)',
          background: '#fff',
          overflow: 'scroll',
          boxSizing: ' border-box'

        }">
          <!-- <Card> -->
            <!-- <div ref="card"> -->
              <keep-alive> <router-view></router-view></keep-alive>


            <!-- </div> -->
          <!-- </Card> -->
        </Content>
      </Layout>
    </Layout>
  </div>
  <router-view v-else></router-view>
</template>

<style scoped>
.layout {
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}

.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}

.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}

.layout-footer-center {
  text-align: center;
}

.dev-run-preview .dev-run-preview-edit {
  display: none
}

.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}

.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}

.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}

.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}

.dev-run-preview .dev-run-preview-edit {
  display: none;
}

.ss {
  size: 0cap;
}
</style>: any: any
