const { SlashCommandBuilder } = require("discord.js");
const {
  createAudioPlayer,
  createAudioResource,
  StreamType,
  AudioPlayerStatus,
  joinVoiceChannel,
  entersState,
} = require("@discordjs/voice");

const fs = require("fs");

const jsonObject = JSON.parse(fs.readFileSync("./song_config.json", "utf8"));

module.exports = {
  data: new SlashCommandBuilder()
    .setName("premium_free")
    .setDescription("曲を選択して再生")
    .addStringOption(
      (option) => {
        option
          .setName("再生したい曲")
          .setDescription("再生したい曲を選んでね")
          .setRequired(true);
        for (var i = 0; i < jsonObject.premium_song.length; i++) {
          option.addChoices(
            jsonObject.premium_song[i].name,
            jsonObject.premium_song[i].value
          );
        }
      }

      /*         jsonObject.premium_song.forEach(function( song_json ) {
          name: song_json.name,
          value: song_json.mp3,
    })
        .addChoices() */
    ),

  async execute(interaction) {
    const connection = joinVoiceChannel({
      guildId: interaction.guildId,
      channelId: interaction.member.voice.channelId,
      adapterCreator: interaction.guild.voiceAdapterCreator,
      selfMute: false,
      selfDeaf: false,
    });
    //await interaction.reply("参加しました！");
    await interaction.reply({ content: "再生するよ!", ephemeral: true });

    const select_info = interaction.options.get("再生したい曲").value;

    const player = createAudioPlayer();
    const resource = createAudioResource("./mp3file/" + select_info, {
      inputType: StreamType.Arbitrary,
      inlineVolume: true,
    });
    resource.volume.setVolume(0.1);
    connection.subscribe(player);
    player.play(resource);
    player.on(AudioPlayerStatus.Playing, () => {
      console.log("The audio player has started playing!");
    });

    await entersState(player, AudioPlayerStatus.Playing, 10 * 1000);
    await entersState(player, AudioPlayerStatus.Idle, 24 * 60 * 60 * 1000);
    // 再生が終了したら抜ける
    connection.destroy();
  },
};
