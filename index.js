// this will allow us to import our variable
require("dotenv").config();
// the following lines are required to initialize a Notion client
const { Client } = require("@notionhq/client");
// this line initializes the Notion Client using our key
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_API_DATABASE;
const getDatabase = async () => {
  const response = await notion.databases.query({ database_id: databaseId });

  const responseResults = response.results.map((page) => {
    return {
      tag: page.properties.MultiTag.title[0]?.plain_text,
      text_lang_RU: page.properties.ru_RU.rich_text[0]?.plain_text,
      text_lang_US: page.properties.en_US.rich_text[0]?.plain_text,
      text_lang_DE: page.properties.de_DE.rich_text[0]?.plain_text,
      text_lang_UK: page.properties.en_UK.rich_text[0]?.plain_text,
      text_lang_FR: page.properties.fr_FR.rich_text[0]?.plain_text,
      text_lang_JP: page.properties.ja_JP.rich_text[0]?.plain_text,
    };
  });

  // this console.log is just so you can see what we're getting here
  console.log();
  const fs = require('fs');
  const data = JSON.stringify(responseResults);
  fs.writeFile('lang.json', data, (err) => {
    if (err) {
        throw err;
    }
    console.log("JSON data is saved.");
});
  return responseResults;
};

  getDatabase();