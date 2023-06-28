import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";

const settings = {};

settings.sleep = function(ms) {
  return new Promise(function(resolve) {
    setTimeout(resolve, ms);
  });
};

const colors = {
  red: "\u001b[31m",
  blue: "\u001b[34m",
  white: "\u001b[37m",
};

const prompts = {
  wipeFriendlist: {
    name: "Wipe Friendlist",
  },
  unfollowAll: {
    name: "Unfollow All",
  },
  leaveGroups: {
    name: "Leave Groups",
  },
  wipe: {
    name: "Wipe All",
  },
};

function randomColor() {
  const colorKeys = Object.keys(colors);
  const randomColorKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];
  return colors[randomColorKey];
}

settings.banner = async function(loadTime) {
  console.clear();
  const artFilePath = path.join(process.cwd(), "CLI", "art.txt");
  try {
    let art = await fs.readFile(artFilePath, "utf8");
    art = art.split("\n");
    for (var x = 0; x < art.length; x++) {
      console.log(randomColor() + art[x]);
      await settings.sleep(loadTime);

      if (x + 1 == art.length) {
        console.log("\n".repeat(2).concat(colors.white));
      }
    }
  } catch (err) {
    console.error(err);
  }
};

settings.bannerHub = async function(loadTime) {
  console.clear();
  const artFilePath = path.join(process.cwd(), "CLI", "art.txt");
  try {
    let art = await fs.readFile(artFilePath, "utf8");
    art = art.split("\n");
    for (var x = 0; x < art.length; x++) {
      // Logic for prompts
      if (x == 10 || x > 10) {
        let cliString = randomColor() + art[x].replace("\r", "") + colors.white;
        const spacesNeeded = 45 - cliString.length;
        cliString = cliString + " ".repeat(spacesNeeded); // Add spaces until the string is 40 characters long

        // Check if the numbers are odds
        if (x % 2 === 0) {
          console.log(cliString);
        } else {
          switch (x) {
            case 11:
              console.log(
                cliString +
                  randomColor() +
                  "(1) " +
                  prompts.wipeFriendlist.name.concat(colors.white)
              );
              break;

            case 13:
              console.log(
                cliString +
                  randomColor() +
                  "(2) " +
                  prompts.unfollowAll.name.concat(colors.white)
              );
              break;

            case 15:
              console.log(
                cliString +
                  randomColor() +
                  "(3) " +
                  prompts.leaveGroups.name.concat(colors.white)
              );
              break;

            case 17:
              console.log(
                cliString +
                  randomColor() +
                  "(4) " +
                  prompts.wipe.name.concat(colors.white)
              );
              break;

            case 23:
              console.log(cliString + colors.white + "Made by fanta");
              break;

            default:
              console.log(cliString);
              break;
          }
        }
      } else {
        console.log(randomColor() + art[x]);
      }

      await settings.sleep(loadTime);
