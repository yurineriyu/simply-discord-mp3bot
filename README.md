# simply-discord-mp3bot

a simply discord bot with Nodejs  
Nodejs で動く、mp3 をボイスチャットで再生する超シンプルな DiscordBot です

## 必須コンポーネント

- Node.js  
  `node --version`

- FFmpeg  
  `ffmpeg -version`

### Node.js 必須パッケージ

- discord.js
- @discordjs/voice
- @discordjs/opus
- libsodium-wrappers

`npm install discord.js @discordjs/voice @discordjs/opus libsodium-wrappers`

## 機能説明（仮）

- mp3 を VC で再生する
- mp3 アップロード機能（未実装）
- youtube からの簡易再生
- 25 曲はスラッシュコマンドで再生可能

## 要件定義（仮）

- オーディオファイルのノーマライゼーション（未実装）
- オーディオファイルのアップロード（未実装）
- マルチサーバー対応（未実装）

##### Bot 再生までのながれ（仮）

流したいボイスチャットに入る
スラッシュコマンド/play を入力
Tab で曲コマンド選択し入力　例：/play example[曲 example を再生するコマンド]

##### Bot コマンド一覧（仮）

`例）/example [second argument] [third argument]`

- /play_{config} [music1,music2,...max25]
- /play_{config}-remote [music1,music2,...max25] [VoiceChannnel1,VoiceChannnel2,...]
- /play [songname]
- /play-remote [songname] [VoiceChannnel1,VoiceChannnel2,...]
- /stop（未実装）
- /stop_remote（未実装）
- /exit（未実装）
- /exit_remote（未実装）
- /youtube（未実装）
- /youtube_remote（未実装）
- /setting [youtube_volume,mp3_volume]（未実装）
- /command_view [list,premium_list]（未実装）
