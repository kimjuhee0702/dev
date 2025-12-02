import { useLocation, useNavigate } from "react-router-dom";

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // DrawingCanvas에서 navigate("/result", { state: responseData })로 전달됨
  const result = location.state;

  if (!result) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-slate-900 text-white">
        <p className="text-lg">결과 데이터가 없습니다.</p>
        <button
          onClick={() => navigate("/draw")}
          className="mt-4 px-4 py-2 bg-indigo-600 rounded-lg"
        >
          다시 검사하기
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">BGT 검사 결과</h1>

      <div className="w-full max-w-xl bg-slate-800 p-6 rounded-xl shadow-xl border border-white/10">

        <div className="flex justify-between mb-4">
          <p className="text-lg font-semibold">점수</p>
          <p className="text-2xl font-bold text-indigo-400">{result.score}</p>
        </div>

        <div className="flex justify-between mb-6">
          <p className="text-lg font-semibold">등급</p>
          <p className="text-2xl font-bold text-cyan-400">{result.grade}</p>
        </div>

        <h2 className="text-xl font-semibold mb-3">세부 분석</h2>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span>도형 정확도</span>
            <span className="font-semibold">{(result.details.shape_accuracy * 100).toFixed(1)}%</span>
          </div>

          <div className="flex justify-between">
            <span>선의 부드러움</span>
            <span className="font-semibold">{(result.details.line_smoothness * 100).toFixed(1)}%</span>
          </div>

          <div className="flex justify-between">
            <span>대칭성</span>
            <span className="font-semibold">{(result.details.symmetry_score * 100).toFixed(1)}%</span>
          </div>
        </div>

        <button
          onClick={() => navigate("/draw")}
          className="mt-8 w-full bg-indigo-600 hover:bg-indigo-500 py-3 rounded-xl font-semibold"
        >
          다시 검사하기
        </button>

      </div>
    </div>
  );
}