export const SET_AGE = "set_age";
export const SET_NAME = "set_name";

export const setAge = function (n: number) {
  return {
    type: SET_AGE,
    n: n,
  };
};
export const setName = function (name: string) {
  return {
    type: SET_NAME,
    name: name,
  };
};

export const CHANGE_COLLAPSED = 'CHANGE_COLLAPSED' // 左侧菜单收缩的变量
export const CHANGE_COLOR = 'CHANGE_COLOR' // 左侧菜单收缩的变量