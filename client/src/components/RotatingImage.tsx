import { Button, Image } from "@chakra-ui/react";
import React, { useState, useEffect, useMemo } from "react";

interface RotatingImageProps {
  images: string[];
  currentIndex?: number;
  onChangeIndex?: (index: number) => void;
}

const RotatingImage: React.FC<RotatingImageProps> = ({
  images,
  currentIndex = 0,
  onChangeIndex = () => { }
}) => {
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    let timer: number;

    if (autoPlay) {
      timer = setInterval(() => {
        onChangeIndex((currentIndex + 1) % images.length);
      }, 2000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [autoPlay, currentIndex, images.length, onChangeIndex]);

  const handlePrevClick = () => {
    setAutoPlay(false);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    onChangeIndex(prevIndex);
    setTimeout(() => {
      setAutoPlay(true);
    }, 500); // 等待0.5秒后再开启自动播放
  };

  const handleNextClick = () => {
    setAutoPlay(false);
    const nextIndex = (currentIndex + 1) % images.length;
    onChangeIndex(nextIndex);
    setTimeout(() => {
      setAutoPlay(true);
    }, 500); // 等待0.5秒后再开启自动播放
  };

  const handleDotClick = (index: number) => {
    setAutoPlay(false);
    onChangeIndex(index);
    setTimeout(() => {
      setAutoPlay(true);
    }, 500); // 等待0.5秒后再开启自动播放
  };


  const handleMouseEnter = () => {
    setAutoPlay(false)
  };

  const handleMouseLeave = () => {
    setAutoPlay(true);
  };

  const leftStyle = useMemo(() => {
    if (currentIndex === 0) return false;
    return true;
  }, [currentIndex])

  const rightStyle = useMemo(() => {
    if (currentIndex === images.length - 1) return false;
    return true;
  }, [currentIndex])

  //TODO:添加图片淡出效果
  return (
    <div
      style={{ position: "relative" }}
      h="60vh"
      w="100vh"
      mt-10
      mr-20
    >
      <Image
        src={images[currentIndex]}
        alt="rotating image"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        height={"100%"}
        width={"100%"}
        borderRadius="10px"
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          justifyContent: "space-between",
          width: "100%"
        }}
      >

        <Button
          onClick={handlePrevClick}
          i-carbon-arrow-left
          bg={leftStyle ? "white" : "transparent"}
        >
        </Button>

        <Button
          onClick={handleNextClick}
          i-carbon-arrow-right
          bg={rightStyle ? "white" : "transparent"}
        >
        </Button>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        {images.map((_, index) => (
          <div
            key={index}
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: index === currentIndex ? "black" : "white",
              margin: "0 5px",
              cursor: "pointer"
            }}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div >
  );
};

export default RotatingImage;
