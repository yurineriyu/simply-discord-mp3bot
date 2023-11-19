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
    .setName("youtube")
    .setDescription("youtubeから再生")
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

    await interaction.reply({ content: "再生するよ!", ephemeral: true });

    const player = createAudioPlayer();
    connection.subscribe(player);

    const select_info = interaction.options.get("url").value;
    const videoID = ytdl.getURLVideoID(select_info);

    try {
      const stream = ytdl(videoID, {
        filter: (format) =>
          format.audioCodec === "opus" && format.container === "webm",
        quality: "highest",
        dlChunkSize: 0,
        bitrate: 128,
      });

      const resource = createAudioResource(stream, {
        inputType: StreamType.Arbitrary,
        inlineVolume: true,
      });

      resource.volume.setVolume(0.01);

      player.play(resource);

      player.on(AudioPlayerStatus.Playing, () => {
        console.log("The audio player has started playing!");
      });

      await entersState(player, AudioPlayerStatus.Playing, 10 * 1000);
      await entersState(player, AudioPlayerStatus.Idle, 60 * 1000);
    } catch (error) {
      console.error("Error while playing:", error);
      interaction.followUp("再生中にエラーが発生しました。");
    } finally {
      // 再生が終了したら抜ける
      connection.destroy();
    }
  },
};