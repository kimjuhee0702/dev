import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DrawingCanvas({
  shapeImage,
  onNext,
  onPrev,
  sessionId,
  figureId,
}) {
  const navigate = useNavigate();

  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const ctxRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [mode, setMode] = useState("pen");
  const [undoStack, setUndoStack] = useState([]);

  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);

  /* ---------------- 세션 POST 테스트 함수 ---------------- */
  const testSession = async () => {
    try {
      const res = await fetch("http://3.37.106.67:3000/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: "test_user_01" }),
      });

      const data = await res.json();
      console.log("Session POST 테스트 결과:", data);
      alert(`Session ID: ${data.session_id || "없음"}`);
    } catch (err) {
      console.error("Session POST 테스트 에러:", err);
      alert("Session 요청 실패! 콘솔 확인해줘.");
    }
  };

  /* ---------------- 캔버스 크기 자동 설정 ---------------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;

    const parent = canvas.parentElement;
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;

    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineWidth = 3;
    ctx.strokeStyle = "black";
    ctxRef.current = ctx;

    setStartTime(Date.now());
  }, []);

  /* ---------------- 🔥 figureId 변경될 때 캔버스 초기화 ---------------- */
  useEffect(() => {
    if (ctxRef.current && canvasRef.current) {
      ctxRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      setUndoStack([]);
    }
  }, [figureId]); // ← 그림 번호 바뀌면 캔버스 자동 초기화

  /* ---------------- 타이머 ---------------- */
  useEffect(() => {
    const timer = setInterval(() => {
      if (startTime)
        setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 500);
    return () => clearInterval(timer);
  }, [startTime]);

  /* ---------------- Undo 저장 ---------------- */
  const saveState = () => {
    const canvas = canvasRef.current;
    const data = canvas.toDataURL();
    setUndoStack((prev) => [...prev, data]);
  };

  const restoreLast = () => {
    const last = undoStack.pop();
    if (!last) return;

    const img = new Image();
    img.src = last;
    img.onload = () => {
      ctxRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      ctxRef.current.drawImage(img, 0, 0);
    };
    setUndoStack([...undoStack]);
  };

  /* ---------------- 드로잉 ---------------- */
  const startDrawing = ({ nativeEvent }) => {
    saveState();
    const { offsetX, offsetY } = nativeEvent;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = nativeEvent;

    if (mode === "pen") {
      ctxRef.current.globalCompositeOperation = "source-over";
      ctxRef.current.lineWidth = 4;
    } else if (mode === "erase") {
      ctxRef.current.globalCompositeOperation = "destination-out";
      ctxRef.current.lineWidth = 25;
    } else if (mode === "smallErase") {
      ctxRef.current.globalCompositeOperation = "destination-out";
      ctxRef.current.lineWidth = 10;
    }

    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();
  };

  const stopDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    ctxRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
  };

  /* ---------------- 업로드 (session_id + class_id 추가) ---------------- */
  const uploadImage = async () => {
    const canvas = canvasRef.current;

    console.log("업로드 직전 sessionId:", sessionId);
    console.log("업로드 직전 figureId:", figureId);

    canvas.toBlob(async (blob) => {
      const formData = new FormData();

      formData.append("image", blob, "drawing.png");
      formData.append("session_id", sessionId);
      formData.append("class_id", figureId);

      try {
        const res = await fetch("http://3.37.106.67:3000/figure/upload", {
          method: "POST",
          body: formData,
        });

        const raw = await res.text();
        console.log("업로드 응답 RAW:", raw);

        if (!res.ok) {
          alert("업로드 실패! 상태: " + res.status);
          return;
        }

        onNext();
      } catch (err) {
        console.error("업로드 실패:", err);
        alert("업로드 실패! 콘솔 확인해줘.");
      }
    }, "image/png");
  };

  /* ---------------- 커서 아이콘 ---------------- */
  const cursorStyle =
    mode === "pen"
      ? "url('/cursor-pen.png'), auto"
      : mode === "erase"
      ? "url('/eraser.png'), auto"
      : mode === "smallErase"
      ? "url('/cursor-small-eraser.png'), auto"
      : "default";

  /* ---------------- 버튼 디자인 ---------------- */
  const toolBtn = (active, color) =>
    `px-5 py-3 rounded-2xl text-lg font-semibold transition-all 
    ${active ? `${color} text-white shadow-xl scale-110` : "bg-gray-200 text-gray-700"}
    hover:scale-105`;

  const normalBtn =
    "px-5 py-3 bg-gray-300 rounded-2xl text-lg font-semibold shadow-sm hover:bg-gray-400 active:bg-gray-500 active:scale-95 transition-all";

  return (
    <div className="w-full flex flex-col items-center gap-5 p-6">

      <h2 className="text-3xl font-bold">왼쪽 도형을 따라 그려주세요</h2>
      <p className="text-xl text-gray-700">총 소요 시간: {elapsed}초</p>

      <div className="flex gap-3 items-center">

        {/* 🔹 세션 POST 테스트 버튼 */}
        <button
          onClick={testSession}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600"
        >
          Test Session POST
        </button>

        <button
          onClick={() => setMode("pen")}
          className={toolBtn(mode === "pen", "bg-blue-600")}
        >✏️ 펜</button>

        <button
          onClick={() => setMode("erase")}
          className={toolBtn(mode === "erase", "bg-red-600")}
        >🧽 큰 지우개</button>

        <button
          onClick={() => setMode("smallErase")}
          className={toolBtn(mode === "smallErase", "bg-red-500")}
        >🩹 정밀 지우개</button>

        <button onClick={clearCanvas} className={normalBtn}>전체 지우기</button>
        <button onClick={restoreLast} className={normalBtn}>🔙 되돌리기</button>
        <button onClick={onPrev} className={normalBtn}>◀ 이전</button>
        <button onClick={onNext} className={normalBtn}>다음 ▶</button>

        <button
          onClick={uploadImage}
          className="px-6 py-3 bg-green-500 text-white text-lg rounded-2xl font-bold shadow hover:bg-green-600"
        >
          제출하기
        </button>
      </div>

      <div className="flex w-full mt-4" style={{ height: "650px" }}>
        <div className="flex-1 flex justify-center items-center border-r bg-white">
          <img src={shapeImage} className="max-w-[80%] max-h-[80%] object-contain" />
        </div>

        <div ref={containerRef} className="flex-1 bg-white">
          <canvas
            ref={canvasRef}
            style={{ cursor: cursorStyle }}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            className="border rounded-lg bg-white w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
