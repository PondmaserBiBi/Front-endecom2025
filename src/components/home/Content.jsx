import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

import { Pagination, Autoplay, EffectFade } from 'swiper/modules'

const Content = () => {

    const images = [
        { id: 1, url: '/img/01.jpg' },
        { id: 2, url: '/img/02.jpg' },
        { id: 3, url: '/img/03.jpg' },
        { id: 4, url: '/img/04.jpg' },
        { id: 5, url: '/img/05.jpg' },
    ]

    return (
        <div className="
      w-full 
      bg-gradient-to-b from-[#051937] via-[#073a63] to-[#051937]
      py-14
    ">
            <div className="max-w-6xl mx-auto px-4">

                <Swiper
                    modules={[Pagination, Autoplay, EffectFade]}
                    pagination={{ clickable: true }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false
                    }}
                    effect="fade"
                    loop={true}
                    className="rounded-2xl overflow-hidden shadow-2xl"
                >

                    {images.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div className="relative w-full h-[400px] md:h-[550px] lg:h-[650px]">

                                {/* Image */}
                                <img
                                    src={item.url}
                                    className="w-full h-full object-cover"
                                />

                                {/* Overlay */}
                                <div className="
                  absolute inset-0 
                  bg-black/40
                  flex items-center justify-center
                ">
                                    <h1 className="
                    text-white text-2xl md:text-4xl font-extrabold
                    tracking-widest
                    drop-shadow-[0_0_15px_rgba(0,255,150,0.9)]
                  ">
                                        PND STORE
                                    </h1>
                                </div>

                            </div>
                        </SwiperSlide>
                    ))}

                </Swiper>

            </div>
        </div>
    )
}

export default Content
