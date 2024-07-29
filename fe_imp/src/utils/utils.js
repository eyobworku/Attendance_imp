import Cookie from "universal-cookie";

const cookie = new Cookie();
// export const token = cookie.get("attedanceToken");
export const getToken = () => cookie.get("attedanceToken");
// export const config = {
//   Authorization: `Bearer ${getToken()}`,
// };

export const displayImage = (url) => {
  return `data:image/png;base64,${url}`;
};
