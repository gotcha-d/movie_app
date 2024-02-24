import AppLayout from '@/components/Layouts/AppLayout';
import Layout from '@/components/Layouts/Layout';
import MediaCard from '@/components/MediaCard';
import SideBar from '@/components/SideBar';
import { Grid, Typography } from '@mui/material';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const search = () => {
  const [category, setCategory] = useState("all");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const {query: searchQuery} = router.query;

  console.log(category);

  useEffect(() => {
    // useEffectは初回ローディング時とsearchQueryが変化した時に呼ばれる
    if (!searchQuery) {
      // 初回読み込み時はapiを呼び出さないようにする
      return
    }
    const fetchMedia = async() => {
      try {
        const response = await axios.get(`api/searchMedia?searchQuery=${searchQuery}`)
        const searchResults = response.data.results;
        const validResults = searchResults.filter((item) => {
          return item.media_type == 'tv' || item.media_type == 'movie'
        })
        setResults(validResults)
      } catch(err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchMedia()
  }, [searchQuery]) // 検索条件が変わるたびにapiが呼ばれるようにする

  const filteredResults = results.filter((result) => {
    if (category == "all") {
      return true;
    }
    return result.media_type == category;
  });
  console.log(filteredResults);

  return (
    <AppLayout
      header={
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">
              Search
          </h2>
      }>
      <Head>
          <title>Laravel - Dashboard</title>
      </Head>
      {/* コンポーネントファイルをLayoutファイルを渡すことでページ内のコンテンツをだし分けることをできる */}
      {/* 子要素は'children'という名前でLayoutファイルへ渡される */}
      <Layout sideBar={<SideBar setCategory={setCategory} />}>
        {loading ? (
          <Grid item textAlign={"center"} xs={12}>
            <Typography>
              検索中...
            </Typography>
          </Grid>        
        ) : filteredResults.length > 0 ? (
          <Grid container spacing={3}>
            {filteredResults.map((media) => (
              <MediaCard item={media} key={media.id}/>
            ))}
          </Grid>
        ) : (
          <Grid item textAlign={"center"} xs={12}>
            <Typography>
              検索結果が見つかりませんでした
            </Typography>
          </Grid>
        )}
      </Layout>
    </AppLayout>
  )
}

export default search