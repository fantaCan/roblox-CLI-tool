import readline from "node:readline";
import utils from "./src/src.js"; 
import settings from "./CLI/cli.settings.js"; 

//Globals
let processSpeed;

function prompt(prompt) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise(function (resolve) {
    rl.question(prompt, (input) => {
      rl.close();
      resolve(input);
    });
  });
}

// Prompt for cookie
await settings.banner(50);
const authorization = await prompt("Enter cookie: ");

// Authentication
const apiResponse = await utils.authenticateCookie(authorization);

if (apiResponse.errors) {
  console.clear();
  console.log("Invalid cookie"); // Display an error message if the cookie is invalid
  process.exit(1);
} else {
  console.clear();
  console.log(`Logged in as ${apiResponse.name}`);
  await settings.sleep(1000);
}

// Get user information
const { id, name } = apiResponse; // Extract the user's ID and name from the API response

async function CLI() {
  await settings.bannerHub(50);
  const userInput = await prompt("[^] ~ ");

  switch (userInput) {
    case "1":
      await handleUnfriending();
      break;

    case "2":
      await handleUnfollowing();
      break;

    case "3":
      await handleLeavingGroups();
      break;

    case "4":
      await handleWipeAll();
      break;
  }
}

async function handleUnfriending() {
  console.clear();

  const { count: friendCount } = await utils.getFriendCount(authorization);
  const { data: friendList } = await utils.getFriendList(id, authorization);

  console.log(`Total Friends: ${friendCount}`);
  await settings.sleep(1000);

  if (friendCount == 0) {
    return CLI();
  }

  const processSpeed = await prompt("Enter speed wanted (ms): ");

  for (const friend of friendList) {
    const { statusCode } = await utils.unfriendUser(friend.id, authorization);

    if (statusCode == 200) {
      console.log(`[~] Unfriended ${friend.name}`);
    }

    if (friendList.indexOf(friend) === friendList.length - 1) {
      console.log("[~] Finished unfriending everyone!");
      await settings.sleep(2000);
      return CLI();
    }

    await settings.sleep(processSpeed);
  }
}

async function handleUnfollowing() {
  console.clear();

  const { count: followerCount } = await utils.getFollowingCount(id, authorization);
  const { data: followingList } = await utils.getfollowingList(id, authorization);

  console.log(`Total Following: ${followerCount}`);
  await settings.sleep(1000);

  if (followerCount == 0) {
    return CLI();
  }

  const processSpeed = await prompt("Enter speed wanted (ms): ");

  for (const following of followingList) {
    const { statusCode } = await utils.unfollowUser(
      following.id,
      authorization
    );

    if (statusCode == 200) {
      console.log(`[~] Unfollowed ${following.name}`);
    }

    if (followingList.indexOf(following) === followingList.length - 1) {
      console.log("[~] Finished unfollowing everyone!");
      await settings.sleep(2000);
      return CLI();
    }

    await settings.sleep(processSpeed);
  }
}

async function handleLeavingGroups() {
  console.clear();

  const { data: groupList } = await utils.getGroupList(id, authorization);
  const groupCount = groupList.length;

  console.log(`Total groups: ${groupCount}`);
  await settings.sleep(1000);

  if (groupCount == 0) {
    return CLI();
  }

  const processSpeed = await prompt("Enter speed wanted (ms): ");

  for (const groupObj of groupList) {
    const { id: groupId, name: groupName } = groupObj.group;
    console.log(id, groupId);
    const { statusCode } = await utils.leaveGroup(id, groupId, authorization);

    if (statusCode == 200) {
      console.log(`[~] Left group ${groupName}`);
    }

    if (groupList.indexOf(group) === groupList.length - 1) {
      console.log("[~] Finished leaving groups!");
      await settings.sleep(2000);
      return CLI();
    }
    await settings.sleep(processSpeed);
  }
}

async function handleWipeAll() {
  console.clear();


  const { count: friendCount } = await utils.getFriendCount(authorization);
  const { data: friendList } = await utils.getFriendList(id, authorization);


  const { count: followerCount } = await utils.getFollowingCount(id, authorization);
  const { data: followingList } = await utils.getfollowingList(id, authorization);


  const { data: groupList } = await utils.getGroupList(id, authorization);
  const groupCount = groupList.length;

  // logs
  console.log(`Total Friends: ${friendCount}`);
  console.log(`Total Following: ${followerCount}`);
  console.log(`Total groups: ${groupCount}`);

  // Check if account is already wiped
  const counts = [friendCount, followerCount, groupCount];
  if (counts.every((count) => count === 0)) {
    return CLI();
  }

  const processSpeed = await prompt("Enter speed wanted (ms): ");
  console.clear();

  // Unfriending
  if (friendCount !== 0) {
    for (const friend of friendList) {
      const { statusCode } = await utils.unfriendUser(friend.id, authorization);

      if (statusCode == 200) {
        console.log(`[~] Unfriended ${friend.name}`);
      }

      if (friendList.indexOf(friend) === friendList.length - 1) {
        console.log("[~] Finished unfriending everyone!");
        await settings.sleep(2000);
        console.clear();
      }

      await settings.sleep(processSpeed);
    }
  }

  // Unfollowing
  if (!followerCount !== 0) {
    for (const following of followingList) {
      const { statusCode } = await utils.unfollowUser(
        following.id,
        authorization
      );

      if (statusCode == 200) {
        console.log(`[~] Unfollowed ${following.name}`);
      }

      if (followingList.indexOf(following) === followingList.length - 1) {
        console.log("[~] Finished unfollowing everyone!");
        await settings.sleep(2000);
        console.clear();
      }

      await settings.sleep(processSpeed);
    }
  }

  // Leave groups
  if (groupCount !== 0) {
    for (const groupObj of groupList) {
      const { id: groupId, name: groupName } = groupObj.group;
      const { statusCode } = await utils.leaveGroup(id, groupId, authorization);

      if (statusCode == 200) {
        console.log(`[~] Left group ${groupName}`);
      }

      if (groupList.indexOf(groupObj) === groupList.length - 1) {
        console.log("[~] Finished leaving groups!");
        await settings.sleep(2000);
        return CLI();
      }
      await settings.sleep(processSpeed);
    }
  }
}

CLI();
