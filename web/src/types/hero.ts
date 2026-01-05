export type HeroType =
    | 'sports-car'
    | 'police-car'
    | 'fire-truck'
    | 'ambulance'
    | 'ice-cream-truck'
    | 'taxi'
    | 'school-bus'
    | 'food-truck'
    | 'bicycle'
    | 'stroller';

export interface HeroConfig {
    type: HeroType;
    name: string;
    emoji: string;
    gradient: string;
}

export const HERO_CONFIGS: Record<HeroType, HeroConfig> = {
    'sports-car': {
        type: 'sports-car',
        name: '스포츠카',
        emoji: '🏎️',
        gradient: 'from-red-600 to-red-800'
    },
    'police-car': {
        type: 'police-car',
        name: '경찰차',
        emoji: '🚓',
        gradient: 'from-blue-600 to-blue-800'
    },
    'fire-truck': {
        type: 'fire-truck',
        name: '소방차',
        emoji: '🚒',
        gradient: 'from-red-500 to-orange-600'
    },
    'ambulance': {
        type: 'ambulance',
        name: '구급차',
        emoji: '🚑',
        gradient: 'from-white to-red-200'
    },
    'ice-cream-truck': {
        type: 'ice-cream-truck',
        name: '아이스크림차',
        emoji: '🍦',
        gradient: 'from-pink-400 to-purple-400'
    },
    'taxi': {
        type: 'taxi',
        name: '택시',
        emoji: '🚕',
        gradient: 'from-yellow-400 to-yellow-600'
    },
    'school-bus': {
        type: 'school-bus',
        name: '스쿨버스',
        emoji: '🚌',
        gradient: 'from-yellow-500 to-orange-500'
    },
    'food-truck': {
        type: 'food-truck',
        name: '킥보드',
        emoji: '🛴',
        gradient: 'from-orange-500 to-red-500'
    },
    'bicycle': {
        type: 'bicycle',
        name: '자전거',
        emoji: '🚲',
        gradient: 'from-green-500 to-teal-500'
    },
    'stroller': {
        type: 'stroller',
        name: '유모차',
        emoji: '🛒',
        gradient: 'from-pink-300 to-blue-300'
    }
};
