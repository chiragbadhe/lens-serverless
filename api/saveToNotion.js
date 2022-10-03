//store variables init .env
const dotenv = require("dotenv");
dotenv.config();

//declared required data to acess notion api
const { Client } = require("@notionhq/client");
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

//function  to save data to notion
const saveToNotion = async (
  databaseId,
  handle,
  profileId,
  creator,
  date,
  link
) => {
  try {
    const response = await notion.pages.create({
      parent: {
        database_id: databaseId,
      },
      properties: {
        Handle: {
          type: "title",
          title: [
            {
              type: "text",
              text: {
                content: handle,
              },
            },
          ],
        },
        ProfileId: {
          type: "rich_text",
          rich_text: [
            {
              type: "text",
              text: {
                content: profileId,
              },
            },
          ],
        },

        Creator: {
          type: "rich_text",
          rich_text: [
            {
              type: "text",
              text: {
                content: creator,
              },
            },
          ],
        },

        Link: {
          type: "url",
          url: link,
        },

        Date: {
          type: "rich_text",
          rich_text: [
            {
              type: "text",
              text: {
                content: date,
              },
            },
          ],
        },
      },
    });
  } catch (error) {
    console.error(error);
  }
};

//serverless function
module.exports = async (req, res) => {
  const data = req.body;

  if (req.method === "GET") {
    res.json([]);
  } else {
    const user = req.body;
    if (user) {
      try {
        var convertTimestamp = new Date(user.timestamp * 1000);
        var mintDate = convertTimestamp.toLocaleString();
        var accountLink = "https://lenster.xyz/u/" + user.handle;

        const save = await saveToNotion(
          databaseId,
          "🌿 " + user.handle,
          user.profileId,
          user.to,
          mintDate,
          accountLink
        );
        console.log("Data Saved To Notion", save);
      } catch (error) {
        console.log("Error From Contract", error);
      }
    } else {
      console.log("Error");
    }

    res.send({ status: "Event Listened", user });
  }
};
