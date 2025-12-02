import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  PencilRuler,
  LogIn,
  UserPlus,
  Shield,
  Star,
  ChevronRight,
} from "lucide-react";

import ResultPage from "./components/ResultPage";
import DrawingPage from "./components/DrawingPage";   // 🔥 추가!
import shape1 from "./assets/shape1.png";

/* ---------- 라우터 루트 ---------- */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 랜딩 페이지 */}
        <Route path="/" element={<LandingPage />} />

        {/*  도형 페이지 (1번~9번) */}
        <Route path="/draw/:id" element={<DrawingPage />} />

        {/* 기존 draw는 shape1만 보여주던 테스트용 → 필요시 삭제 가능 */}
        <Route path="/draw" element={<DrawingPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

/* ---------- 랜딩 페이지 ---------- */
function LandingPage() {
  const [showAuth, setShowAuth] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60 border-b border-white/10">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#home" className="flex items-center gap-2 text-white">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/20 ring-1 ring-indigo-400/40">
              <PencilRuler className="h-5 w-5 text-indigo-300" />
            </span>
            <span className="text-lg font-semibold tracking-tight">
              BGT Insight
            </span>
          </a>

          <div className="hidden gap-2 sm:flex">
            <button
              onClick={() => setShowAuth("login")}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2 text-sm font-medium hover:bg-white/5"
            >
              <LogIn className="h-4 w-4" /> 로그인
            </button>
            <button
              onClick={() => setShowAuth("signup")}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              <UserPlus className="h-4 w-4" /> 회원가입
            </button>
          </div>
        </nav>
      </header>

      <section
        id="home"
        className="relative mx-auto max-w-6xl px-6 pt-14 pb-16 sm:pt-20 sm:pb-24"
      >
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="pointer-events-none absolute left-1/2 top-[-10%] h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-3xl" />
        </div>

        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl"
            >
              종이에서 디지털로:
              <span className="block bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                BGT 검사 결과를 더 선명하게
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-5 max-w-prose text-base text-slate-300 sm:text-lg"
            >
              BGT(Bender-Gestalt Test)는 시각-운동 통합 능력과 신경심리적 기능을
              평가하는 도형 복사 검사입니다.
              <span className="block mt-2" />
              <strong className="text-slate-100">BGT Insight</strong>는 디지털
              채점, 결과 리포트, 추적 분석을 제공하여 검사자의 주관을 줄이고
              일관된 해석을 돕습니다.
            </motion.p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShowAuth("signup")}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold hover:bg-indigo-500"
              >
                무료로 시작하기 <ChevronRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => setShowAuth("login")}
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-sm font-medium hover:bg-white/5"
              >
                이미 계정이 있어요
              </button>
            </div>

            <div className="mt-6 flex items-center gap-4 text-xs text-slate-400">
              <div className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5">
                <Shield className="h-3.5 w-3.5" /> 개인정보는 안전하게
                암호화됩니다.
              </div>
              <div className="inline-flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5" /> 베타 버전 · 계속 업데이트 중
              </div>
            </div>
          </div>

          {/* 우측 미리보기 카드 그대로 유지 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="relative"
          >
            <div className="mx-auto w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-4 shadow-2xl shadow-indigo-900/20">
              <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div className="text-sm font-medium text-slate-200">
                    BGT 디지털 채점 미리보기
                  </div>
                  <span className="text-[10px] text-slate-400">샘플</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    "정확도",
                    "선의 안정성",
                    "공간 배치",
                    "각도 일치",
                    "비율 유지",
                    "세부 묘사",
                  ].map((k, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-white/10 bg-slate-800/50 p-3"
                    >
                      <div className="text-[11px] text-slate-300">{k}</div>
                      <div className="mt-1 text-lg font-semibold text-indigo-300">
                        {80 + ((i * 7) % 15)}%
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-lg bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 p-3 text-xs text-slate-300">
                  * 실제 결과는 연령, 표준화 지표, 관찰 메모 등을 반영하여
                  종합 산출됩니다.
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-10 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} BGT Insight — 학습/연구용 데모 UI
      </footer>

      {showAuth && (
        <AuthModal
          mode={showAuth}
          onClose={() => setShowAuth(null)}
          onSwitch={(m) => setShowAuth(m)}
        />
      )}
    </div>
  );
}

/* ---------- 인증 모달: 제출하면 /draw/1로 이동 ---------- */
function AuthModal({ mode, onClose, onSwitch }) {
  const isLogin = mode === "login";
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">
            {isLogin ? "로그인" : "회원가입"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg border border-white/10 px-2 py-1 text-xs text-slate-300 hover:bg-white/5"
          >
            닫기
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onClose();
            navigate("/draw/1"); // 🔥 로그인하면 바로 도형 1번으로 이동
          }}
          className="space-y-4"
        >
          {!isLogin && (
            <div>
              <label className="mb-1 block text-sm text-slate-300">이름</label>
              <input
                name="name"
                type="text"
                required
                placeholder="홍길동"
                className="w-full rounded-xl border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}

          <div>
            <label className="mb-1 block text-sm text-slate-300">이메일</label>
            <input
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-xl border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-slate-300">비밀번호</label>
            <input
              name="password"
              type="password"
              required
              placeholder="6자 이상"
              minLength={6}
              className="w-full rounded-xl border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {!isLogin && (
            <div>
              <label className="mb-1 block text-sm text-slate-300">
                비밀번호 확인
              </label>
              <input
                name="confirm"
                type="password"
                required
                minLength={6}
                className="w-full rounded-xl border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}

          <button
            type="submit"
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            {isLogin ? (
              <>
                <LogIn className="h-4 w-4" /> 로그인
              </>
            ) : (
              <>
                <UserPlus className="h-4 w-4" /> 회원가입
              </>
            )}
          </button>

          <p className="pt-2 text-center text-xs text-slate-400">
            {isLogin ? (
              <>
                계정이 없나요?
                <button
                  type="button"
                  onClick={() => onSwitch("signup")}
                  className="text-indigo-300 underline underline-offset-4"
                >
                  회원가입
                </button>
              </>
            ) : (
              <>
                이미 계정이 있나요?
                <button
                  type="button"
                  onClick={() => onSwitch("login")}
                  className="text-indigo-300 underline underline-offset-4"
                >
                  로그인
                </button>
              </>
            )}
          </p>
        </form>
      </motion.div>
    </div>
  );
}
