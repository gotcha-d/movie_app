import AppLayout from '@/components/Layouts/AppLayout'
import { Box, Container, Grid, Typography } from '@mui/material'
import axios from 'axios'
import React from 'react'

const Detail = ({ detail, media_type }) => {

    console.log(detail)

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Detail
                </h2>
            }>

            <Box
                sx={{
                    height: { xs: "auto", md: "70vh"}, bgcolor: "red", position: "relative", display: "flex", alignItems: "center"
                }}
            >
                {/* 背景画像表示 */}
                <Box 
                    sx={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original${detail.backdrop_path})`,
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundSize: 'cover',
                        
                        '&::before': {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            backdropFilter: 'blur(10px)'
                        }
                    }}
                >
                </Box>
                
                <Container sx={{ zIndex: 1 }}
                >
                    <Grid sx={{ color:"white" } } container alignItems={"center"}>
                        <Grid item md={4} sx={{ display:"flex", justifyContent:"center"}}>
                            <img width="70%" src={`https://image.tmdb.org/t/p/original${detail.poster_path}`} />
                        </Grid>
                        <Grid item md={8} >
                            <Typography variant='h4' paragraph>{detail.title || detail.name }</Typography>
                            <Typography paragraph>{detail.overview}</Typography>
                            <Typography variant='h6'>
                              {media_type == "movie" ? `公開日：${detail.release_date}` : `初回放送日：${detail.first_air_date}`}
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </AppLayout>

    )
}

// SSR サーバーサイドで実行されるのでAPIキーを見られない
export async function getServerSideProps(context) { 
    const { media_type, media_id } = context.params

    try {
        const jpResponse = await axios(`https://api.themoviedb.org/3/${media_type}/${media_id}?api_key=${process.env.TMDB_API_KEY}&language=ja-JP`)
        
        let combinedData = {...jpResponse.data} // スプレッド構文で日本語データをコピー

        if (jpResponse.data.overview == "") {
            const enResponse = await axios(`https://image.tmdb.org/3/${media_type}/${media_id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`)
            combinedData.overview = enResponse.data.overview
        }
        
        return {
            props: {detail: combinedData, media_type, media_id}
        }

    } catch {
        console.log(err)
    } 
}

export default Detail