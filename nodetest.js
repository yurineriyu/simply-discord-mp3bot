const fs = require("fs");

const jsonObject = JSON.parse(fs.readFileSync("./song_config.json", "utf8"));



for (var i = 0; i < jsonObject.premium_song.length; i++) {
    console.log(jsonObject.premium_song[i].name);
    console.log(jsonObject.premium_song[i].value);
  }


/*   console.log(jsonObject.premium_song[8].name);
  console.log(jsonObject.premium_song.length) */