const { SlashCommandBuilder } = require("discord.js");
const ytdl = require("ytdl-core");

const {
  createAudioPlayer,
  createAudioResource,
  StreamType,
  AudioPlayerStatus,
  joinVoiceChannel,
  entersState,
} = require("@discordjs/voice");

module.exports = {
  data: new SlashCommandBuilder()
    // コマンドの名前
    .setName("youtube")
    // コマンドの説明文
    .setDescription("youtubeを再生")

    .addStringOption((option) =>
      option
        .setName("url")
        .setDescription("再生したいURLを貼り付け")
        .setRequired(true)
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
    await interaction.reply({ content: '再生するよ!', ephemeral: true });

    const player = createAudioPlayer();
    connection.subscribe(player);

    const select_info = interaction.options.get("url").value;
    const stream = ytdl(ytdl.getURLVideoID(select_info), {
      filter: (format) =>
        format.audioCodec === "opus" && format.container === "webm", //webm opus
      quality: "highest",
      dlChunkSize: 0, //disabling chunking is recommended in discord bot
      bitrate: 128,
      highWaterMark: 1 << 62,
      liveBuffer: 1 << 62,
      liveBuffer: 20000,
      //highWaterMark: 32 * 1024 * 1024, // https://github.com/fent/node-ytdl-core/issues/902
    });
    const resource = createAudioResource(stream, {
      inputType: StreamType.WebmOpus,
      inlineVolume: true,
    });

    resource.volume.setVolume(0.01);

    player.play(resource);

    player.on(AudioPlayerStatus.Playing, () => {
      console.log("The audio player has started playing!");
    });

    /* await entersState(player, AudioPlayerStatus.Playing, 10 * 1000);
    await entersState(player, AudioPlayerStatus.Idle, 24 * 60 * 60 * 1000);
    // 再生が終了したら抜ける */
    connection.destroy();
  },
};
