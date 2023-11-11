# simply-discord-mp3bot
a simply discord bot

## 機能説明
- mp3をVCで再生する
- mp3アップロード機能
- youtubeからの簡易再生
- 25曲はスラッシュコマンドで再生可能
- mp3 

## 要件定義

- オーディオファイルのノーマライゼーション
- オーディオファイルのアップロード
- マルチサーバー対応

##### Bot 再生までのながれ

流したいボイスチャットに入る
スラッシュコマンド/play を入力  
Tab で曲コマンド選択し入力　例：/play example[曲 example を再生するコマンド]

##### Bot コマンド一覧
```例）/example [second argument] [third argument]```

- /play [music1,music2,...max25]()
- /play_remote
- /premium
- /premium
- /stop
- /stop_remote
- /exit
- /exit_remote
- /youtube
- /youtube_remote
- /setting [youtube_volume,mp3_volume]
- /command_view [list,premium_list]