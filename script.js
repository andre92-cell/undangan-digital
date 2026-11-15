
// ==================================
// UNDANGAN DIGITAL ALYA & RAKA
// ==================================

document.addEventListener("DOMContentLoaded", () => {

  const openButton = document.getElementById("openInvitation");
  const cover = document.getElementById("cover");
  const invitation = document.getElementById("invitation");
  const music = document.getElementById("weddingMusic");
  const copyButton = document.getElementById("copyAccount");

  // ==================================
  // NAMA TAMU OTOMATIS
  // ==================================

  const params = new URLSearchParams(window.location.search);
  const guest = params.get("to");
  const guestName = document.getElementById("guestName");

  if (guest && guestName) {
    guestName.textContent = guest;
  }

  // ==================================
  // BUKA UNDANGAN
  // ==================================

  if (openButton && cover && invitation) {
    openButton.addEventListener("click", async () => {

      cover.style.display = "none";
      invitation.classList.add("show");

      // Mulai musik setelah tombol diklik
      if (music) {
        try {
          await music.play();
        } catch (error) {
          console.log("Musik tidak dapat diputar:", error);
        }
      }

    });
  }

  // ==================================
  // COUNTDOWN PERNIKAHAN
  // ==================================

  const countdown = document.getElementById("countdown");
  const weddingDate = new Date(
    "2026-12-20T08:00:00+07:00"
  ).getTime();

  function updateCountdown() {

    if (!countdown) return;

    const now = Date.now();
    const distance = weddingDate - now;

    if (distance <= 0) {
      countdown.textContent = "Hari bahagia telah tiba!";
      return;
    }

    const days = Math.floor(
      distance / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) /
      (1000 * 60 * 60)
    );

    const minutes = Math.floor(
      (distance % (1000 * 60 * 60)) /
      (1000 * 60)
    );

    const seconds = Math.floor(
      (distance % (1000 * 60)) / 1000
    );

    countdown.textContent =
      `${days} Hari ${hours} Jam ${minutes} Menit ${seconds} Detik`;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ==================================
  // SALIN NOMOR REKENING
  // ==================================

  if (copyButton) {
    copyButton.addEventListener("click", async () => {

      const accountNumber = document.getElementById("accountNumber");

      if (!accountNumber) return;

      const number = accountNumber.textContent.trim();

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
  }

});
