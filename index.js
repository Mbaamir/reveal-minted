
Main();

async function Main() {
  const express = require("express");
  const serverConfig = require("./serverConfig.json");

  const app = express();

  const revealMintedListener = require("./revealMinted.js");
  
  const servingPort = serverConfig.servingPort;

  console.log("Starting Application");

  revealMintedListener();
  app.use(express.static("public"));
  app.listen(servingPort);
}


