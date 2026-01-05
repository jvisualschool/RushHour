class SoundManager {
    private sounds: Record<string, HTMLAudioElement> = {};
    private bgmTracks: string[] = [];
    private currentBGM: HTMLAudioElement | null = null;

    constructor() {
        if (typeof window !== 'undefined') {
            const base = import.meta.env.BASE_URL || '/';
            const p = `${base}assets/sounds`;
            this.sounds = {
                car: new Audio(`${p}/rushhour_car_short.mp3`),
                truck: new Audio(`${p}/rushhour_truck_long.mp3`),
                click: new Audio(`${p}/rushhour_click.mp3`),
                error: new Audio(`${p}/rushhour_error.mp3`),
                success: new Audio(`${p}/rushhour_success.mp3`),
                victory: new Audio(`${p}/rushhour_victory.mp3`),
            };

            // Pre-load and set volumes
            Object.values(this.sounds).forEach(audio => {
                audio.load();
                audio.volume = 0.5;
            });

            // Initialize BGM tracks
            const bgmPath = `${base}assets/bgm`;
            this.bgmTracks = [
                `${bgmPath}/rushhour_bgm_01_cheerful.mp3`,
                `${bgmPath}/rushhour_bgm_02_relaxing.mp3`,
                `${bgmPath}/rushhour_bgm_03_upbeat.mp3`,
                `${bgmPath}/rushhour_bgm_04_retro.mp3`,
                `${bgmPath}/rushhour_bgm_05_minimal.mp3`,
                `${bgmPath}/rushhour_bgm_06_jazz.mp3`,
                `${bgmPath}/rushhour_bgm_07_tropical.mp3`,
                `${bgmPath}/rushhour_bgm_08_electronic.mp3`,
                `${bgmPath}/rushhour_bgm_09_whimsical.mp3`,
                `${bgmPath}/rushhour_bgm_10_nature.mp3`,
                `${bgmPath}/rushhour_bgm_11_cheerful.mp3`,
            ];
        }
    }

    private play(name: string) {
        const audio = this.sounds[name];
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(e => console.warn('Audio play blocked:', e));
        }
    }

    playMove(isLarge: boolean = false) {
        this.play(isLarge ? 'truck' : 'car');
    }

    playWin() {
        this.play('victory');
    }

    playNext() {
        this.play('success');
    }

    playClick() {
        this.play('click');
    }

    playError() {
        this.play('error');
    }

    playRandomBGM() {
        if (this.bgmTracks.length === 0) return;

        // Stop current BGM if playing
        this.stopBGM();

        // Select random track
        const randomIndex = Math.floor(Math.random() * this.bgmTracks.length);
        const trackUrl = this.bgmTracks[randomIndex];

        this.currentBGM = new Audio(trackUrl);
        this.currentBGM.volume = 0.3;
        this.currentBGM.loop = true;
        this.currentBGM.play().catch(e => console.warn('BGM play blocked:', e));
    }

    stopBGM() {
        if (this.currentBGM) {
            this.currentBGM.pause();
            this.currentBGM.currentTime = 0;
            this.currentBGM = null;
        }
    }

    playBGM(index: number) {
        if (index < 0 || index >= this.bgmTracks.length) return;
        this.stopBGM();
        const trackUrl = this.bgmTracks[index];
        this.currentBGM = new Audio(trackUrl);
        this.currentBGM.volume = 0.3;
        this.currentBGM.loop = true;
        this.currentBGM.play().catch(e => console.warn('BGM play blocked:', e));
    }

    toggleBGM() {
        if (this.currentBGM && !this.currentBGM.paused) {
            this.currentBGM.pause();
        } else if (this.currentBGM) {
            this.currentBGM.play().catch(e => console.warn('BGM play blocked:', e));
        } else {
            this.playRandomBGM();
        }
    }
}

export const sounds = new SoundManager();
