import { Carousel, Image } from "antd";
import React from "react";
import { banner } from "@/data/banner";
import { useRouter } from "next/router";

function Banner() {
  const router = useRouter();
  const handleRedirectLink = (link) => {
    router.push(link);
  };
  return (
    <Carousel draggable autoplay>
      {banner.map((e) => (
        <div key={e.key} onClick={()=>handleRedirectLink(e.link)} className="w-full h-[650px]">
          <Image alt="" src={e.thumnail} height={650} width='100%' preview={false}/>
        </div>
      ))}
    </Carousel>
  );
}

export default Banner;
