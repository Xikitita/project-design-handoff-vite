import { createContext, useContext, useState } from "react";
import { useSwipeable } from "react-swipeable";
import cardOne from "../assets/testimonialCards/cardOne.png";
import cardTwo from "../assets/testimonialCards/cardTwo.png";
import cardThree from "../assets/testimonialCards/cardThree.png";

const CarouselContext = createContext();

export const CarouselProvider = ({ children }) => {
  const [testimonialNumber, setTestimonialNumber] = useState(0);

  const testimonial = [
    {
      image: cardOne,
    },
    {
      image: cardTwo,
    },
    {
      image: cardThree,
    },
  ];

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setTestimonialNumber((prevNumber) =>
        prevNumber === testimonial.length - 1 ? 0 : prevNumber + 1
      );
    },
    onSwipedRight: () => {
      setTestimonialNumber((prevNumber) =>
        prevNumber === 0 ? testimonial.length - 1 : prevNumber - 1
      );
    },
    preventDefaultTouchmoveEvent: true,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const changeNumber = (newNumber) => {
    setTestimonialNumber(newNumber);
  };

  return (
    <CarouselContext.Provider
      value={{
        testimonialNumber,
        testimonial,
        handlers,
        changeNumber,
      }}>
      {children}
    </CarouselContext.Provider>
  );
};

export const useCarousel = () => useContext(CarouselContext);
