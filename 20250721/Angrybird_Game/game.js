// 게임 변수들
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const menu = document.getElementById('menu');
const ui = document.getElementById('ui');

// 게임 상태
let gameState = 'menu'; // menu, playing, paused, gameOver
let currentLevel = 1;
let score = 0;
let birdsLeft = 3;
let gameObjects = [];
let birds = [];
let pigs = [];
let obstacles = [];
let background = null;
let slingshot = { x: 200, y: 650 };
let currentBird = null;
let isDragging = false;
let dragStart = { x: 0, y: 0 };
let dragEnd = { x: 0, y: 0 };

// 물리 상수
const GRAVITY = 0.5;
const FRICTION = 0.98;

// 이미지 로딩
const images = {};
const sounds = {};

// 이미지 로드 함수
function loadImage(name, src) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            images[name] = img;
            resolve();
        };
        img.src = src;
    });
}

// 사운드 로드 함수
function loadSound(name, src) {
    return new Promise((resolve) => {
        const audio = new Audio();
        audio.oncanplaythrough = () => {
            sounds[name] = audio;
            resolve();
        };
        audio.src = src;
    });
}

// 모든 에셋 로드
async function loadAssets() {
    try {
        // 새 이미지들
        await Promise.all([
            loadImage('red_bird', 'Content/img/brd/red.png'),
            loadImage('blue_bird', 'Content/img/brd/blue.png'),
            loadImage('yellow_bird', 'Content/img/brd/yellow.png'),
            loadImage('black_bird', 'Content/img/brd/black.png'),
            loadImage('white_bird', 'Content/img/brd/white.png'),
            loadImage('green_bird', 'Content/img/brd/green.png'),
            loadImage('mother_bird', 'Content/img/brd/mother.png'),
            
            // 돼지 이미지들
            loadImage('pig0', 'Content/img/pig/pig0.png'),
            loadImage('pig1', 'Content/img/pig/pig1.png'),
            loadImage('pig2', 'Content/img/pig/pig2.png'),
            loadImage('pig3', 'Content/img/pig/pig3.png'),
            loadImage('pig4', 'Content/img/pig/pig4.png'),
            
            // 배경 이미지들
            loadImage('bg1', 'Content/img/lvl/angry_birds_background_by_gsgill37-d3kogmx.jpg'),
            loadImage('bg2', 'Content/img/lvl/Mighty_hoax-vert-horz-horz.jpg'),
            loadImage('bg3', 'Content/img/lvl/Summer_Pignic_Space_Background.png'),
            loadImage('bg4', 'Content/img/lvl/Angry_Birds_Trilogy_Background.png'),
            
            // 시작 화면 이미지
            loadImage('play_button', 'Content/img/strt/Play.png'),
            loadImage('start_bg', 'Content/img/strt/angry-birds-game-of-pc-and-mobile-wallpapers-download-hd-games-picture-angry-birds-hd-wallpaper.jpg')
        ]);
        
        // 사운드 로드
        await Promise.all([
            loadSound('shoot', 'Content/snd/shootTolak.wav'),
            loadSound('pig_hit', 'Content/snd/pig.wav'),
            loadSound('bird_kill', 'Content/snd/brd_kill.wav'),
            loadSound('fire', 'Content/snd/fire.wav'),
            loadSound('main_music', 'Content/snd/main.mp3'),
            loadSound('playing_music', 'Content/snd/playing.mp3')
        ]);
        
        // 새총 이미지 로드 (고무줄만 사용, 탱크 에셋 제거)
        await Promise.all([
            loadImage('slingshot_band', 'Content/img/firer/esde.png')
        ]);
        
        console.log('모든 에셋이 로드되었습니다!');
    } catch (error) {
        console.error('에셋 로드 중 오류:', error);
    }
}

// 새 클래스
class Bird {
    constructor(x, y, type = 'red') {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.type = type;
        this.radius = 20;
        this.isLaunched = false;
        this.isDead = false;
        this.specialUsed = false;
    }
    
    update() {
        if (this.isLaunched && !this.isDead) {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += GRAVITY;
            this.vx *= FRICTION;
            
            // 화면 밖으로 나가면 제거
            if (this.y > canvas.height + 50 || this.x > canvas.width + 50) {
                this.isDead = true;
            }
        }
    }
    
    draw() {
        if (this.isDead) return;
        
        const img = images[`${this.type}_bird`];
        if (img) {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.drawImage(img, -this.radius, -this.radius, this.radius * 2, this.radius * 2);
            ctx.restore();
        } else {
            // 이미지가 없으면 원으로 그리기
            ctx.fillStyle = this.getColor();
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    getColor() {
        const colors = {
            'red': '#FF0000',
            'blue': '#0000FF',
            'yellow': '#FFFF00',
            'black': '#000000',
            'white': '#FFFFFF',
            'green': '#00FF00'
        };
        return colors[this.type] || '#FF0000';
    }
    
    launch(power, angle) {
        this.isLaunched = true;
        this.vx = Math.cos(angle) * power;
        this.vy = Math.sin(angle) * power;
        sounds.shoot.play();
    }
    
    useSpecial() {
        if (this.specialUsed) return;
        
        this.specialUsed = true;
        switch (this.type) {
            case 'blue':
                // 파란 새: 3개로 분할
                for (let i = 0; i < 2; i++) {
                    const newBird = new Bird(this.x, this.y, 'blue');
                    newBird.isLaunched = true;
                    newBird.vx = this.vx + (Math.random() - 0.5) * 5;
                    newBird.vy = this.vy + (Math.random() - 0.5) * 5;
                    birds.push(newBird);
                }
                break;
            case 'yellow':
                // 노란 새: 속도 증가
                this.vx *= 2;
                break;
            case 'black':
                // 검은 새: 폭발
                this.explode();
                break;
        }
    }
    
    explode() {
        // 주변 돼지들에게 데미지
        pigs.forEach(pig => {
            const distance = Math.sqrt((this.x - pig.x) ** 2 + (this.y - pig.y) ** 2);
            if (distance < 100) {
                pig.health -= 50;
                if (pig.health <= 0) {
                    pig.isDead = true;
                    score += 100;
                }
            }
        });
        sounds.fire.play();
    }
}

// 돼지 클래스
class Pig {
    constructor(x, y, size = 'normal') {
        this.x = x;
        this.y = y;
        this.size = size;
        this.health = this.getHealth();
        this.maxHealth = this.health;
        this.isDead = false;
        this.radius = this.getRadius();
    }
    
    getHealth() {
        const healthMap = {
            'small': 1,
            'normal': 1,
            'large': 1
        };
        return healthMap[this.size] || 1;
    }
    
    getRadius() {
        const radiusMap = {
            'small': 15,
            'normal': 25,
            'large': 35
        };
        return radiusMap[this.size] || 25;
    }
    
    update() {
        // 돼지 업데이트 로직
    }
    
    draw() {
        if (this.isDead) return;
        
        // 고정된 돼지 이미지 사용
        const pigImages = ['pig0', 'pig1', 'pig2', 'pig3', 'pig4'];
        const imgIndex = (this.x + this.y) % pigImages.length; // 위치 기반으로 고정된 이미지 선택
        const img = images[pigImages[imgIndex]];
        if (img) {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.drawImage(img, -this.radius, -this.radius, this.radius * 2, this.radius * 2);
            ctx.restore();
        } else {
            // 이미지가 없으면 원으로 그리기
            ctx.fillStyle = '#00FF00';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // 체력바 그리기
        const barWidth = this.radius * 2;
        const barHeight = 5;
        const healthPercent = this.health / this.maxHealth;
        
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(this.x - barWidth/2, this.y - this.radius - 10, barWidth, barHeight);
        ctx.fillStyle = '#00FF00';
        ctx.fillRect(this.x - barWidth/2, this.y - this.radius - 10, barWidth * healthPercent, barHeight);
    }
    
    takeDamage(damage) {
        this.health -= damage;
        if (this.health <= 0) {
            this.isDead = true;
            score += 100;
            sounds.pig_hit.play();
        }
    }
}

// 장애물 클래스
class Obstacle {
    constructor(x, y, width, height, type = 'wood') {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type;
        this.health = this.getHealth();
        this.maxHealth = this.health;
        this.isDestroyed = false;
    }
    
    getHealth() {
        const healthMap = {
            'wood': 1,
            'stone': 2,
            'ice': 1
        };
        return healthMap[this.type] || 1;
    }
    
    draw() {
        if (this.isDestroyed) return;
        
        const colors = {
            'wood': '#8B4513',
            'stone': '#696969',
            'ice': '#87CEEB'
        };
        
        // 얇은 나무 형태로 그리기
        if (this.type === 'wood') {
            // 얇은 나무 기둥
            ctx.fillStyle = '#8B4513';
            ctx.fillRect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
            
            // 나무 결 무늬 (세로선)
            ctx.strokeStyle = '#654321';
            ctx.lineWidth = 1;
            for (let i = 0; i < this.width; i += 5) {
                ctx.beginPath();
                ctx.moveTo(this.x - this.width/2 + i, this.y - this.height/2);
                ctx.lineTo(this.x - this.width/2 + i, this.y + this.height/2);
                ctx.stroke();
            }
            
            // 나무 기둥 가장자리
            ctx.strokeStyle = '#654321';
            ctx.lineWidth = 2;
            ctx.strokeRect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
            
            // 나무 고리 (기둥 상단과 하단)
            ctx.fillStyle = '#654321';
            ctx.fillRect(this.x - this.width/2 - 2, this.y - this.height/2 - 5, this.width + 4, 5);
            ctx.fillRect(this.x - this.width/2 - 2, this.y + this.height/2, this.width + 4, 5);
        } else if (this.type === 'stone') {
            // 돌 기둥 (더 굵고 단단한 느낌)
            ctx.fillStyle = '#696969';
            ctx.fillRect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
            
            // 돌 무늬
            ctx.strokeStyle = '#4A4A4A';
            ctx.lineWidth = 1;
            for (let i = 0; i < this.width; i += 8) {
                ctx.beginPath();
                ctx.moveTo(this.x - this.width/2 + i, this.y - this.height/2);
                ctx.lineTo(this.x - this.width/2 + i, this.y + this.height/2);
                ctx.stroke();
            }
            
            // 돌 기둥 가장자리
            ctx.strokeStyle = '#4A4A4A';
            ctx.lineWidth = 3;
            ctx.strokeRect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
        } else if (this.type === 'ice') {
            // 얼음 기둥 (반투명하고 깨지기 쉬운 느낌)
            ctx.fillStyle = 'rgba(135, 206, 235, 0.7)';
            ctx.fillRect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
            
            // 얼음 반짝임 효과
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.lineWidth = 1;
            for (let i = 0; i < this.width; i += 6) {
                ctx.beginPath();
                ctx.moveTo(this.x - this.width/2 + i, this.y - this.height/2);
                ctx.lineTo(this.x - this.width/2 + i, this.y + this.height/2);
                ctx.stroke();
            }
            
            // 얼음 기둥 가장자리
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.lineWidth = 2;
            ctx.strokeRect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
        } else {
            // 기본 재질
            ctx.fillStyle = colors[this.type] || '#8B4513';
            ctx.fillRect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
        }
        
        // 체력바
        const barWidth = this.width;
        const barHeight = 3;
        const healthPercent = this.health / this.maxHealth;
        
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(this.x - barWidth/2, this.y - this.height/2 - 8, barWidth, barHeight);
        ctx.fillStyle = '#00FF00';
        ctx.fillRect(this.x - barWidth/2, this.y - this.height/2 - 8, barWidth * healthPercent, barHeight);
    }
    
    takeDamage(damage) {
        this.health -= damage;
        if (this.health <= 0) {
            this.isDestroyed = true;
        }
    }
}

// 레벨 데이터 - 각 레벨마다 완전히 다른 에셋과 모양
const levels = [
    {
        background: 'bg1',
        pigs: [
            { x: 900, y: 600, size: 'normal' },
            { x: 950, y: 550, size: 'small' }
        ],
        obstacles: [
            { x: 850, y: 600, width: 25, height: 200, type: 'wood' },
            { x: 950, y: 600, width: 25, height: 200, type: 'wood' }
        ],
        birds: ['red', 'red', 'red']
    },
    {
        background: 'bg2',
        pigs: [
            { x: 850, y: 600, size: 'normal' },
            { x: 950, y: 600, size: 'normal' },
            { x: 900, y: 500, size: 'small' }
        ],
        obstacles: [
            { x: 800, y: 600, width: 40, height: 200, type: 'stone' },
            { x: 900, y: 600, width: 40, height: 200, type: 'stone' },
            { x: 1000, y: 600, width: 40, height: 200, type: 'stone' },
            { x: 850, y: 500, width: 60, height: 20, type: 'ice' },
            { x: 950, y: 500, width: 60, height: 20, type: 'ice' }
        ],
        birds: ['red', 'blue', 'red']
    },
    {
        background: 'bg3',
        pigs: [
            { x: 800, y: 600, size: 'large' },
            { x: 900, y: 600, size: 'normal' },
            { x: 1000, y: 600, size: 'normal' },
            { x: 850, y: 500, size: 'small' },
            { x: 950, y: 500, size: 'small' }
        ],
        obstacles: [
            { x: 750, y: 600, width: 45, height: 200, type: 'stone' },
            { x: 850, y: 600, width: 45, height: 200, type: 'stone' },
            { x: 950, y: 600, width: 45, height: 200, type: 'stone' },
            { x: 1050, y: 600, width: 45, height: 200, type: 'stone' },
            { x: 800, y: 500, width: 50, height: 25, type: 'wood' },
            { x: 900, y: 500, width: 50, height: 25, type: 'wood' },
            { x: 1000, y: 500, width: 50, height: 25, type: 'wood' },
            { x: 850, y: 450, width: 40, height: 30, type: 'ice' },
            { x: 950, y: 450, width: 40, height: 30, type: 'ice' }
        ],
        birds: ['red', 'yellow', 'blue', 'red']
    },
    {
        background: 'bg4',
        pigs: [
            { x: 800, y: 600, size: 'large' },
            { x: 900, y: 600, size: 'large' },
            { x: 1000, y: 600, size: 'large' },
            { x: 850, y: 500, size: 'normal' },
            { x: 950, y: 500, size: 'normal' },
            { x: 900, y: 400, size: 'small' }
        ],
        obstacles: [
            { x: 750, y: 600, width: 50, height: 200, type: 'stone' },
            { x: 850, y: 600, width: 50, height: 200, type: 'stone' },
            { x: 950, y: 600, width: 50, height: 200, type: 'stone' },
            { x: 1050, y: 600, width: 50, height: 200, type: 'stone' },
            { x: 800, y: 500, width: 45, height: 30, type: 'wood' },
            { x: 900, y: 500, width: 45, height: 30, type: 'wood' },
            { x: 1000, y: 500, width: 45, height: 30, type: 'wood' },
            { x: 850, y: 450, width: 35, height: 35, type: 'ice' },
            { x: 950, y: 450, width: 35, height: 35, type: 'ice' },
            { x: 900, y: 350, width: 70, height: 15, type: 'stone' }
        ],
        birds: ['red', 'yellow', 'black', 'blue', 'red']
    },
    {
        background: 'bg1',
        pigs: [
            { x: 750, y: 600, size: 'large' },
            { x: 850, y: 600, size: 'large' },
            { x: 950, y: 600, size: 'large' },
            { x: 1050, y: 600, size: 'large' },
            { x: 800, y: 500, size: 'large' },
            { x: 900, y: 500, size: 'large' },
            { x: 1000, y: 500, size: 'large' },
            { x: 850, y: 400, size: 'normal' },
            { x: 950, y: 400, size: 'normal' },
            { x: 900, y: 300, size: 'small' }
        ],
        obstacles: [
            { x: 700, y: 600, width: 55, height: 200, type: 'stone' },
            { x: 800, y: 600, width: 55, height: 200, type: 'stone' },
            { x: 900, y: 600, width: 55, height: 200, type: 'stone' },
            { x: 1000, y: 600, width: 55, height: 200, type: 'stone' },
            { x: 1100, y: 600, width: 55, height: 200, type: 'stone' },
            { x: 750, y: 500, width: 40, height: 30, type: 'wood' },
            { x: 850, y: 500, width: 40, height: 30, type: 'wood' },
            { x: 950, y: 500, width: 40, height: 30, type: 'wood' },
            { x: 1050, y: 500, width: 40, height: 30, type: 'wood' },
            { x: 800, y: 450, width: 35, height: 35, type: 'ice' },
            { x: 900, y: 450, width: 35, height: 35, type: 'ice' },
            { x: 1000, y: 450, width: 35, height: 35, type: 'ice' },
            { x: 850, y: 400, width: 30, height: 40, type: 'stone' },
            { x: 950, y: 400, width: 30, height: 40, type: 'stone' },
            { x: 900, y: 350, width: 80, height: 12, type: 'wood' },
            { x: 900, y: 250, width: 80, height: 12, type: 'ice' }
        ],
        birds: ['red', 'yellow', 'black', 'blue', 'white', 'red', 'yellow', 'black']
    }
];

// 게임 초기화
function initGame() {
    gameObjects = [];
    birds = [];
    pigs = [];
    obstacles = [];
    currentBird = null;
    isDragging = false;
    gameOverShown = false;
    levelCleared = false;
    
    const level = levels[currentLevel - 1];
    
    // 배경 설정
    background = images[level.background];
    
    // 돼지 생성
    level.pigs.forEach(pigData => {
        pigs.push(new Pig(pigData.x, pigData.y, pigData.size));
    });
    
    // 장애물 생성
    level.obstacles.forEach(obsData => {
        obstacles.push(new Obstacle(obsData.x, obsData.y, obsData.width, obsData.height, obsData.type));
    });
    
    // 새 생성
    level.birds.forEach((birdType, index) => {
        const bird = new Bird(slingshot.x, slingshot.y, birdType);
        birds.push(bird);
    });
    
    birdsLeft = birds.length;
    updateUI();
}

// UI 업데이트
function updateUI() {
    document.getElementById('score').textContent = score;
    document.getElementById('level').textContent = currentLevel;
    document.getElementById('birdsLeft').textContent = birdsLeft;
}

// 충돌 감지
function checkCollisions() {
    birds.forEach(bird => {
        if (bird.isDead || !bird.isLaunched) return;
        
        // 돼지와의 충돌
        pigs.forEach(pig => {
            if (pig.isDead) return;
            
            const distance = Math.sqrt((bird.x - pig.x) ** 2 + (bird.y - pig.y) ** 2);
            if (distance < bird.radius + pig.radius) {
                pig.takeDamage(50);
                // 새가 사라지지 않음 - 중복 충돌 가능
                sounds.pig_hit.play();
            }
        });
        
        // 장애물과의 충돌
        obstacles.forEach(obstacle => {
            if (obstacle.isDestroyed) return;
            
            const birdLeft = bird.x - bird.radius;
            const birdRight = bird.x + bird.radius;
            const birdTop = bird.y - bird.radius;
            const birdBottom = bird.y + bird.radius;
            
            const obsLeft = obstacle.x - obstacle.width/2;
            const obsRight = obstacle.x + obstacle.width/2;
            const obsTop = obstacle.y - obstacle.height/2;
            const obsBottom = obstacle.y + obstacle.height/2;
            
            if (birdRight > obsLeft && birdLeft < obsRight && 
                birdBottom > obsTop && birdTop < obsBottom) {
                obstacle.takeDamage(30);
                // 새가 사라지지 않음 - 중복 충돌 가능
                sounds.bird_kill.play();
            }
        });
    });
}

// 게임 상태 확인
let gameOverShown = false;
let levelCleared = false;

function checkGameState() {
    // 모든 돼지가 죽었는지 확인
    const allPigsDead = pigs.every(pig => pig.isDead);
    if (allPigsDead && !levelCleared) {
        levelCleared = true;
        setTimeout(() => {
            alert('레벨 클리어!');
            if (currentLevel < levels.length) {
                currentLevel++;
                initGame();
            } else {
                alert('게임 클리어!');
                gameState = 'menu';
                showMenu();
            }
        }, 1000);
        return;
    }
    
    // 모든 새가 죽었고 발사할 새가 없으면 게임 오버
    const allBirdsDead = birds.every(bird => bird.isDead);
    const noBirdsLeft = birdsLeft <= 0;
    
    if (allBirdsDead && noBirdsLeft && !gameOverShown) {
        gameOverShown = true;
        setTimeout(() => {
            alert('게임 오버! 다시 시도하세요.');
            gameState = 'menu';
            showMenu();
        }, 1000);
    }
}

// 새 발사 준비
function prepareNextBird() {
    if (birdsLeft > 0) {
        currentBird = birds[birds.length - birdsLeft];
        currentBird.x = slingshot.x;
        currentBird.y = slingshot.y;
        currentBird.vx = 0;
        currentBird.vy = 0;
        currentBird.isLaunched = false;
        currentBird.isDead = false;
    }
}

// 그리기 함수들
function drawBackground() {
    if (background) {
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    } else {
        ctx.fillStyle = '#87CEEB';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function drawSlingshot() {
    // 기본 새총 그리기 (단순한 형태, 탱크 에셋 없음)
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(slingshot.x - 40, slingshot.y + 80);
    ctx.lineTo(slingshot.x, slingshot.y);
    ctx.lineTo(slingshot.x + 40, slingshot.y + 80);
    ctx.stroke();
    
    // 새가 발사 준비 중이면 고무줄 그리기
    if (currentBird && !currentBird.isLaunched) {
        const bandImg = images['slingshot_band'];
        if (bandImg) {
            // 고무줄 이미지 그리기
            ctx.save();
            ctx.translate(slingshot.x, slingshot.y);
            ctx.drawImage(bandImg, -40, -40, 80, 80);
            ctx.restore();
        } else {
            // 기본 고무줄 그리기
            ctx.strokeStyle = '#FFD700';
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(slingshot.x, slingshot.y);
            ctx.lineTo(currentBird.x, currentBird.y);
            ctx.stroke();
        }
    }
}

function drawTrajectory() {
    if (isDragging && currentBird && !currentBird.isLaunched) {
        const dx = dragStart.x - dragEnd.x;
        const dy = dragStart.y - dragEnd.y;
        const power = Math.min(Math.sqrt(dx * dx + dy * dy) / 5.9, 34); // 힘을 30% 더 증가
        const angle = Math.atan2(dy, dx);
        
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(slingshot.x, slingshot.y); // 새총 위치에서 시작
        
        let x = slingshot.x;
        let y = slingshot.y;
        let vx = Math.cos(angle) * power;
        let vy = Math.sin(angle) * power;
        
        for (let i = 0; i < 30; i++) { // 궤적 길이 증가
            x += vx;
            y += vy;
            vy += GRAVITY;
            ctx.lineTo(x, y);
        }
        ctx.stroke();
    }
}

// 메인 게임 루프
function gameLoop() {
    // 배경 그리기
    drawBackground();
    
    // 게임 오브젝트 업데이트 및 그리기
    birds.forEach(bird => {
        bird.update();
        bird.draw();
    });
    
    pigs.forEach(pig => {
        pig.update();
        pig.draw();
    });
    
    obstacles.forEach(obstacle => {
        obstacle.draw();
    });
    
    // 슬링샷 그리기
    drawSlingshot();
    
    // 궤적 그리기
    drawTrajectory();
    
    // 충돌 감지
    checkCollisions();
    
    // 게임 상태 확인
    checkGameState();
    
    // 다음 프레임 요청
    if (gameState === 'playing') {
        requestAnimationFrame(gameLoop);
    }
}

// 마우스 이벤트 처리
canvas.addEventListener('mousedown', (e) => {
    if (gameState !== 'playing' || !currentBird) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const distance = Math.sqrt((x - currentBird.x) ** 2 + (y - currentBird.y) ** 2);
    if (distance < 50) {
        isDragging = true;
        dragStart = { x: currentBird.x, y: currentBird.y };
        dragEnd = { x: x, y: y };
        currentBird.x = x;
        currentBird.y = y;
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (!isDragging || !currentBird) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    dragEnd = { x: x, y: y };
    currentBird.x = x;
    currentBird.y = y;
});

canvas.addEventListener('mouseup', (e) => {
    if (!isDragging || !currentBird) return;
    
    const dx = dragStart.x - dragEnd.x;
    const dy = dragStart.y - dragEnd.y;
    const power = Math.min(Math.sqrt(dx * dx + dy * dy) / 5.9, 34); // 힘을 30% 더 증가
    const angle = Math.atan2(dy, dx);
    
    // 새를 원래 위치로 되돌리고 발사
    currentBird.x = slingshot.x;
    currentBird.y = slingshot.y;
    currentBird.launch(power, angle);
    birdsLeft--;
    updateUI();
    
    isDragging = false;
    
    // 잠시 후 다음 새 준비
    setTimeout(() => {
        prepareNextBird();
    }, 1000);
});

// 키보드 이벤트 (특수 능력)
document.addEventListener('keydown', (e) => {
    if (gameState !== 'playing' || !currentBird || !currentBird.isLaunched) return;
    
    if (e.code === 'Space') {
        currentBird.useSpecial();
    }
});

// 게임 시작
function startGame() {
    gameState = 'playing';
    menu.classList.add('hidden');
    ui.classList.remove('hidden');
    score = 0;
    currentLevel = 1;
    initGame();
    prepareNextBird();
    gameLoop();
    
    // 배경 음악 재생
    if (sounds.playing_music) {
        sounds.playing_music.loop = true;
        sounds.playing_music.play();
    }
}

// 레벨 선택
function showLevels() {
    menu.innerHTML = '<h1>레벨 선택</h1>';
    for (let i = 1; i <= levels.length; i++) {
        const button = document.createElement('button');
        button.textContent = `레벨 ${i}`;
        button.onclick = () => {
            currentLevel = i;
            startGame();
        };
        menu.appendChild(button);
    }
    const backButton = document.createElement('button');
    backButton.textContent = '뒤로 가기';
    backButton.onclick = showMenu;
    menu.appendChild(backButton);
}

// 메뉴 표시
function showMenu() {
    gameState = 'menu';
    menu.classList.remove('hidden');
    ui.classList.add('hidden');
    menu.innerHTML = `
        <h1>앵그리버드</h1>
        <button onclick="startGame()">게임 시작</button>
        <button onclick="showLevels()">레벨 선택</button>
    `;
    
    // 배경 음악 중지
    if (sounds.playing_music) {
        sounds.playing_music.pause();
        sounds.playing_music.currentTime = 0;
    }
}

// 초기화
loadAssets().then(() => {
    showMenu();
}); 