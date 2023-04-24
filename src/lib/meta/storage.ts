import { Meta } from ".";

const key = "slaydle-meta";

export const setLocalData = (meta: Meta) => {
  localStorage.setItem(key, JSON.stringify(meta));
};

export const getLocalData = (): Meta => {
  return JSON.parse(localStorage.getItem(key) as string) as Meta;
};
