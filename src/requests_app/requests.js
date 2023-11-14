import { base } from "./base";
import { request } from "./config";

export const postSnippet = async (data) => {
  return await request("post", `${base}/snippets`, data);
};

export const dltSnippet = async (id) => {
  return await request("delete", `${base}/snippets/${id}`, {});
};

export const getSnippet = async (id) => {
  return await request("get", `${base}/snippets/${id}`, {});
};

export const putObject = async (id, data) => {
  return await request("put", `${base}/snippets/${id}`, data);
};
