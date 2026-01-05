import { m } from 'framer-motion';
import { type Level, puzzles } from '../data/puzzles';
import { RushHourPuzzle } from '../utils/gameLogic';
import { ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import { useState } from 'react';
import { type BoardTheme } from '../App';

interface LevelSelectProps {
    onSelect: (difficulty: Level, index: number) => void;
    onBack?: () => void;
    currentDifficulty: Level;
    currentIndex: number;
    theme?: BoardTheme;
}

const MINI_CELL = 12;

export function LevelSelect({ onSelect, onBack, currentDifficulty, currentIndex, theme }: LevelSelectProps) {
    const [activeTab, setActiveTab] = useState<Level>(currentDifficulty);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.02 }
        }
    };

    const item = {
        hidden: { scale: 0.9, opacity: 0 },
        show: { scale: 1, opacity: 1 }
    };

    return (
        <div className="w-full max-w-7xl mx-auto py-12 px-6">
            {/* Page Header */}
            <div className="mb-12">
                <div className="flex items-center gap-6 mb-4">
                    {onBack && (
                        <button
                            onClick={onBack}
                            className={clsx(
                                "px-6 py-3 rounded-xl shadow-2xl hover:scale-105 active:scale-95 transition-all font-black text-xs uppercase tracking-wider flex items-center gap-2",
                                theme === 'ascii' ? "bg-black border border-[#00ff41] text-[#00ff41]" : "bg-white text-black"
                            )}
                        >
                            <span>←</span> BACK
                        </button>
                    )}
                    <m.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={clsx(
                            "text-5xl font-black tracking-tighter uppercase italic",
                            theme === 'ascii' ? "text-[#00ff41]" : "text-white"
                        )}
                    >
                        Mission Hub
                    </m.h2>
                </div>
                <div className="flex items-center gap-4 mt-2">
                    <p className={clsx(
                        "text-xs font-bold tracking-[0.5em] uppercase",
                        theme === 'ascii' ? "text-[#00ff41]/60" : "text-white/40"
                    )}>Select Your Tactical Sector</p>
                    <div className={clsx(
                        "h-[1px] w-20 bg-gradient-to-r",
                        theme === 'ascii' ? "from-[#00ff41]/60 to-transparent" : "from-gray-600 to-transparent"
                    )} />
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex justify-center mb-12">
                <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10 gap-2">
                    {(['easy', 'medium', 'hard'] as Level[]).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={clsx(
                                "px-10 py-4 rounded-xl text-xs font-black uppercase tracking-[0.3em] transition-all relative overflow-hidden",
                                activeTab === tab
                                    ? tab === 'easy' ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/30" :
                                        tab === 'medium' ? "bg-yellow-500 text-black shadow-lg shadow-yellow-500/30" :
                                            "bg-red-500 text-black shadow-lg shadow-red-500/30"
                                    : "text-white/40 hover:text-white/70 hover:bg-white/5"
                            )}
                        >
                            <span className="relative z-10">{tab}</span>
                            {activeTab === tab && (
                                <m.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 -z-0"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Level Grid */}
            <m.div
                key={activeTab}
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
            >
                {puzzles[activeTab].map((puzzleData, idx) => {
                    const miniPuzzle = new RushHourPuzzle(puzzleData.board);
                    const isSelected = activeTab === currentDifficulty && idx === currentIndex;

                    return (
                        <m.div
                            key={`${activeTab} -${idx} `}
                            variants={item}
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onSelect(activeTab, idx)}
                            className={clsx(
                                "glass-strong rounded-3xl p-5 cursor-pointer border transition-all relative group overflow-hidden",
                                isSelected ? "border-yellow-400 bg-yellow-400/5 shadow-[0_0_30px_rgba(234,179,8,0.2)]" : "border-white/5 hover:border-white/20 bg-white/5"
                            )}
                        >
                            {/* Card Header */}
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-[10px] font-black text-white/30 tracking-widest uppercase">{activeTab}-{idx + 1}</span>
                                {isSelected && (
                                    <div className="w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(234,179,8,1)] animate-pulse" />
                                )}
                            </div>

                            {/* Miniature Board */}
                            <div className="flex justify-center mb-4">
                                <div
                                    className="grid gap-[1px] p-1 bg-black/40 rounded-lg"
                                    style={{
                                        gridTemplateColumns: `repeat(${miniPuzzle.boardWidth}, 1fr)`,
                                        width: miniPuzzle.boardWidth * MINI_CELL + miniPuzzle.boardWidth,
                                    }}
                                >
                                    {miniPuzzle.board.map((row, r) =>
                                        row.map((cell, c) => {
                                            const isTarget = cell === 'X';
                                            const isVehicle = cell !== ' ' && cell !== '#';

                                            return (
                                                <div
                                                    key={`${r} -${c} `}
                                                    className={clsx(
                                                        "rounded-[1px]",
                                                        isTarget ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" :
                                                            isVehicle ? "bg-white/30" : "bg-white/[0.03]"
                                                    )}
                                                    style={{ width: MINI_CELL, height: MINI_CELL }}
                                                />
                                            );
                                        })
                                    )}
                                </div>
                            </div>

                            {/* Card Footer */}
                            <div className="flex items-center justify-between">
                                <div className="text-xl font-black text-white italic">LV.{idx + 1}</div>
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/20 transition-all">
                                    <ChevronRight size={16} className="text-white/40 group-hover:text-white" />
                                </div>
                            </div>

                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-3xl" />
                        </m.div>
                    );
                })}
            </m.div>

            {/* Stats Footer */}
            <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-16 pt-8 border-t border-white/5 flex flex-wrap gap-12 justify-center text-white/20 hover:text-white/60 transition-all duration-500"
            >
                <div className="text-center">
                    <div className="text-xs font-black uppercase tracking-[.4em]">Sector</div>
                    <div className="text-2xl font-black tracking-tighter mt-1">{activeTab.toUpperCase()}</div>
                </div>
                <div className="text-center">
                    <div className="text-xs font-black uppercase tracking-[.4em]">Missions</div>
                    <div className="text-2xl font-black tracking-tighter mt-1">20</div>
                </div>
                <div className="text-center">
                    <div className="text-xs font-black uppercase tracking-[.4em]">Status</div>
                    <div className="text-2xl font-black tracking-tighter mt-1">READY</div>
                </div>
            </m.div>
        </div>
    );
}
