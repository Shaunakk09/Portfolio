import { useEffect, useState, useRef } from 'react';

export const Training = ({theme , images , interval}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const trainingRef = useRef(null);

  useEffect(() => {
    images.forEach((image) => {
      const img = new Image();
      img.src = image.imageUrl;
    });

    let timer = null;
    const currentRef = trainingRef.current;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        timer = setInterval(() => {
          setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, interval);
      } else if (timer) {
        clearInterval(timer);
      }
    });

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [interval, images]);

  return (
    <div ref={trainingRef}>
        <div className={`ml-0 mr-0 mb-2 sm:ml-80 sm:mr-80 sm:mb-16 h-56 sm:h-96 max-w-full rounded-lg shadow flex flex-col`} 
            style={{ 
                backgroundSize: '100% 100%',
                backgroundImage: loaded ? `url(${images[currentImageIndex].imageUrl})` : 'url(./icons/spinner.gif)', 
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}>
            <img src={images[currentImageIndex].imageUrl} style={{display: 'none'}} onLoad={() => setLoaded(true)} alt="training" />
        </div>
        <div className={`text-xs sm:text-base font-bold tracking-normal text-center ${theme === "darkMode" ? "text-gray-400" : "text-gray-900"} whitespace-nowrap`}>{images[currentImageIndex].title}</div>    
      </div>
  )
}