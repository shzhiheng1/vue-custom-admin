import { reactive } from "vue";
interface PaginationData {
  total?: number;
  currentPage?: number;
  pageSizes?: number[];
  pageSize?: number;
  layout?: string;
  small?: boolean;
  background?: boolean;
}

// 设置分页的默认值

const defaultPaginationData: PaginationData = {
  total: 0,
  currentPage: 1,
  pageSizes: [10, 20, 30, 40, 50],
  pageSize: 10,
  layout: "total,sizes,prev,pager,next,jumper",
  small: true,
  background: true,
};
export const usePaginatonHook = (
  initialPaginationData: PaginationData = {}
) => {
  // 合并分页参数
  const paginationData = reactive<PaginationData>({
    ...defaultPaginationData,
    ...initialPaginationData,
  });
  // 改变当前页面
  const handleCurrentChange = (value: number) => {
    paginationData.currentPage = value;
  };
  // 改变每页的数量
  const handleSizeChange = (value: number) => {
    paginationData.pageSize = value;
  };
  return { paginationData, handleCurrentChange, handleSizeChange };
};
