# simply-discord-mp3bot
a simply discord bot

## 必須コンポーネント

### FFmpeg

'''ffmpeg -version'''
## npm install

discord.js
@discordjs/voice
@discordjs/opus

## 機能説明（仮）
- mp3をVCで再生する
- mp3アップロード機能（未実装）
- youtubeからの簡易再生
- 25曲はスラッシュコマンドで再生可能

## 要件定義（仮）

- オーディオファイルのノーマライゼーション（未実装）
- オーディオファイルのアップロード（未実装）
- マルチサーバー対応（未実装）

##### Bot 再生までのながれ（仮）

流したいボイスチャットに入る
スラッシュコマンド/play を入力  
Tab で曲コマンド選択し入力　例：/play example[曲 example を再生するコマンド]

##### Bot コマンド一覧（仮）
```例）/example [second argument] [third argument]```

- /play [music1,music2,...max25]()
- /play_remote（未実装）
- /premium
- /premium_remote（未実装）
- /stop（未実装）
- /stop_remote（未実装）
- /exit（未実装）
- /exit_remote（未実装）
- /youtube（未実装）
- /youtube_remote（未実装）
- /setting [youtube_volume,mp3_volume]（未実装）
- /command_view [list,premium_list]（未実装）