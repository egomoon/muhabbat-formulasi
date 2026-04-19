const noTexts = ["Qochdim! 😜", "Tutolmaysan! 😂", "E yo'q-da", "Xato tugma! 😏", "Baribir qochaman! 🏃‍♂️"];
const questions = ["Aniqmi? ✨", "Haqiqatdanmi? 🥰", "Juda-juda sevasanmi? ❤️", "Meni tanladingmi? 💍", "Oxirgi marta: rostmi? 🫶"];
let currentStep = 0;

// Elementlar
const noBtn = document.getElementById('noBtn');
const modalNoBtn = document.getElementById('modalNoBtn');

// 1. Yurakchalar funksiyasi (Eng tepada)
function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
}
setInterval(createHeart, 300);

// 2. Qochish funksiyasi
function escape(btn) {
    const x = Math.random() * (window.innerWidth - btn.offsetWidth);
    const y = Math.random() * (window.innerHeight - btn.offsetHeight);
    btn.style.position = 'fixed';
    btn.style.left = x + 'px';
    btn.style.top = y + 'px';
    btn.innerText = noTexts[Math.floor(Math.random() * noTexts.length)];
}

noBtn.addEventListener('mouseover', () => escape(noBtn));
noBtn.addEventListener('touchstart', (e) => { e.preventDefault(); escape(noBtn); });
modalNoBtn.addEventListener('mouseover', () => escape(modalNoBtn));
modalNoBtn.addEventListener('touchstart', (e) => { e.preventDefault(); escape(modalNoBtn); });

// 3. Interfeys almashinuvi
document.getElementById('mainYesBtn').addEventListener('click', () => {
    document.getElementById('mainCard').classList.add('hidden');
    document.getElementById('modalOverlay').classList.remove('hidden');
});

document.getElementById('modalYesBtn').addEventListener('click', () => {
    if (currentStep < questions.length - 1) {
        currentStep++;
        document.getElementById('modalQuestion').innerText = questions[currentStep];
        document.getElementById('stepCounter').innerText = `${currentStep + 1} / ${questions.length}`;
        // No tugmasini joyiga qaytarish (ixtiyoriy)
        modalNoBtn.style.position = 'absolute';
        modalNoBtn.style.left = 'auto'; modalNoBtn.style.top = 'auto';
    } else {
        document.getElementById('modalOverlay').classList.add('hidden');
        document.getElementById('finalCard').classList.remove('hidden');
    }
});

// 4. Mem funksiyasi (Agar "Yo'q" tasodifan bosilsa)
function showMeme() {
    document.getElementById('memeContainer').classList.remove('hidden');
    document.getElementById('memeVideo').play();
}
noBtn.addEventListener('click', showMeme);
modalNoBtn.addEventListener('click', showMeme);

document.getElementById('closeMemeBtn').addEventListener('click', () => {
    location.reload();
});
