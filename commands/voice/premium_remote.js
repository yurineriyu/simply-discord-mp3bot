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
    .setName("premium_remote")
    .setDescription("曲とチャンネル選択して再生")
    .addStringOption((option) =>
      option
        .setName("再生したい曲")
        .setDescription("再生したい曲を選んでね")
        .setRequired(true)
        .addChoices(
          {
            name: "【オリジナル曲】やばいクレーマーのSUSURU TV（本人歌唱ver）",
            value: "susuru-ouenka.mp3",
          },
          {
            name: "コラ〜！雪【やばいクレーマーのSUSURU TV】",
            value: "susuru-konayuki.mp3",
          },
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
          },
          {
            name: "やばいクルーマーのSUSURU TV",
            value: "susuru-ruma.mp3",
          },

          {
            name: "garakuta noodle claim",
            value: "susuru-garakuta.mp3",
          },

          {
            name: "やばいクレーマーのSAKURA TV.（独唱・withゆゆうた)SUSURU ver.",
            value: "susuru-sakura-honnninn.mp3",
          },

          {
            name: "啜",
            value: "susuru-odo.mp3",
          },

          {
            name: "ススル・ヴ・クレジデント",
            value: "susuru-pre.mp3",
          },

          {
            name: "やばい白日のSUSURU TV",
            value: "susuru-hakujitu.mp3",
          },

          {
            name: "コラ～！グトレイン",
            value: "susuru-ragutore.mp3",
          },

          {
            name: "3月殺すぞ / レミオロ麺",
            value: "susuru-sangatu.mp3",
          },

          {
            name: "やばいクレーマーの旅立ちの日に",
            value: "susuru-tabidati.mp3",
          },

          {
            name: "やばい命に嫌われているクレーマーのSUSURU TV",
            value: "susuru-kiraware.mp3",
          },

          {
            name: "やばいクレーマーのSAKURA TV(独唱)",
            value: "susuru-sakura.mp3",
          },

          {
            name: "やばいクレーマーの歌コンクール　濃厚豚骨豚無双部門・銀賞",
            value: "susuru-nonoka.mp3",
          }
        )
    )
    .addChannelOption((option) =>
      option
        // optionの名前
        .setName("channel")
        // optionの説明
        .setDescription("The channel to join")
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
