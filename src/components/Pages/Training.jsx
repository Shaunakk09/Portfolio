import { useEffect, useState, useRef } from 'react';

export const Training = ({theme , images , interval}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const trainingRef = useRef(null);

  useEffect(() => {
    images.forEach((image) => {
      const img = new Image();
      img.src = image;
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
        <div className={`ml-0 mr-0 mb-5 sm:ml-80 sm:mr-80 sm:mb-20 h-56 sm:h-96 max-w-full rounded-lg shadow flex flex-col`} 
            style={{ 
                backgroundSize: '100% 100%',
                backgroundImage: loaded ? `url(${images[currentImageIndex]})` : 'url(./icons/spinner.gif)', 
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}>
            <img src={images[currentImageIndex]} style={{display: 'none'}} onLoad={() => setLoaded(true)} alt="training" />
        </div>
    </div>
  )
}