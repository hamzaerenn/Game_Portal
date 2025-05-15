function startGame() {
    const introScreen = document.getElementById('introScreen');
    const mainContent = document.getElementById('mainContent');
    
    introScreen.style.animation = 'slideUp 1s ease forwards';
    
    setTimeout(() => {
        introScreen.style.display = 'none';
        mainContent.style.display = 'block';
        mainContent.style.animation = 'fadeIn 1s ease';
    }, 1000);
}

const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

const stars = [];
function createStars() {
    for (let i = 0; i < 200; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2,
            speed: Math.random() * 0.5
        });
    }
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        
        star.y += star.speed;
        if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }
    });
    
    requestAnimationFrame(drawStars);
}

window.addEventListener('load', () => {
    resizeCanvas();
    createStars();
    drawStars();
});

window.addEventListener('resize', resizeCanvas);

const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const gameDescription = document.getElementById('gameDescription');
const gameFeatures = document.getElementById('gameFeatures');

const gameData = {
    'mario': {
        title: 'Super Mario',
        description: 'Nintendo\'nun efsane platform oyunu. Mario ve Luigi kardeşlerin maceralarını yaşayın!',
        features: [
            'Klasik platform mekanikleri',
            '8-bit grafikler',
            'Efsanevi müzikler',
            'Çoklu seviye sistemi',
            'Gizli bölümler'
        ]
    },
    'pacman': {
        title: 'Pac-Man',
        description: 'Arcade klasiklerinin kralı. Pac-Man ile labirentlerde hayaletlerden kaçın!',
        features: [
            'Basit ama bağımlılık yapıcı oynanış',
            'Klasik arcade deneyimi',
            'Çok oyunculu mod',
            'Yüksek skor sistemi',
            'Özel güçler'
        ]
    },
    'rdr2': {
        title: 'Red Dead Redemption 2',
        description: 'Vahşi Batı\'nın son günlerinde geçen epik bir macera. Arthur Morgan ve Van der Linde çetesinin hikayesini yaşayın.',
        features: [
            'Geniş ve detaylı açık dünya',
            'Gerçekçi karakter etkileşimleri',
            'Zengin hikaye anlatımı',
            'Çok oyunculu mod',
            'Detaylı yan görevler'
        ]
    },
    'hollowknight': {
        title: 'Hollow Knight',
        description: 'Muhteşem bir metroidvania deneyimi. Hallownest krallığının derinliklerinde maceraya atılın.',
        features: [
            'Zorlu platform mekanikleri',
            'Güzel sanat tasarımı',
            'Geniş keşif alanları',
            'Zorlu boss savaşları',
            'Gizli bölümler ve sırlar'
        ]
    },
    'cyberpunk': {
        title: 'Cyberpunk 2077',
        description: 'Gelecekte geçen açık dünya RPG oyunu. Night City\'de kendi hikayenizi yazın.',
        features: [
            'Detaylı karakter özelleştirme',
            'Futuristik silahlar ve yetenekler',
            'Karmaşık hikaye seçimleri',
            'Geniş açık dünya',
            'Çoklu oynanış stilleri'
        ]
    },
    'witcher': {
        title: 'The Witcher 3: Wild Hunt',
        description: 'Fantastik dünyada geçen epik bir macera. Geralt of Rivia\'nın son hikayesini yaşayın.',
        features: [
            'Geniş ve detaylı açık dünya',
            'Karmaşık hikaye seçimleri',
            'Zorlu savaş sistemi',
            'Yan görevler ve keşif',
            'Görsel olarak etkileyici'
        ]
    },
    'godofwar': {
        title: 'God of War Ragnarök',
        description: 'Kratos ve Atreus\'un epik macerası. İskandinav mitolojisinde geçen bu macera, baba-oğul ilişkisini ve kaderin ağırlığını konu alıyor.',
        features: [
            'Epik savaş sistemi',
            'Etkileyici hikaye anlatımı',
            'Görsel şölen',
            'Karakter gelişimi',
            'Zorlu düşmanlar'
        ]
    },
    'eldenring': {
        title: 'Elden Ring',
        description: 'FromSoftware\'nin epik açık dünya oyunu. George R.R. Martin\'in katkılarıyla oluşturulan bu dünyada, Tarnished olarak maceraya atılın.',
        features: [
            'Zorlu savaş sistemi',
            'Geniş açık dünya',
            'Epik boss savaşları',
            'Çoklu oynanış stilleri',
            'Zengin hikaye anlatımı'
        ]
    }
};

function openModal(videoUrl, gameId) {
    const game = gameData[gameId];
    
    modalTitle.textContent = game.title;
    gameDescription.textContent = game.description;
    gameFeatures.innerHTML = game.features.map(feature => `<li>${feature}</li>`).join('');
    
    const trailer = document.getElementById('trailer');
    trailer.src = videoUrl;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.style.display = 'none';
    document.getElementById('trailer').src = '';
    document.body.style.overflow = 'auto';
}

const searchInput = document.getElementById('searchInput');
const filterSelect = document.getElementById('filterSelect');
const cards = document.querySelectorAll('.card');

function filterCards() {
    const searchTerm = searchInput.value.toLowerCase();
    const filterValue = filterSelect.value;

    cards.forEach(card => {
        const title = card.querySelector('h2').textContent.toLowerCase();
        const category = card.dataset.category;
        const matchesSearch = title.includes(searchTerm);
        const matchesFilter = filterValue === 'all' || category === filterValue;

        card.style.display = matchesSearch && matchesFilter ? 'block' : 'none';
    });
}

searchInput.addEventListener('input', filterCards);
filterSelect.addEventListener('change', filterCards);

cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1)';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});
  