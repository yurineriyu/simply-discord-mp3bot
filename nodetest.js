const fs = require("fs");

const jsonObject = JSON.parse(fs.readFileSync("./song_config.json", "utf8"));

//console.log(jsonObject.premium_song)

/* jsonObject.list.forEach((obj) => {
    console.log(result[obj.id] = obj)
}); */

/* jsonObject.forEach((obj) => {
    console.log(premium_song[obj] = obj)
}); */

/* jsonObject.premium_song.forEach(function( value ) {
    console.log( value.name );
}); */

const song_list = jsonObject.premium_song.filter((song) => song.type === "");

console.log(song_list);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("delpay")
    .setDescription("Remove Payment Option")
    .addStringOption((option) => {
      option
        .setName("code")
        .setDescription("Input Payment Code [Case Sensitive]")
        .setRequired(true);

      for (var i = 0; i < list.length; i++) {
        option.addChoice(list[i].name, list[i].code);
      }
      return option;
    }),
};
