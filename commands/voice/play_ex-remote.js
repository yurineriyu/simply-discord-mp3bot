const { SlashCommandBuilder, ChannelType } = require("discord.js");
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
const { command_name } = require("../../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play_" + command_name + "-remote")
    .setDescription("曲とチャンネル選択して再生")
    .addStringOption((option) =>
      option
        .setName("再生したい曲")
        .setDescription("再生したい曲を選んでね")
        .setRequired(true)
        .addChoices(
          ...jsonObject.premium_song.map((song) => ({
            name: song.name,
            value: song.value,
          }))
        )
    )
    .addChannelOption((option) =>
      option
        // optionの名前
        .setName("再生チャンネル")
        // optionの説明
        .setDescription("再生したいチャンネルを選択")
        // optionが必須かどうか
        .setRequired(true)
        // チャンネルのタイプをVCに指定
        .addChannelTypes(ChannelType.GuildVoice)
    ),

  async execute(interaction) {
    const voiceChannel = interaction.options.getChannel("再生チャンネル");
    const connection = joinVoiceChannel({
      guildId: interaction.guildId,
      channelId: voiceChannel.id,
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
