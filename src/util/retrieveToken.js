import fetch from "node-fetch";
import apis from "../../roblox/robloxApi.js";

export default async function (cookie) {
  try {
    const endpoint = apis.authApi.url + "/v2/logout";
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        Cookie: cookie,
      },
    });

    const data = res.headers.get("X-CSRF-TOKEN");
    return data;
  } catch (error) {
    console.error(error);
  }
}
