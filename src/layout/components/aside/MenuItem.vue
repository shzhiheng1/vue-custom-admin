<template>
  <!-- 使用了嵌套路由，需要通过path.resolve转换,需要base-path参数 -->
  <div v-if="props.item.meta?.show">
    <template v-if="onelyOneChild && !onelyOneChild.children">
      <LinkItem :to="resolvePath(onelyOneChild.path)">
        <el-menu-item
          :index="
            onelyOneChild?.meta?.link ? null : resolvePath(onelyOneChild.path)
          "
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
    <el-sub-menu v-else :index="resolvePath(props.item.path)" teleported>
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
        <menu-item
          v-for="child in props.item.children"
          :key="child.path"
          :item="child"
          :base-path="resolvePath(child.path)"
        />
      </template>
    </el-sub-menu>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import LinkItem from "./LinkItem.vue";
import path from "path-browserify";
import { isExternal } from "@/utils/validate";

interface Props {
  item: any;
  basePath: string;
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
    return { ...props.item, path: "" };
  }
});

/** 将相对路径转为绝对路径 */
const resolvePath = (routePath: string) => {
  switch (true) {
    case isExternal(routePath):
      return routePath;
    case isExternal(props.basePath):
      return props.basePath;
    default:
      return path.resolve(props.basePath, routePath);
  }
};
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
