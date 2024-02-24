import axios from "axios";

export default async function handler(req, res) {
  try {
    // api配下のスクリプトにTMDBPAIをコールしているのはAPIキーがブラウザ上で確認できてしまうのを防ぐため
    const response = await axios(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=ja-JP`)
    res.status(200).json(response.data)
    // サーバー上に出力されるログ
    // console.log('取得した結果は・・・', response.data)
  } catch(err) {
    console.log(err)
    response.status(500).json({message: "エラーが発生しました。"})
  }
}