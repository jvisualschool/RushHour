import { useState, useEffect, useCallback } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { RushHourPuzzle } from './utils/gameLogic';
import { GameBoard } from './components/GameBoard';
import { Button } from './components/Button';
import { puzzles, type Level } from './data/puzzles';
import { LevelSelect } from './components/LevelSelect';
import type { Direction } from './types/game';
import { sounds } from './utils/audio';
import { Confetti } from './components/Confetti';
import { FolderOpen, Volume2, VolumeX, Lightbulb, Flag, ExternalLink } from 'lucide-react';
import { HERO_CONFIGS, type HeroType } from './types/hero';
import clsx from 'clsx';

export type BoardTheme = 'asphalt' | 'dirt' | 'gravel' | 'sand' | 'wood' | 'basketball' | 'bathroom' | 'grass' | 'space' | 'cyber' | 'ascii';
export type Lang = 'ko' | 'en';

const T = {
  ko: {
    title: "러시 아워 <span class=\"font-light text-white\">Supreme</span>",
    directory: "레벨 목록",
    sound: "사운드",
    online: "해답",
    hint: "힌트",
    giveup: "기권",
    givingup: "해결 중...",
    moves: "이동 횟수",
    stats: {
      attempt: "시도",
      solved: "해결",
      time: "시간",
      total_moves: "누적 이동",
      attempt_unit: "회",
      solved_unit: "개",
      time_unit: "초",
      moves_unit: "회"
    },
    environment: "배경 테마",
    hero: "주인공 차량",
    reset: "미션 초기화",
    prev: "이전",
    next: "다음",
    instruction: "차량을 클릭하여 선택<br />방향키로 이동",
    win: {
      clear: "미션 성공! 🏆",
      giveup: "미션 포기 🏁",
      target: "표적 탈출 완료",
      moves: "총 {moves}회 이동하여 해결했습니다.",
      next: "다음 퍼즐"
    }
  },
  en: {
    title: "Rush Hour <span class=\"font-light text-white\">Supreme</span>",
    directory: "Directory",
    sound: "Sound",
    online: "Online",
    hint: "Hint",
    giveup: "Give Up",
    givingup: "Solving...",
    moves: "Moves Sequenced",
    stats: {
      attempt: "Attempt",
      solved: "Solved",
      time: "Time",
      total_moves: "Moves",
      attempt_unit: "",
      solved_unit: "",
      time_unit: "s",
      moves_unit: ""
    },
    environment: "Environment",
    hero: "Hero Vehicle",
    reset: "Reset Mission",
    prev: "Prev",
    next: "Next",
    instruction: "Click to select vehicle<br />Use arrow keys to move",
    win: {
      clear: "Clear! 🏆",
      giveup: "Mission Aborted 🏁",
      target: "Target Extracted",
      moves: "Mission completed in {moves} moves.",
      next: "Next Puzzle"
    }
  }
};

function App() {
  const [difficulty, setDifficulty] = useState<Level>('easy');
  const [levelIndex, setLevelIndex] = useState(0);
  const [theme, setTheme] = useState<BoardTheme>('asphalt');

  // Handle BGM: Random for normal themes, Retro (index 3) for ASCII theme
  useEffect(() => {
    const timer = setTimeout(() => {
      if (theme === 'ascii') {
        sounds.playBGM(3); // rushhour_bgm_04_retro.mp3
      } else {
        sounds.playRandomBGM();
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [difficulty, levelIndex, theme]);
  const [puzzle, setPuzzle] = useState(() => {
    const data = puzzles[difficulty][levelIndex];
    return data ? new RushHourPuzzle(data.board) : new RushHourPuzzle("6,6\nX,0,2,H,2");
  });
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [moveCount, setMoveCount] = useState(0);
  const [won, setWon] = useState(false);
  const [isManualMode, setIsManualMode] = useState(true);
  const [view, setView] = useState<'game' | 'levels'>('game');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);
  const [isAutoSolving, setIsAutoSolving] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [heroType, setHeroType] = useState<HeroType>('sports-car');
  const [lang, setLang] = useState<Lang>('ko');
  const [didGiveUp, setDidGiveUp] = useState(false);
  const [showSplash, setShowSplash] = useState(false);

  const t = T[lang];

  // Stats for Awards
  const [totalAttempted, setTotalAttempted] = useState(0);
  const [totalSolved, setTotalSolved] = useState(0);
  const [totalSuccessMoves, setTotalSuccessMoves] = useState(0);
  const [levelStartTime, setLevelStartTime] = useState(Date.now());

  useEffect(() => {
    setLevelStartTime(Date.now());
    setTotalAttempted(prev => prev + 1);
  }, [difficulty, levelIndex]);

  const loadLevel = useCallback((diff: Level, idx: number) => {
    const data = puzzles[diff][idx];
    if (!data) return;
    const newPuzzle = new RushHourPuzzle(data.board);
    setPuzzle(newPuzzle);
    setSelectedVehicle(null);
    setMoveCount(0);
    setWon(false);
    setDidGiveUp(false);
    setShowConfetti(false);
    setShowWinModal(false);
    setIsManualMode(true);
  }, []);

  useEffect(() => {
    loadLevel(difficulty, levelIndex);
  }, [difficulty, levelIndex, loadLevel]);


  const resetGame = useCallback(() => {
    loadLevel(difficulty, levelIndex);
  }, [difficulty, levelIndex, loadLevel]);

  const nextLevel = useCallback(() => {
    sounds.playNext();
    if (levelIndex < 19) {
      setLevelIndex(levelIndex + 1);
    } else if (difficulty === 'easy') {
      setDifficulty('medium');
      setLevelIndex(0);
    } else if (difficulty === 'medium') {
      setDifficulty('hard');
      setLevelIndex(0);
    } else {
      // All levels completed!
      resetGame();
    }
  }, [difficulty, levelIndex, resetGame]);

  const giveUp = useCallback(() => {
    if (isAutoSolving) return;

    setIsAutoSolving(true);
    setDidGiveUp(true);
    setSelectedVehicle(null);

    const solution = puzzle.solve();
    if (!solution) {
      alert('No solution found!');
      setIsAutoSolving(false);
      return;
    }

    let moveIndex = 0;
    let currentPuzzle = puzzle;

    const executeMove = () => {
      if (moveIndex >= solution.length) {
        setIsAutoSolving(false);
        return;
      }

      const { vehicleId, direction } = solution[moveIndex];
      const nextPuzzle = currentPuzzle.clone();

      if (nextPuzzle.moveVehicle(vehicleId, direction)) {
        currentPuzzle = nextPuzzle;
        setPuzzle(nextPuzzle);
        setMoveCount(prev => prev + 1);
        sounds.playMove(nextPuzzle.vehicles.find(v => v.id === vehicleId)?.length! >= 3);

        if (nextPuzzle.isGoal()) {
          setTotalSolved(prev => prev + 1);
          setTotalSuccessMoves(prev => prev + (moveCount + 1)); // including the last auto-move
          setWon(true);
          setShowConfetti(true);
          sounds.playWin();
          setIsAutoSolving(false);
          return;
        }
      }

      moveIndex++;
      setTimeout(executeMove, 300);
    };

    setTimeout(executeMove, 300);
  }, [puzzle, isAutoSolving, moveCount, levelStartTime]);

  const getHint = useCallback(() => {
    if (isAutoSolving || won) return;

    const solution = puzzle.solve();
    if (!solution || solution.length === 0) {
      alert('No solution found!');
      return;
    }

    const { vehicleId, direction } = solution[0];
    const newPuzzle = puzzle.clone();
    if (newPuzzle.moveVehicle(vehicleId, direction)) {
      setPuzzle(newPuzzle);
      setMoveCount(prev => prev + 1);
      sounds.playMove(newPuzzle.vehicles.find(v => v.id === vehicleId)?.length! >= 3);

      if (newPuzzle.isGoal()) {
        setWon(true);
        setShowConfetti(true);
        sounds.playWin();
      }
    }
  }, [puzzle, isAutoSolving, won]);

  const handleVehicleClick = useCallback((vehicleId: string) => {
    if (!isManualMode || won) return;
    setSelectedVehicle(prev => prev === vehicleId ? null : vehicleId);
  }, [isManualMode, won]);

  const moveVehicle = useCallback((direction: Direction) => {
    if (!selectedVehicle || !isManualMode || won) return;

    const newPuzzle = puzzle.clone();
    const moved = newPuzzle.moveVehicle(selectedVehicle, direction);

    if (moved) {
      setPuzzle(newPuzzle);
      setMoveCount(prev => prev + 1);

      const vehicle = puzzle.vehicles.find(v => v.id === selectedVehicle);
      sounds.playMove(vehicle ? vehicle.length >= 3 : false);

      if (newPuzzle.isGoal()) {
        setTotalSolved(prev => prev + 1);
        setTotalSuccessMoves(prev => prev + (moveCount + 1));
        setWon(true);
        setShowConfetti(true);
        sounds.playWin();
      }
    }
  }, [selectedVehicle, puzzle, isManualMode, won, levelStartTime, moveCount]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isManualMode || won) return;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          moveVehicle('left');
          break;
        case 'ArrowRight':
          e.preventDefault();
          moveVehicle('right');
          break;
        case 'ArrowUp':
          e.preventDefault();
          moveVehicle('up');
          break;
        case 'ArrowDown':
          e.preventDefault();
          moveVehicle('down');
          break;
        case 'Escape':
          setSelectedVehicle(null);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress, { passive: false });
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [moveVehicle, isManualMode, won]);

  return (
    <div className={clsx(
      "h-screen flex flex-col items-center p-4 md:p-8 overflow-x-hidden overflow-y-auto transition-all duration-500",
      theme === 'ascii' ? "bg-black text-[#00ff41] font-mono" : "bg-[#0a0a0f] text-white",
      view === 'game' ? "justify-start pt-4 md:pt-6" : "justify-start"
    )}>
      {/* Background Decorative Elements */}
      {theme !== 'ascii' && (
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[150px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[150px] rounded-full" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        </div>
      )}

      <m.div
        layout
        className="w-full max-w-[948px] mx-auto relative z-10"
      >
        <AnimatePresence mode="wait">
          {view === 'game' ? (
            <m.div
              key="game-view"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header */}
              <div className="flex flex-col items-center mb-5 gap-4">
                <div className="text-center">
                  <m.h1
                    className={clsx(
                      "text-5xl md:text-7xl font-black mb-1 tracking-tighter uppercase transition-all",
                      theme === 'ascii' ? "text-[#00ff41] drop-shadow-[0_0_10px_#00ff41]" : "text-white neon-text"
                    )}
                  >
                    <span className={clsx(theme !== 'ascii' && "bg-gradient-to-r from-red-500 via-orange-400 to-yellow-300 bg-clip-text text-transparent")}>
                      {lang === 'ko' ? '러시 아워' : 'Rush Hour'}
                    </span>
                    <span className="font-light text-white ml-2 md:ml-4">Supreme</span>
                  </m.h1>

                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {[
                    { id: 'levels', label: t.directory, icon: <FolderOpen size={16} />, onClick: () => setView('levels') },
                    { id: 'sound', label: t.sound, icon: isSoundOn ? <Volume2 size={16} /> : <VolumeX size={16} />, onClick: () => { setIsSoundOn(!isSoundOn); sounds.toggleBGM(); } },
                    { id: 'solution', label: t.online, icon: <ExternalLink size={16} />, onClick: () => window.open(puzzles[difficulty][levelIndex].solutionUrl, '_blank') },
                    { id: 'hint', label: t.hint, icon: <Lightbulb size={16} />, onClick: getHint, disabled: isAutoSolving || won },
                    { id: 'giveup', label: t.giveup, icon: <Flag size={16} />, onClick: giveUp, disabled: isAutoSolving || won }
                  ].map(btn => (
                    <button
                      key={btn.id}
                      onClick={btn.onClick}
                      disabled={btn.disabled}
                      className={clsx(
                        "px-5 py-2.5 rounded-xl border transition-all flex items-center gap-2 text-[11px] font-black uppercase tracking-[.3em] disabled:opacity-30",
                        theme === 'ascii'
                          ? "bg-black border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41]/20"
                          : clsx(
                            "bg-white/5 border-white/10 hover:bg-white/10",
                            btn.id === 'hint' && "bg-blue-500/10 border-blue-500/20 text-blue-400",
                            btn.id === 'giveup' && "bg-red-500/10 border-red-500/20 text-red-400"
                          )
                      )}
                    >
                      {btn.icon} {btn.id === 'giveup' && isAutoSolving ? t.givingup : btn.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Game Area */}
              <div className="flex flex-col xl:flex-row items-start justify-center gap-12 xl:gap-20">
                <m.div className="relative group">
                  {/* Board Background Glow */}
                  <div className="absolute inset-x-0 -bottom-10 h-20 bg-blue-500/20 blur-[100px] rounded-full scale-125 pointer-events-none" />

                  <GameBoard
                    puzzle={puzzle}
                    selectedVehicle={selectedVehicle}
                    onVehicleClick={handleVehicleClick}
                    onMove={moveVehicle}
                    theme={theme}
                    heroType={heroType}
                    won={won}
                  />

                  {/* New Button Layout below Board */}
                  <div className="mt-8 flex items-center justify-between gap-4 w-full relative z-10">
                    <button
                      onClick={() => setLevelIndex(prev => Math.max(0, prev - 1))}
                      disabled={levelIndex === 0}
                      className={clsx(
                        "flex-none px-6 py-3 rounded-xl border transition-all font-black uppercase tracking-widest text-[11px] disabled:opacity-20",
                        theme === 'ascii' ? "bg-black border-[#00ff41] text-[#00ff41]" : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                      )}
                    >
                      {t.prev}
                    </button>

                    <button
                      onClick={resetGame}
                      className={clsx(
                        "flex-1 py-3 rounded-xl border transition-all font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-2",
                        theme === 'ascii' ? "bg-black border-[#00ff41] text-[#00ff41]" : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                      )}
                    >
                      <span>🔄</span> {t.reset}
                    </button>

                    <button
                      onClick={() => setLevelIndex(prev => Math.min(19, prev + 1))}
                      disabled={levelIndex === 19}
                      className={clsx(
                        "flex-1 py-3 rounded-xl border transition-all font-black uppercase tracking-widest text-[11px] disabled:opacity-20",
                        theme === 'ascii' ? "bg-black border-[#00ff41] text-[#00ff41]" : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                      )}
                    >
                      {t.next}
                    </button>
                  </div>
                </m.div>

                {/* Controls Panel */}
                <div className="w-full lg:max-w-[340px] space-y-8">
                  {/* Stats Card */}
                  <div className={clsx(
                    "glass-strong rounded-xl p-8 border-white/5 shadow-2xl space-y-8 relative",
                    theme === 'ascii' && "border-[#00ff41]/30 bg-black"
                  )}>
                    {/* Level ID Badge & Lang Toggle Alignment - 줄 맞춤 최적화 */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={clsx(
                        "h-9 px-4 rounded-xl text-[10px] font-black tracking-widest uppercase shadow-lg flex items-center justify-center",
                        theme === 'ascii' ? "bg-black border border-[#00ff41] text-[#00ff41]" : "bg-yellow-400 text-black shadow-yellow-400/20"
                      )}>
                        {difficulty.toUpperCase()}-{String(levelIndex + 1).padStart(2, '0')}
                      </div>

                      <button
                        onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')}
                        className={clsx(
                          "h-9 px-4 rounded-xl border transition-all flex items-center gap-2 text-[11px] font-black uppercase tracking-widest",
                          theme === 'ascii' ? "bg-black border-[#00ff41] text-[#00ff41]" : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                        )}
                      >
                        <span className="opacity-70 text-base leading-none">🌐</span>
                        <span className="leading-none">{lang === 'ko' ? 'ENG' : '한글'}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                      <div className="text-center space-y-2">
                        <div className={clsx(
                          "font-black tracking-tighter leading-none transition-all flex items-baseline justify-center gap-1",
                          theme === 'ascii' ? "text-[#00ff41] drop-shadow-[0_0_15px_#00ff41]" : "text-white"
                        )}>
                          <span className="text-6xl">{moveCount}</span>
                          <span className={clsx(
                            "text-2xl transition-all",
                            theme === 'ascii' ? "text-[#00ff41]/40" : "text-white/20"
                          )}> / {puzzles[difficulty][levelIndex]?.minMoves || 20}</span>
                        </div>
                        <div className={clsx(
                          "text-[10px] font-black uppercase tracking-[0.3em]",
                          theme === 'ascii' ? "text-[#00ff41]/60" : "text-white/30"
                        )}>{t.moves}</div>
                      </div>
                    </div>



                    {/* Stats Grid - Multilingual */}
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { label: t.stats.attempt, value: totalAttempted, color: "text-white/40", unit: t.stats.attempt_unit },
                        { label: t.stats.solved, value: totalSolved, color: "text-emerald-400", unit: t.stats.solved_unit },
                        { label: t.stats.time, value: Math.floor((Date.now() - levelStartTime) / 1000), color: "text-white/40", unit: t.stats.time_unit },
                        { label: t.stats.total_moves, value: totalSuccessMoves, color: "text-yellow-400", unit: t.stats.moves_unit }
                      ].map((stat, i) => (
                        <div key={i} className="text-center p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                          <div className="text-[8px] font-black uppercase tracking-wider text-white/20">{stat.label}</div>
                          <div className={clsx("text-sm font-black tracking-tighter", stat.color)}>
                            {stat.value}{stat.unit}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className={clsx(
                      "rounded-xl p-6 border transition-all space-y-4",
                      theme === 'ascii' ? "bg-black border-[#00ff41] text-[#00ff41]" : "glass-strong border-white/5"
                    )}>
                      <h3 className={clsx(
                        "text-[10px] font-black uppercase tracking-[.3em] text-center",
                        theme === 'ascii' ? "text-[#00ff41]/60" : "text-white/30"
                      )}>{t.environment}</h3>
                      <div className="grid grid-cols-6 gap-2">
                        {(['asphalt', 'dirt', 'gravel', 'sand', 'wood', 'basketball', 'bathroom', 'grass', 'space', 'cyber', 'ascii'] as BoardTheme[]).map((t) => (
                          <button
                            key={t}
                            onClick={() => setTheme(t)}
                            title={t}
                            className={clsx(
                              "w-full aspect-square rounded-lg transition-all border-2",
                              theme === t ? "border-white scale-110 shadow-lg" : "border-white/10 hover:border-white/30"
                            )}
                            style={{
                              background: t === 'asphalt' ? '#1a1a1a' :
                                t === 'dirt' ? '#5d4037' :
                                  t === 'gravel' ? '#757575' :
                                    t === 'sand' ? '#fbc02d' :
                                      t === 'wood' ? '#8d6e63' :
                                        t === 'basketball' ? '#e64a19' :
                                          t === 'bathroom' ? '#cfd8dc' :
                                            t === 'grass' ? '#388e3c' :
                                              t === 'space' ? '#1a237e' :
                                                t === 'cyber' ? '#d32f2f' :
                                                  '#00ff41' // ascii
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Hero Vehicle Selector - Height Reduced */}
                    <div className={clsx(
                      "rounded-xl p-4 border transition-all",
                      theme === 'ascii' ? "bg-black border-[#00ff41] text-[#00ff41] space-y-2" : "glass-strong border-white/5 space-y-2"
                    )}>
                      <h3 className={clsx(
                        "text-[10px] font-black uppercase tracking-[.3em] text-center",
                        theme === 'ascii' ? "text-[#00ff41]/60" : "text-white/30"
                      )}>{t.hero}</h3>
                      <div className="grid grid-cols-5 gap-2">
                        {(Object.keys(HERO_CONFIGS) as HeroType[]).map((type) => {
                          const config = HERO_CONFIGS[type];
                          return (
                            <button
                              key={type}
                              onClick={() => setHeroType(type)}
                              title={config.name}
                              className={clsx(
                                "aspect-square rounded-lg transition-all border flex items-center justify-center p-2",
                                heroType === type
                                  ? (theme === 'ascii' ? "border-[#00ff41] bg-[#00ff41]/20 scale-110 shadow-[0_0_10px_#00ff4122]" : "border-white/40 bg-white/10 scale-105 shadow-xl")
                                  : "border-white/5 hover:border-white/10"
                              )}
                            >
                              <div className="text-2xl drop-shadow-md">{config.emoji}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                  </div>


                </div>
              </div>

            </m.div>
          ) : (
            <m.div
              key="levels-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="relative w-full flex flex-col items-center"
            >
              <LevelSelect
                currentDifficulty={difficulty}
                currentIndex={levelIndex}
                theme={theme}
                onBack={() => setView('game')}
                onSelect={(d, i) => {
                  setDifficulty(d);
                  setLevelIndex(i);
                  setView('game');
                }}
              />
            </m.div>
          )}
        </AnimatePresence>

        {/* Confetti Celebration */}
        <AnimatePresence>
          {showConfetti && (
            <Confetti onComplete={() => {
              setShowConfetti(false);
              setShowWinModal(true);
            }} />
          )}
        </AnimatePresence>

        {/* Win Modal */}
        <AnimatePresence>
          {showWinModal && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-2xl flex items-center justify-center z-[100] p-6"
              onClick={nextLevel}
            >
              <m.div
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="glass-strong rounded-xl p-16 max-w-xl w-full text-center border-white/10 relative overflow-hidden shadow-[0_0_100px_rgba(234,179,8,0.2)]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />

                <m.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="text-9xl mb-12 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                >
                  🏁
                </m.div>

                <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white via-yellow-400 to-white bg-clip-text text-transparent tracking-tighter uppercase whitespace-nowrap">
                  {didGiveUp ? t.win.giveup : t.win.clear}
                </h2>

                <div className="space-y-2 mb-16">
                  <p className="text-white/40 text-sm font-bold tracking-[0.4em] uppercase">{t.win.target}</p>
                  <p className="text-white text-xl font-light">
                    {t.win.moves.replace('{moves}', String(moveCount))}
                  </p>
                </div>

                <Button onClick={nextLevel} className="w-full rounded-[2rem] py-8 bg-yellow-400 hover:bg-yellow-300 text-black text-[20px] font-black uppercase tracking-[0.3em] transition-all shadow-2xl hover:scale-105 active:scale-95 border-none">
                  {t.win.next}
                </Button>
              </m.div>
            </m.div>
          )}
        </AnimatePresence>
        {/* Splash Modal */}
        <AnimatePresence>
          {showSplash && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
              onClick={() => setShowSplash(false)}
            >
              <m.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-lg w-full aspect-square rounded-3xl overflow-hidden shadow-2xl border border-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Background Image */}
                <img
                  src="splash.jpg"
                  alt="Splash"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="space-y-4">
                    <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">
                      Rush Hour <span className="font-light not-italic">Supreme</span>
                    </h2>

                    <div className="h-[1px] w-full bg-white/20" />

                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-white/80 text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <span className="text-xs opacity-50 uppercase tracking-widest font-black">Stack</span>
                        <span>React • TypeScript • Framer Motion • Tailwind CSS</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs opacity-50 uppercase tracking-widest font-black">Author</span>
                        <a href="mailto:jvisualschool@gmail.com" className="hover:underline text-white">Jinho Jung</a>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs opacity-50 uppercase tracking-widest font-black">Version</span>
                        <span>v1.0.4 • 2026.1</span>
                      </div>
                    </div>

                    <p className="text-white/50 text-[10px] uppercase tracking-[0.3em] font-black pt-2">
                      Click anywhere outside or on the image to close
                    </p>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setShowSplash(false)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all hover:scale-110 active:scale-90"
                >
                  ✕
                </button>
              </m.div>
            </m.div>
          )}
        </AnimatePresence>
      </m.div>

      {/* Footer */}
      <footer className="w-full mt-auto pt-8">
        <div className={clsx(
          "max-w-[948px] mx-auto backdrop-blur-md border rounded-2xl py-5 px-6 transition-all",
          theme === 'ascii' ? "bg-black border-[#00ff41] text-[#00ff41]" : "bg-black/60 border-white/5 text-white/40"
        )}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div
                className="font-black uppercase tracking-wider text-sm cursor-pointer hover:opacity-80 transition-all hover:scale-105 active:scale-95 group"
                onClick={() => setShowSplash(true)}
              >
                <span className={theme === 'ascii' ? "text-[#00ff41]" : "text-white/60 group-hover:text-white"}>Rush Hour Supreme</span>
              </div>
              <div className={clsx("hidden md:block w-[1px] h-4", theme === 'ascii' ? "bg-[#00ff41]/30" : "bg-white/10")} />
              <div className="text-[11px] tracking-wide">
                React • TypeScript • Framer Motion • Tailwind CSS
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-[11px]">
                Created by <a href="mailto:jvisualschool@gmail.com" className={clsx("hover:underline transition-all font-bold", theme === 'ascii' ? "text-[#00ff41]" : "text-white/60")}>Jinho Jung</a>
              </div>
              <div className={clsx("hidden md:block w-[1px] h-4", theme === 'ascii' ? "bg-[#00ff41]/30" : "bg-white/10")} />
              <div className="text-[11px] font-mono">
                v1.0.4 • 2026.1
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
