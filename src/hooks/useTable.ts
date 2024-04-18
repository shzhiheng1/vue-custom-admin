interface HeaderCell {
  row: any;
  column: any;
  rowIndex: number;
  columnIndex: number;
}

// 设置table的通用样式
export const useTalbeHook = () => {
  const customTableHeaderCell = (data: HeaderCell) => {
    if (data.rowIndex === 0) {
      return {
        backgroundColor: "#ecf5ff",
        // borderStyle: "none",
      };
    } else {
      return {};
    }
  };
  return {
    customTableHeaderCell,
  };
};
