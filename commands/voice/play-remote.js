const { SlashCommandBuilder, ChannelType } = require("discord.js");
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
    .setName("play-remote")
    .setDescription("コマンドとチャンネルを指定して再生")
    .addStringOption((option) =>
      option
        .setName("コマンド")
        .setDescription("再生したい曲のコマンドを入力")
        .setRequired(true)
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
    const voiceChannel = interaction.options.getChannel("channel");
    const connection = joinVoiceChannel({
      guildId: interaction.guildId,
      channelId: voiceChannel.id,
      adapterCreator: interaction.guild.voiceAdapterCreator,
      selfMute: false,
      selfDeaf: false,
    });
    //await interaction.reply("参加しました！");
    await interaction.reply({ content: "再生するよ!", ephemeral: true });

    const select_info = interaction.options.get("コマンド").value;

    const player = createAudioPlayer();
    const resource = createAudioResource("./mp3file/" + select_info + ".mp3", {
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
