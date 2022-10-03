const dotenv = require("dotenv");
dotenv.config();

const ethers = require("ethers");

const provider = new ethers.providers.JsonRpcProvider(
  process.env.MUMBAI_NODE_URL
);

const address = "0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d";

const abi = require("../contractAbi/getProfile.json");

const contract = new ethers.Contract(address, abi, provider);

async function fetchProfile(userId) {
  try {
    const getData = await contract.getProfile(userId).then((userProfile) => {
      console.log(userProfile);
    });
  } catch (error) {
    console.log("Error From Contract", error);
  }
}

fetchProfile(12);
