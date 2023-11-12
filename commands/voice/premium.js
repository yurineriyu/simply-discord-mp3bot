const {
  SlashCommandBuilder,
  VoiceChannel,
  GuildMember,
  VoiceState,
} = require("discord.js");
const { vc_id } = require("./config.json");
// BOTをVCに参加させるために必要。

const {
  createAudioPlayer,
  createAudioResource,
  StreamType,
  AudioPlayerStatus,
  joinVoiceChannel,
} = require("@discordjs/voice");

module.exports = {
  data: new SlashCommandBuilder()
    // コマンドの名前
    .setName("premium")
    // コマンドの説明文
    .setDescription("曲を選択して再生")

    .addStringOption((option) =>
      option
        .setName("再生したい曲")
        .setDescription("再生したい曲を選んでね")
        .setRequired(true)
        .addChoices(
          { name: "応援歌", value: "susuru-ouenka.mp3" },
          { name: "粉雪", value: "susuru-konayuki.mp3" },
          {
            name: "Officialやばいクレーマーの髭男SUSURU",
            value: "susuru-higedan.mp3",
          },
          { name: "きゅうコラ～！りん", value: "susuru-kyukura.mp3" },
          {
            name: "やばいクレーマーとSUSURUの神隠し",
            value: "susuru-sento.mp3",
          },
          {
            name: "やばいクレーマーのDestr0yer",
            value: "susuru-destory.mp3",
          },
          {
            name: "やばいクレーマーのSUSURUTVが代",
            value: "susuru-kimigayo.mp3",
          }
        )
    ),

  async execute(interaction) {
    const id = GuildMember({
      member: interaction.user.id,
    });
    const connection = joinVoiceChannel({
      guildId: interaction.guildId,
      channelId: vc_id,
      adapterCreator: interaction.guild.voiceAdapterCreator,
      selfMute: false,
      selfDeaf: false,
    });
    await interaction.reply("参加しました！");
    console.log(GuildMember);
    console.log(interaction.GuildMember);

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
  },
};
