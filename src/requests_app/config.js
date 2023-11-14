import axios from "axios";

export const request = async (method, url, data) => {
  let config = {
    method,
    url,
    data
  };
  return await axios(config)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};
