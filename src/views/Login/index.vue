<template>
  <div class="login">
    <div class="content">
      <div class="title">登录</div>
      <el-form
        :rules="rules"
        :model="formData"
        ref="formDataRef"
        label-width="70px"
        class="form"
        @submit.prevent
      >
        <el-form-item label="用户名" prop="userName">
          <el-input v-model.trim="formData.userName" type="text" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model.trim="formData.password" type="password" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="item-btn"
            @click="handleLogin(formDataRef)"
            :loading="isLoading"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { FormInstance, FormRules } from "element-plus";
import { useUserStore } from "../../store/modules/user";
import { useRouter } from "vue-router";

const router = useRouter();
interface FormData {
  userName: string;
  password: string;
}
const formDataRef = ref<FormInstance>();
const formData = reactive<FormData>({
  userName: "admin",
  password: "12345678",
});
const isLoading = ref(false);
const rules = reactive<FormRules<FormData>>({
  userName: [{ required: true, message: "此项必填！", trigger: "blur" }],
  password: [
    { required: true, type: "string", message: "此项必填！", trigger: "blur" },
  ],
});
// 结构store
const { login } = useUserStore();
const handleLogin = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      isLoading.value = true;
      const params = {
        code: "123456",
        username: formData.userName,
        password: formData.password,
      };
      login(params)
        .then(() => {
          router.replace("/");
        })
        .finally(() => {
          isLoading.value = false;
        });
    }
  });
};
</script>

<style lang="scss" scoped>
.login {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .content {
    width: 360px;
    border: 1px dashed #333;
    // position: absolute;
    // left: 50%;
    // top: 50%;
    // transform: translate(-150px, -100px);
    box-sizing: border-box;
    padding: 20px 20px;
    box-shadow: 0px 0px 10px #333;
    .title {
      margin: 10px 0px 20px;
      text-align: center;
      font-size: 20px;
      font-weight: 500;
    }
    .form {
      .item-btn {
        width: 100%;
      }
    }
  }
}
</style>
