import { m } from 'framer-motion';
import { RushHourPuzzle } from '../utils/gameLogic';
import type { Vehicle, Direction } from '../types/game';
import clsx from 'clsx';

import { type BoardTheme } from '../App';
import { HERO_CONFIGS, type HeroType } from '../types/hero';
import { LogOut } from 'lucide-react';

interface GameBoardProps {
  puzzle: RushHourPuzzle;
  selectedVehicle: string | null;
  onVehicleClick: (vehicleId: string) => void;
  onMove: (direction: Direction) => void;
  theme: BoardTheme;
  heroType: HeroType;
  won: boolean;
}

const CELL_SIZE = 80;

const themeStyles: Record<BoardTheme, { bg: string, pattern?: string, lineOpacity: number }> = {
  asphalt: { bg: '#0f0f15', pattern: 'radial-gradient(circle, #ffffff05 1px, transparent 1px)', lineOpacity: 0.03 },
  dirt: { bg: '#4e342e', pattern: 'url("https://www.transparenttextures.com/patterns/dust.png")', lineOpacity: 0.1 },
  gravel: { bg: '#616161', pattern: 'url("https://www.transparenttextures.com/patterns/gravel.png")', lineOpacity: 0.15 },
  sand: { bg: '#fdd835', pattern: 'url("https://www.transparenttextures.com/patterns/sandpaper.png")', lineOpacity: 0.2 },
  wood: { bg: '#5d4037', pattern: 'url("https://www.transparenttextures.com/patterns/wood-pattern.png")', lineOpacity: 0.1 },
  basketball: { bg: '#e64f2a', pattern: 'linear-gradient(90deg, #ffffff11 1px, transparent 1px), linear-gradient(#ffffff11 1px, transparent 1px)', lineOpacity: 0.3 },
  bathroom: { bg: '#e0e0e0', pattern: 'linear-gradient(90deg, #00000011 2px, transparent 2px), linear-gradient(#00000011 2px, transparent 2px)', lineOpacity: 0.4 },
  grass: { bg: '#2e7d32', pattern: 'url("https://www.transparenttextures.com/patterns/grass.png")', lineOpacity: 0.1 },
  space: { bg: '#0d1117', pattern: 'radial-gradient(circle, #ffffff22 1px, transparent 1px)', lineOpacity: 0.05 },
  cyber: { bg: '#000000', pattern: 'linear-gradient(90deg, #00f2ff22 1px, transparent 1px), linear-gradient(#00f2ff22 1px, transparent 1px)', lineOpacity: 0.2 },
  ascii: { bg: '#000000', pattern: 'linear-gradient(90deg, #00ff4111 1px, transparent 1px), linear-gradient(#00ff4111 1px, transparent 1px)', lineOpacity: 0.5 },
};

export function GameBoard({ puzzle, selectedVehicle, onVehicleClick, onMove, theme, heroType, won }: GameBoardProps) {
  const currentTheme = themeStyles[theme];
  const heroConfig = HERO_CONFIGS[heroType];

  const getVehicleStyle = (vehicle: Vehicle) => {
    const isHorizontal = vehicle.orientation === 'H';
    const width = isHorizontal ? vehicle.length * CELL_SIZE : CELL_SIZE;
    const height = isHorizontal ? CELL_SIZE : vehicle.length * CELL_SIZE;
    const x = vehicle.col * CELL_SIZE;
    const y = vehicle.row * CELL_SIZE;

    return { width, height, x, y };
  };

  const getVehicleColor = (vehicle: Vehicle) => {
    if (vehicle.id === 'X') return heroConfig.gradient; // Hero vehicle uses selected hero gradient
    if (vehicle.length === 3) return 'from-purple-500 to-purple-700'; // Truck
    if (['A', 'C', 'E'].includes(vehicle.id)) return 'from-blue-500 to-blue-700';
    if (['J', 'L', 'K'].includes(vehicle.id)) return 'from-yellow-400 to-yellow-600 outline-yellow-400';
    return 'from-emerald-500 to-emerald-700';
  };

  const redCar = puzzle.vehicles.find(v => v.id === 'X');
  const exitRow = redCar?.row ?? 2;

  return (
    <div className={clsx(
      "relative p-6 rounded-xl shadow-2xl transition-colors duration-500",
      theme === 'ascii' ? "bg-black border-2 border-[#00ff41]/50 shadow-[0_0_30px_#00ff4133]" : "bg-[#1a1a24] border-white/5"
    )}>

      {/* Grid Canvas */}
      <div
        className="relative rounded-xl overflow-hidden transition-colors duration-500"
        style={{
          width: puzzle.boardWidth * CELL_SIZE,
          height: puzzle.boardHeight * CELL_SIZE,
          backgroundColor: currentTheme.bg,
          backgroundImage: currentTheme.pattern,
          backgroundSize: theme === 'bathroom' || theme === 'cyber' || theme === 'basketball' ? `${CELL_SIZE}px ${CELL_SIZE}px` : 'auto'
        }}
      >
        {/* Helper Grid Lines */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
            backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`,
            opacity: currentTheme.lineOpacity
          }}
        />

        {/* Walls - Pillars/Obstacles Rendering */}
        {puzzle.walls.map(([r, c]) => (
          <m.div
            key={`wall-${r}-${c}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={clsx(
              "absolute flex items-center justify-center z-20",
              theme === 'ascii' ? "bg-black border-2 border-[#00ff41] text-[#00ff41]" : "rounded-xl shadow-2xl overflow-hidden"
            )}
            style={{
              top: r * CELL_SIZE + 4,
              left: c * CELL_SIZE + 4,
              width: CELL_SIZE - 8,
              height: CELL_SIZE - 8,
              backgroundColor: theme === 'ascii' ? undefined : (theme === 'space' ? '#1a1a2e' : '#141418'),
              border: theme === 'ascii' ? undefined : '2px solid rgba(255,255,255,0.08)'
            }}
          >
            {theme !== 'ascii' && (
              <div className="w-full h-full relative flex flex-col items-center justify-center">
                {/* Industrial Pillar Pattern (4 dots) */}
                <div className="grid grid-cols-2 gap-6 p-4 w-full h-full">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-2.5 h-2.5 rounded-full bg-white/5 border border-white/10 shadow-[inner_0_1px_2px_rgba(0,0,0,0.5)]" />
                  ))}
                </div>
                {/* Subtle Pillar Texture/Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                  <span className="text-2xl filter grayscale">🧱</span>
                </div>
              </div>
            )}
            {theme === 'ascii' && <span className="text-2xl font-black">#</span>}
          </m.div>
        ))}

        {/* Animated Exit Portal */}
        <div
          className="absolute right-0 z-0 flex items-center"
          style={{
            top: exitRow * CELL_SIZE,
            height: CELL_SIZE,
            width: 40,
            right: -10,
          }}
        >
          {/* Main Portal Beam */}
          <m.div
            animate={{
              opacity: [0.4, 0.8, 0.4],
              scaleX: [1, 1.2, 1]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full bg-gradient-to-l from-emerald-400 via-emerald-500/50 to-transparent blur-sm"
          />

          {/* Energy Stripes */}
          <div className="absolute inset-0 overflow-hidden flex flex-col justify-around py-2">
            {[1, 2, 3].map((i) => (
              <m.div
                key={i}
                animate={{ x: [-20, 40], opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }}
                className="h-1 w-8 bg-white/40 rounded-full"
              />
            ))}
          </div>

          {/* Goal Text Tag */}
          <div className="absolute -right-2 transform translate-x-full">
            <m.div
              animate={won ? { scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] } : { x: [0, 5, 0] }}
              transition={won ? { duration: 0.5, repeat: Infinity } : { duration: 2, repeat: Infinity }}
              className={clsx(
                "text-[10px] font-black px-2 py-1 rounded-md shadow-[0_0_20px_rgba(16,185,129,0.5)] whitespace-nowrap transition-all",
                won ? "bg-yellow-400 text-black scale-150" : "bg-emerald-500 text-black"
              )}
            >
              {won ? "LEVEL CLEAR! 🏆" : "GOAL 🏁"}
            </m.div>
          </div>
        </div>

        {/* Vehicles */}
        {puzzle.vehicles.map((vehicle) => {
          const style = getVehicleStyle(vehicle);
          const isSelected = selectedVehicle === vehicle.id;
          const isHorizontal = vehicle.orientation === 'H';
          const colorClass = getVehicleColor(vehicle);

          return (
            <m.div
              key={vehicle.id}
              layoutId={vehicle.id}
              initial={false}
              animate={{
                x: style.x,
                y: style.y,
              }}
              transition={{
                type: 'tween',
                ease: 'easeOut',
                duration: 0.1,
              }}
              onClick={() => onVehicleClick(vehicle.id)}
              className={clsx(
                'absolute cursor-pointer flex items-center justify-center p-1',
                isSelected ? 'z-50' : 'z-10'
              )}
              style={{
                width: style.width,
                height: style.height,
              }}
            >
              {/* Prototype Block Style */}
              <div className={clsx(
                "relative w-full h-full flex items-center justify-center transition-all",
                theme === 'ascii'
                  ? clsx(
                    "font-mono transition-all",
                    vehicle.id === 'X'
                      ? "bg-[#00ff41] text-white border-2 border-[#00ff41] shadow-[0_0_15px_#00ff41]"
                      : "bg-black border border-[#00ff41] text-[#00ff41]",
                    isSelected && "shadow-[0_0_15px_#00ff41] z-50 border-2"
                  )
                  : clsx(
                    "rounded-xl shadow-lg border-b-4 border-black/20 bg-gradient-to-br",
                    colorClass,
                    isSelected && "ring-4 ring-white/30"
                  )
              )}>
                {/* Visual Glass/Windshield Indicator - Hidden in ASCII or for Hero 'X' */}
                {theme !== 'ascii' && vehicle.id !== 'X' && (
                  <div className={clsx(
                    "absolute bg-black/20 rounded-md",
                    isHorizontal ? "w-1/3 h-2/3 right-2" : "w-2/3 h-1/3 bottom-2"
                  )} />
                )}

                {/* Vehicle Label - Improved ASCII Car Style */}
                {theme === 'ascii' ? (
                  <div className="flex flex-col items-center justify-center font-mono text-sm leading-none">
                    {isHorizontal ? (
                      <div className="whitespace-nowrap flex items-center gap-1">
                        <span className="opacity-40">[</span>
                        <span className="opacity-20">■■</span>
                        <span className={clsx(
                          "font-black px-1",
                          vehicle.id === 'X' ? "text-white" : "text-[#00ff41]"
                        )}>{vehicle.id}</span>
                        <span className="opacity-20">■■</span>
                        <span className="opacity-40">]</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-1">
                        <span className="opacity-40">^</span>
                        <span className="opacity-20">■</span>
                        <span className={clsx(
                          "font-black py-0.5",
                          vehicle.id === 'X' ? "text-white" : "text-[#00ff41]"
                        )}>{vehicle.id}</span>
                        <span className="opacity-20">■</span>
                        <span className="opacity-40">v</span>
                      </div>
                    )}
                  </div>
                ) : (
                  vehicle.id === 'X' ? (
                    <span className={clsx(
                      "text-4xl pointer-events-none z-10 drop-shadow-lg transform inline-block scale-[1.15]",
                      "-scale-x-100", // Flip emoji
                      heroType === 'bicycle' && "scale-[1.35]" // Increase size for bicycle (approx 1.2 * 1.15)
                    )}>
                      {heroConfig.emoji}
                    </span>
                  ) : (
                    <span className="text-white/30 font-black text-xs pointer-events-none z-10">
                      {vehicle.id}
                    </span>
                  )
                )}

                {/* Move Hints & Controls */}
                {isSelected && (
                  <div className="absolute inset-0 flex items-center justify-center z-50">
                    <div className={clsx("flex gap-10", isHorizontal ? "flex-row" : "flex-col")}>
                      {(isHorizontal ? ['left' as Direction, 'right' as Direction] : ['up' as Direction, 'down' as Direction]).map((dir) => {
                        const canMove = puzzle.canMove(vehicle.id, dir);
                        return (
                          <m.button
                            key={dir}
                            whileHover={canMove ? { scale: 1.3, backgroundColor: 'rgba(255,255,255,0.4)' } : {}}
                            whileTap={canMove ? { scale: 0.9 } : {}}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (canMove) onMove(dir);
                            }}
                            disabled={!canMove}
                            className={clsx(
                              "w-12 h-12 rounded-xl flex items-center justify-center text-3xl font-black transition-all border-2",
                              canMove
                                ? "bg-white/20 border-white/60 text-white shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)]"
                                : "opacity-10 bg-black/40 border-transparent text-transparent pointer-events-none"
                            )}
                          >
                            <m.span
                              animate={canMove ? (dir === 'left' ? { x: [-3, 3] } : dir === 'right' ? { x: [3, -3] } : dir === 'up' ? { y: [-3, 3] } : { y: [3, -3] }) : {}}
                              transition={{ repeat: Infinity, duration: 0.5, repeatType: 'reverse' }}
                            >
                              {dir === 'left' ? '←' : dir === 'right' ? '→' : dir === 'up' ? '↑' : '↓'}
                            </m.span>
                          </m.button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </m.div>
          );
        })}
      </div>

      {/* Exit Marker - Simple Arrow */}
      <div
        className="absolute transition-all duration-500 z-20 flex items-center justify-center"
        style={{
          top: 24 + (exitRow * CELL_SIZE) + (CELL_SIZE / 2),
          right: '-32px',
          transform: 'translateY(-50%)'
        }}
      >
        <div className={clsx(
          "transition-all transform hover:scale-110",
          theme === 'ascii' ? "text-[#00ff41]" : "text-yellow-400"
        )}>
          <LogOut size={36} strokeWidth={3} />
        </div>
      </div>

      {/* EPIC Blizzard-Style Victory Fireworks */}
      {won && (
        <div className="absolute inset-y-0 right-[-150px] w-[300px] pointer-events-none flex items-center justify-center z-[100]">
          {/* Shockwave Glow */}
          <m.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 5], opacity: [1, 0] }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute w-40 h-40 rounded-full bg-white/40 blur-3xl"
          />

          {/* Central Bright Flare - Massive Intensity */}
          <m.div
            initial={{ scale: 0 }}
            animate={{
              scale: [0, 3, 2],
              opacity: [1, 1, 0.8],
              filter: ["blur(10px)", "blur(25px)", "blur(15px)"]
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute w-32 h-32 rounded-full bg-white shadow-[0_0_200px_#fff,0_0_400px_#facc15,0_0_700px_#fbbf24,0_0_1000px_rgba(255,255,255,0.6)]"
          />

          {/* Explosive High-Intensity Particles */}
          {Array.from({ length: 100 }).map((_, i) => {
            const angle = (i / 100) * Math.PI * 2 + (Math.random() * 0.5);
            const dist = 200 + Math.random() * 500;
            const x = Math.cos(angle) * dist;
            const y = Math.sin(angle) * dist;
            const color = ['#fff', '#fefce8', '#facc15', '#fbbf24', '#f59e0b', '#3b82f6', '#8b5cf6', '#ec4899'][i % 8];
            return (
              <m.div
                key={i}
                initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                animate={{
                  x: [0, x],
                  y: [0, y],
                  scale: [0, 3 + Math.random() * 3, 0],
                  opacity: [1, 1, 0],
                }}
                transition={{
                  duration: 0.4 + Math.random() * 1.5,
                  ease: "easeOut",
                  repeat: Infinity,
                  repeatDelay: Math.random() * 0.1
                }}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  backgroundColor: color,
                  boxShadow: `0 0 30px ${color}, 0 0 60px ${color}, 0 0 100px #fff`
                }}
              />
            );
          })}

          {/* Shimmering Glints */}
          {Array.from({ length: 30 }).map((_, i) => (
            <m.div
              key={`shimmer-${i}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0, 1, 0],
                scale: [0, 2, 0.8, 2, 0],
                x: (Math.random() - 0.5) * 600,
                y: (Math.random() - 0.5) * 600,
              }}
              transition={{
                duration: 1 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * i * 0.1
              }}
              className="absolute text-white text-3xl font-black drop-shadow-[0_0_15px_#fff]"
            >
              ✦
            </m.div>
          ))}
        </div>
      )}
    </div>
  );
}
