// src/pages/DrawingPage.jsx
import { useState } from "react";
import DrawingCanvas from "../components/DrawingCanvas";
import { useNavigate, useParams } from "react-router-dom";

import shape1 from "../assets/shape1.png";
import shape2 from "../assets/shape2.png";
import shape3 from "../assets/shape3.png";
import shape4 from "../assets/shape4.png";
import shape5 from "../assets/shape5.png";
import shape6 from "../assets/shape6.png";
import shape7 from "../assets/shape7.png";
import shape8 from "../assets/shape8.png";
import shape9 from "../assets/shape9.png";

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

export default function DrawingPage({ sessionId }) {
  const navigate = useNavigate();
  const { id } = useParams();  // /draw/:id
  const currentFigure = Number(id);

  const handleNext = () => {
    if (currentFigure < 9) navigate(`/draw/${currentFigure + 1}`);
    else navigate("/result", { state: { session_id: sessionId } });
  };

  const handlePrev = () => {
    if (currentFigure > 1) navigate(`/draw/${currentFigure - 1}`);
  };

  return (
    <DrawingCanvas
      shapeImage={shapes[currentFigure]}
      onNext={handleNext}
      onPrev={handlePrev}
      sessionId={sessionId}
      figureId={currentFigure}
    />
  );
}
