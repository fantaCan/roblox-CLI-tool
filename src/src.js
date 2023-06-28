import fetch from "node-fetch";
import apis from "../roblox/robloxApi.js";
import retrieveToken from "./util/retrieveToken.js";
const utils = {};

//Friends
utils.getFriendCount = async function (cookie) {
  try {
    const endpoint = apis.friendsApi.url.concat("/v1/my/friends/count");
    const res = await fetch(endpoint, {
      headers: {
        Cookie: cookie,
      },
    });
    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

utils.getFriendList = async function (userId, cookie) {
  try {
    const endpoint = apis.friendsApi.url.concat(`/v1/users/${userId}/friends`);
    const res = await fetch(endpoint, {
      headers: {
        Cookie: cookie,
      },
    });
    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

utils.unfriendUser = async function (userId, cookie) {
  const token = await retrieveToken(cookie);
  try {
    const endpoint = apis.friendsApi.url.concat(`/v1/users/${userId}/unfriend`);
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        Cookie: cookie,
        "X-CSRF-TOKEN": token,
      },
    });
    const statusCode = res.status;
    return { statusCode };
  } catch (error) {
    console.error(error);
  }
};

//Followers
utils.getFollowingCount = async function (userId, cookie) {
  try {
    const endpoint = apis.friendsApi.url.concat(
      `/v1/users/${userId}/followings/count`
    );
    const res = await fetch(endpoint, {
      headers: {
        Cookie: cookie,
      },
    });
    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

utils.getfollowingList = async function (userId, cookie) {
  try {
    const endpoint = apis.friendsApi.url.concat(
      `/v1/users/${userId}/followings`
    );
    const res = await fetch(endpoint, {
      headers: {
        Cookie: cookie,
      },
    });
    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

utils.unfollowUser = async function (userId, cookie) {
  const token = await retrieveToken(cookie);
  try {
    const endpoint = apis.friendsApi.url.concat(`/v1/users/${userId}/unfollow`);
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        Cookie: cookie,
        "X-CSRF-TOKEN": token,
      },
    });
    const statusCode = res.status;
    return { statusCode };
  } catch (error) {
    console.error(error);
  }
};

//Groups
utils.getGroupList = async function (userId, cookie) {
  try {
    const endpoint = apis.groupApi.url.concat(
      `/v2/users/${userId}/groups/roles`
    );
    const res = await fetch(endpoint, {
      headers: {
        Cookie: cookie,
      },
    });
    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

utils.leaveGroup = async function (userId, groupId, cookie) {
  const token = await retrieveToken(cookie);
  try {
    const endpoint = apis.groupApi.url.concat(
      `/v1/groups/${groupId}/users/${userId}`
    );
    const res = await fetch(endpoint, {
      method: "DELETE",
      headers: {
        Cookie: cookie,
        "X-CSRF-TOKEN": token,
      },
    });

    const statusCode = res.status;
    return { statusCode };
  } catch (error) {
    console.error(error);
  }
};

//Auth
utils.authenticateCookie = async function (cookie) {
  try {
    const endpoint = apis.usersApi.url.concat("/v1/users/authenticated");
    const res = await fetch(endpoint, {
      headers: {
        Cookie: cookie,
      },
    });
    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};
export default utils;
