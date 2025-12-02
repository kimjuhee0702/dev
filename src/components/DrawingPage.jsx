import { useState } from "react";
import DrawingCanvas from "./DrawingCanvas";
import shape1 from "../assets/shape1.png";
import shape2 from "../assets/shape2.png";
import shape3 from "../assets/shape3.png";
import shape4 from "../assets/shape4.png";
import shape5 from "../assets/shape5.png";
import shape6 from "../assets/shape6.png";
import shape7 from "../assets/shape7.png";
import shape8 from "../assets/shape8.png";
import shape9 from "../assets/shape9.png";
import { useNavigate } from "react-router-dom";

const shapes = {
  1: shape1,
  2: shape2,
  3: shape3,
  4: shape4,
  5: shape5,
  6: shape6,
  7: shape7,
  8: shape8,
  9: shape9,
};

export default function DrawingPage() {
  const [current, setCurrent] = useState(1);
  const navigate = useNavigate();

  const handleNext = () => {
    if (current === 9) {
      // ⭐ 9번 도형 끝 → 결과 페이지로 이동
      navigate("/result");
    } else {
      setCurrent((n) => n + 1);
    }
  };

  const handlePrev = () => {
    if (current > 1) setCurrent((n) => n - 1);
  };

  return (
    <DrawingCanvas
      shapeImage={shapes[current]}
      onNext={handleNext}
      onPrev={handlePrev}
    />
  );
}
