<template>
  <div class="editor">
    <div class="form">
      <el-button type="primary" @click="handleSave">保存</el-button>
    </div>
    <div style="border: 1px solid #ccc">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 450px; overflow-y: hidden"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
        @onChange="handleChange"
        @onBlur="handleBlur"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { shallowRef, ref, onBeforeUnmount, onMounted } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import "@wangeditor/editor/dist/css/style.css";
import { IDomEditor, IEditorConfig } from "@wangeditor/editor";

//
const editorRef = shallowRef();
const toolbarConfig = {
  excludeKeys: ["uploadImage", "uploadVideo"] //insertImage插入图片，uploadImage是网络图片
};
const mode = "default"; //default或simple
const valueHtml = ref();

// type MENU_CONF?: IMenuConfig

type InsertFnType = (url: string, alt?: string, href?: string) => void;
type InsertFnVideoType = (url: string, poster?: string) => void;

// 编辑器的配置信息
const editorConfig: Partial<IEditorConfig> = {
  placeholder: "请输入内容。。。",
  //   uploadImgServer:'',
  MENU_CONF: {
    // 上传时配置(不使用上传功能可以删除)
    uploadImage: {
      server: "/aa/image/upload", //图片上传地址
      headers: { Authorization: "token" },
      "tenant-id": "1",
      fieldName: "file", //这里有个坑，如果响应结果，没有上传文件，与此处有关。
      // TODO  由于当前使用mockjs,所以请求会报错！
      //   自定义插入函数
      customInsert(res: any, insertFn: InsertFnType) {
        if (res.code == 0) {
          // 从 res 中找到 url alt href ，然后插入图片
          insertFn(res.data, "图片", res.data);
        }
      },
      // 单个文件上传成功之后
      onSuccess(file: File, res: any) {
        // TS 语法
        // onSuccess(file, res) {          // JS 语法
        console.log(`${file.name} 上传成功`, res);
      },

      // 单个文件上传失败
      onFailed(file: File, res: any) {
        // TS 语法
        // onFailed(file, res) {           // JS 语法
        console.log(`${file.name} 上传失败`, res);
      },

      // 上传错误，或者触发 timeout 超时
      onError(file: File, err: any, res: any) {
        // TS 语法
        // onError(file, err, res) {               // JS 语法
        console.log(`${file.name} 上传出错`, err, res);
      }
    },
    uploadVideo: {
      customInsert(res: any, insertFn: InsertFnVideoType) {
        // 从 res 中找到 url poster ，然后插入视频
        insertFn(res.url, "");
      }
    }
  }
};
// 创建时记录editor实例
const handleCreated = (editor: IDomEditor) => {
  editorRef.value = editor;
};

onMounted(() => {});
// 改变出发
const handleChange = () => {
  //   console.log("--val--", valueHtml.value);
};

//失焦触发
const handleBlur = (editor: IDomEditor) => {
  console.log("----blur---", editor);
};
// 保存
const handleSave = () => {
  console.log("------onSave-------", valueHtml.value);
};
// 销毁
onBeforeUnmount(() => {});
</script>

<style lang="scss" scoped>
.editor {
  width: 100%;
  .form {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }
}
</style>
