
// ==================================
// UNDANGAN DIGITAL ALYA & RAKA
// ==================================

const openButton = document.getElementById("openInvitation");
const cover = document.getElementById("cover");
const invitation = document.getElementById("invitation");

const music = document.getElementById("weddingMusic");
const copyButton = document.getElementById("copyAccount");

// ==================================
// BUKA UNDANGAN
// ==================================

openButton.addEventListener("click", async () => {
  cover.style.display = "none";
  invitation.classList.add("show");

  try {
    await music.play();
  } catch (error) {
    console.log("Musik belum bisa diputar.");
  }
});

// ==================================
// NAMA TAMU OTOMATIS
// ==================================

const params = new URLSearchParams(window.location.search);
const guest = params.get("to");

if (guest) {
  document.getElementById("guestName").textContent = guest;
}

// ==================================
// COUNTDOWN PERNIKAHAN
// ==================================

const weddingDate = new Date("2026-12-20T08:00:00+07:00").getTime();

function updateCountdown() {
  const now = Date.now();
  const distance = weddingDate - now;

  if (distance <= 0) {
    document.getElementById("countdown").textContent =
      "Hari bahagia telah tiba!";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor(
    (distance % (1000 * 60 * 60)) / (1000 * 60)
  );
  const seconds = Math.floor(
    (distance % (1000 * 60)) / 1000
  );

  document.getElementById("countdown").textContent =
    `${days} Hari ${hours} Jam ${minutes} Menit ${seconds} Detik`;
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ==================================
// SALIN NOMOR REKENING
// ==================================

copyButton.addEventListener("click", async () => {
  const number = document.getElementById("accountNumber").textContent.trim();

  try {
    await navigator.clipboard.writeText(number);
    copyButton.textContent = "Berhasil Disalin!";
    setTimeout(() => {
      copyButton.textContent = "Salin Nomor Rekening";
    }, 2000);
  } catch (error) {
    alert("Gagal menyalin. Silakan salin manual.");
  }
});
