/**
 * 抽成hooks为了后期如果有修改不用一个个修改
 *
 * **/
export function useEnv() {
  const { VITE_BASE_API, VITE_PULIC_PATH, MODE } = import.meta.env;
  return {
    VITE_BASE_API,
    VITE_PULIC_PATH,
    MODE,
  };
}
