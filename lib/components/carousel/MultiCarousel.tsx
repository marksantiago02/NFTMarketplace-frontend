"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import NFTViewCard from '@/lib/components/card/NFTViewCard';

import type { FC } from 'react';

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./style.css";

import type { NFTBaseType } from "@/lib/components/card/NFTViewCard";

type Props = {
  delay: number;
  data: NFTBaseType[];
  selectedNFT: number;
  setSelectedNFT: (selectedNFT: number) => void;
}

const MultiCarousel: FC<Props> = (data: Props) => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={10}
      autoplay={{
        delay: data.delay,
        disableOnInteraction: false,
      }}
      breakpoints={{
        '@0.00': {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        '@0.75': {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        '@1.00': {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        '@1.25': {
          slidesPerView: 4,
          spaceBetween: 60,
        }
      }}
      modules={[Autoplay, Pagination]}
      className="mySwiper"
    >
      {
        data.data.map((item: NFTBaseType, index: number) => {
          return (
            <SwiperSlide key={index} className="!bg-transparent !h-full">
              <NFTViewCard data={item} onClick={data.setSelectedNFT} />
            </SwiperSlide>
          )
        })
      }
    </Swiper>
  );
}

export default MultiCarousel;