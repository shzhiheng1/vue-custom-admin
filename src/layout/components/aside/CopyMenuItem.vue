<template>
  <!-- 当全拼路由时使用,不需要path转为相对路由转绝对路径,不需要base-path传递 -->
  <div v-if="props.item.meta?.show">
    <template v-if="onelyOneChild && !onelyOneChild.children">
      <LinkItem :to="onelyOneChild.path">
        <el-menu-item
          :index="onelyOneChild?.meta?.link ? null : onelyOneChild.path"
        >
          <SvgIcon
            v-if="onelyOneChild?.meta?.SvgIcon"
            :name="onelyOneChild?.meta?.SvgIcon"
          />
          <component
            v-else-if="onelyOneChild?.meta?.elIcon"
            :is="onelyOneChild?.meta?.elIcon"
            class="el-icon"
          />
          <template #title>
            <span>{{ onelyOneChild?.meta?.title }}</span>
          </template>
        </el-menu-item>
      </LinkItem>
    </template>
    <el-sub-menu v-else :index="props.item.path" teleported>
      <template #title>
        <SvgIcon
          v-if="props.item.meta?.svgIcon"
          :name="props.item.meta.svgIcon"
        />
        <component
          v-else-if="props.item.meta?.elIcon"
          :is="props.item.meta.elIcon"
          class="el-icon"
        />
        <span v-if="props.item.meta?.title">{{ props.item.meta.title }}</span>
      </template>
      <template v-if="props.item.children">
        <copy-menu-item
          v-for="child in props.item.children"
          :key="child.path"
          :item="child"
        />
      </template>
    </el-sub-menu>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import LinkItem from "./LinkItem.vue";

interface Props {
  item: any;
}
const props = defineProps<Props>();
// 显示子项菜单
const showChildren = computed(() => {
  return props.item.children?.filter((child: any) => child?.meta?.show) || [];
});
// 显示子项数量
const showChildrenNumber = computed(() => {
  return showChildren.value.length;
});
// 是否只有一个项
const onelyOneChild = computed(() => {
  if (showChildrenNumber.value === 1) {
    return showChildren.value[0];
  } else if (showChildrenNumber.value > 1) {
    return null;
  } else {
    return { ...props.item };
  }
});
</script>

<style lang="scss" scoped>
.svg-icon {
  min-width: 1em;
  margin-right: 8px;
  margin-left: 4px;
  font-size: 18px;
}

.el-icon {
  width: 1em;
  margin-right: 12px;
  font-size: 18px;
}
.el-menu-item.is-active {
  background-color: #3370ff !important;
  color: #fff;
  span {
    color: #fff !important;
  }
}
.el-menu-item.is-active::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 2px;
  height: 100%;
  background-color: #fff;
}
.el-menu-item:hover {
  background-color: #409eff !important;
  color: #fff;
}
// 菜单标题的样式
:deep(.el-sub-menu__title:hover) {
  background-color: #409eff !important;
  color: #fff;
}
</style>
