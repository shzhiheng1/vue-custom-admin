<template>
  <div class="menu1">
    <el-card class="form-card">
      <el-form :inline="true" :model="searchForm" ref="searchFormRef">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="searchForm.userName" />
        </el-form-item>
        <el-form-item label="手机号" prop="userPhone">
          <el-input v-model="searchForm.userPhone" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch"
            >搜索</el-button
          >
          <el-button :icon="Refresh" @click="handleRefresh">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div class="toolbar-wraper">
        <div>
          <el-button :icon="CirclePlus" type="primary" @click="handleAdd"
            >新增用户</el-button
          >
          <el-button :icon="Delete" type="danger" @click="batchDelete"
            >批量删除</el-button
          >
        </div>
        <div>
          <el-tooltip effect="dark" content="下载" placement="bottom">
            <el-button circle :icon="Download" type="primary"></el-button>
          </el-tooltip>
          <el-tooltip effect="dark" content="刷新页面" placement="bottom">
            <el-button circle :icon="RefreshRight" type="primary"></el-button>
          </el-tooltip>
        </div>
      </div>
      <!--         :header-cell-style="customHeaderRowclass" -->
      <el-table
        :data="tableData.list"
        empty-text="暂无数据"
        :loading="isLoading"
        @selection-change="handleSelection"
        v-loading="isLoading"
        :header-cell-style="customTableHeaderCell"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          prop="name"
          label="用户名"
          align="center"
          width="120"
        />
        <el-table-column prop="role" label="角色" align="center" width="120" />
        <el-table-column
          prop="phone"
          label="手机号"
          align="center"
          width="120"
        />
        <el-table-column prop="email" label="邮箱" align="center" />
        <el-table-column prop="status" label="状态" align="center" width="120">
          <template #default="scope">
            <el-tag v-if="scope.row.status === 0" effect="plain" type="danger">
              禁用
            </el-tag>
            <el-tag v-else effect="plain" type="success">启用</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center" />
        <el-table-column fixed="right" label="操作" width="140" align="center">
          <template #default="scope">
            <el-button
              type="primary"
              plain
              size="small"
              v-on:click="handleEdit(scope.row)"
              >修改</el-button
            >
            <el-button type="danger" plain size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 下一页 -->
      <div class="pagination">
        <el-pagination
          v-model:current-page="paginationData.currentPage"
          v-model:page-size="paginationData.pageSize"
          :page-sizes="paginationData.pageSizes"
          :small="paginationData.small"
          :background="paginationData.background"
          :layout="paginationData.layout"
          :total="paginationData.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
    <el-dialog
      v-model="dialogFormVisibel"
      width="400"
      :close-on-click-modal="false"
      @close="handleCancel"
    >
      <template #header>
        <div class="dialog-title">{{ checkId ? "修改" : "新增" }}用户</div>
      </template>
      <el-form
        :model="formData"
        label-width="80"
        :rules="formRules"
        ref="formDataRef"
        label-position="left"
      >
        <el-form-item label="用户名" prop="name">
          <el-input
            v-model.trim="formData.name"
            type="text"
            :disabled="!!checkId"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model.trim="formData.password" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleSave">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import {
  Search,
  Refresh,
  CirclePlus,
  Delete,
  Download,
  RefreshRight,
} from "@element-plus/icons-vue";
import { getTableList } from "@/api/table/index";
import { usePaginatonHook } from "@/hooks/usePagination";
import { FormInstance, FormRules, ElMessage } from "element-plus";
import { useTalbeHook } from "@/hooks/useTable";

// 用于缓存
defineOptions({
  name: "Menu1",
});

const { customTableHeaderCell } = useTalbeHook();
const { paginationData, handleCurrentChange, handleSizeChange } =
  usePaginatonHook();
const searchForm = reactive({
  userName: "",
  userPhone: "",
});
const dialogFormVisibel = ref(false);
const tableData = reactive({
  list: [],
});

const isLoading = ref<boolean>(false);
const searchFormRef = ref<FormInstance | null>(null);
/**设置表头样式**/
// const customHeaderRowclass = (data: {
//   row: any;
//   column: any;
//   rowIndex: number;
//   columnIndex: number;
// }) => {
//   if (data.rowIndex === 0) {
//     return {
//       backgroundColor: "#ecf5ff",
//       borderStyle: "none",
//     };
//   } else {
//     return {};
//   }
// };

const handleSearch = () => {
  paginationData.currentPage === 1
    ? getTableData()
    : (paginationData.currentPage = 1);
};
// 获取数据
const getTableData = () => {
  isLoading.value = true;
  const params = {
    pageSize: paginationData.pageSize,
    currentPage: paginationData.currentPage,
    name: searchForm.userName,
    phone: searchForm.userPhone,
  };
  getTableList({ params })
    .then((res) => {
      const _data = res.data;
      tableData.list = _data.list;
      paginationData.total = _data.total;
    })
    .catch(() => {
      tableData.list = [];
    })
    .finally(() => {
      isLoading.value = false;
    });
};
// 重置
const handleRefresh = () => {
  searchFormRef.value?.resetFields();
};
// 分页器
watch(
  [() => paginationData.currentPage, () => paginationData.pageSize],
  getTableData,
  {
    immediate: true,
  }
);

// 新增

const formData = reactive({
  name: "",
  password: "",
});
const formRules: FormRules = reactive({
  name: [{ required: true, trigger: "blur", message: "请输入用户名" }],
  password: [{ required: true, trigger: "blur", message: "请输入密码" }],
});
const formDataRef = ref<FormInstance | null>(null);
const handleAdd = () => {
  dialogFormVisibel.value = true;
};
const handleSave = () => {
  formDataRef.value?.validate((valid) => {
    if (valid) {
      ElMessage({
        message: "操作成功",
        grouping: true,
        type: "success",
      });
      dialogFormVisibel.value = false;
    }
  });
};
const handleCancel = () => {
  formDataRef.value?.resetFields();
  dialogFormVisibel.value = false;
  checkId.value = undefined;
};
// 编辑
const checkId = ref<number>();
const handleEdit = (row: any) => {
  checkId.value = row.id;
  formData.name = row.name;
  dialogFormVisibel.value = true;
};

// 删除
const checkList = ref<number[]>([]);
const handleSelection = (newSelection: any[]) => {
  checkList.value = newSelection.map((item) => item.id);
};
const batchDelete = () => {
  // console.log("--删除的id--", checkList.value);
  ElMessage({
    message: "操作成功！",
    type: "success",
    grouping: true,
  });
  checkList.value = [];
  handleSearch();
};
</script>

<style lang="scss" scoped>
.menu1 {
  .form-card {
    margin-bottom: 20px;
  }
  .toolbar-wraper {
    display: flex;
    margin-bottom: 20px;
    justify-content: space-between;
  }
  .pagination {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
  :deep(.el-dialog__header) {
    margin-right: 0px;
    background-color: #eee;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    .el-dialog__headerbtn {
      top: 2px;
      width: 38.4px;
      height: 38.4px;
    }
  }
}
</style>
