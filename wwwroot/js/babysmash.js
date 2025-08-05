window.babySmash = {
    audioContext: null,
    soundCache: new Map(),
    
    initialize: function() {
        // Initialize audio context on first user interaction
        document.addEventListener('click', this.initAudio.bind(this), { once: true });
        document.addEventListener('keydown', this.initAudio.bind(this), { once: true });
        
        // Prevent default keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            // Allow Ctrl+Shift+Alt+O for options
            if (e.ctrlKey && e.shiftKey && e.altKey && e.key === 'O') {
                return true;
            }
            
            // Block other problematic key combinations
            if (e.ctrlKey || e.altKey || e.metaKey) {
                e.preventDefault();
                return false;
            }
            
            // Block function keys
            if (e.key.startsWith('F') && e.key.length > 1) {
                e.preventDefault();
                return false;
            }
            
            // Block other system keys
            const blockedKeys = ['Tab', 'Escape', 'Meta', 'ContextMenu'];
            if (blockedKeys.includes(e.key)) {
                e.preventDefault();
                return false;
            }
            
            return true;
        });
        
        // Focus the main container to capture keyboard events
        const container = document.querySelector('.baby-smash-container');
        if (container) {
            container.focus();
        }
    },
    
    initAudio: function() {
        if (!this.audioContext) {
            try {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                this.preloadSounds();
            } catch (e) {
                console.warn('Audio not supported:', e);
            }
        }
    },
    
    preloadSounds: function() {
        const soundFiles = [
            'babylaugh.wav',
            'giggle.wav', 
            'babygigl2.wav',
            'laughingmice.wav',
            'ccgiggle.wav',
            'scooby2.wav'
        ];
        
        soundFiles.forEach(sound => {
            this.loadSound(sound);
        });
    },
    
    loadSound: async function(filename) {
        if (this.soundCache.has(filename) || !this.audioContext) {
            return;
        }
        
        try {
            const response = await fetch(`/sounds/${filename}`);
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
            this.soundCache.set(filename, audioBuffer);
        } catch (e) {
            console.warn(`Failed to load sound ${filename}:`, e);
            // Create a simple beep as fallback
            this.createBeepSound(filename);
        }
    },
    
    createBeepSound: function(filename) {
        if (!this.audioContext) return;
        
        const sampleRate = this.audioContext.sampleRate;
        const duration = 0.3;
        const frequency = 440 + Math.random() * 440; // Random frequency between 440-880 Hz
        
        const buffer = this.audioContext.createBuffer(1, sampleRate * duration, sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < data.length; i++) {
            data[i] = Math.sin(2 * Math.PI * frequency * i / sampleRate) * Math.exp(-i / (sampleRate * 0.1));
        }
        
        this.soundCache.set(filename, buffer);
    },
    
    playSound: function(filename) {
        if (!this.audioContext) {
            this.initAudio();
            return;
        }
        
        const audioBuffer = this.soundCache.get(filename);
        if (!audioBuffer) {
            // Try to load the sound and play a beep instead
            this.loadSound(filename);
            this.playBeep();
            return;
        }
        
        const source = this.audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(this.audioContext.destination);
        source.start();
    },
    
    playBeep: function() {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(440 + Math.random() * 440, this.audioContext.currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.3);
    },
    
    speakText: function(text) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.8;
            utterance.pitch = 1.2;
            speechSynthesis.speak(utterance);
        }
    }
};