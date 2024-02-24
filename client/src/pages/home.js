import AppLayout from '@/components/Layouts/AppLayout'
import axios from 'axios';
import Head from 'next/head'
import { useEffect, useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Button, CardActionArea, CardMedia, Typography } from '@mui/material';
import Link from 'next/link';
import { SearchBar } from '@/components/SearchBar';

const Home = () => {
    const [movies, setMovies] = useState([]);
    
    useEffect(() => {
        // useEffect自体ではasyncの関数を受け取れないので、内部で関数定義して呼び出す
        const fetchMovies = async() => {
        try {
            const response = await axios.get('api/getPopularMovies');
            setMovies(response.data.results);
        } catch(err) {
            console.log(err);
        }
        }
        fetchMovies()
        
    }, []); // 第2引数で空の配列を指定すると画面リロード時に副作用発火

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Home
                </h2>
            }>
            <Head>
                <title>Laravel - Dashboard</title>
            </Head>

            <SearchBar />

            <Swiper
            spaceBetween={30}
            slidesPerView={4}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            breakpoints={{
                // 320px以上の画面サイズの場合
                320: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
                // 480px以上の画面サイズの場合
                480: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                // 640px以上の画面サイズの場合
                640: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                },
                // 768px以上の画面サイズの場合
                768: {
                    slidesPerView: 5,
                    spaceBetween: 40,
                }
            }}
            >
                {movies.map((movie) => (
                    <SwiperSlide key={movie.id}>
                        <Link href={`detail/movie/${movie.id}`}>
                            <CardActionArea>
                                <CardMedia
                                    component={"img"}
                                    sx={{
                                        aspectRatio: '2/3'
                                    }}
                                    image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                    alt={movie.title}
                                />
                            </CardActionArea>
                        </Link>

                        <Typography>
                            公開日：{movie.release_date}
                        </Typography>
                    </SwiperSlide>
                ))}
            </Swiper>
            
        </AppLayout>
    )
}

export default Home
