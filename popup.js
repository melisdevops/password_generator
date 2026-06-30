"use strict";

// ---------------------------------------------------------------------------
// Nessun dato persistito in nessuna forma: niente chrome.storage, niente
// localStorage, niente cookie. Tutto vive solo in memoria per la durata del
// popup e sparisce alla chiusura.
// ---------------------------------------------------------------------------

const LOWER = "abcdefghijklmnopqrstuvwxyz";
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DIGITS = "0123456789";
const SPECIAL = "!?%@#$&*+-=";

const chipRow = document.getElementById("chipRow");
const specialToggle = document.getElementById("specialToggle");
const passwordOutput = document.getElementById("passwordOutput");
const copyBtn = document.getElementById("copyBtn");
const regenBtn = document.getElementById("regenBtn");
const strengthBar = document.getElementById("strengthBar");
const strengthLabel = document.getElementById("strengthLabel");
const lengthLabel = document.getElementById("lengthLabel");
const copyFeedback = document.getElementById("copyFeedback");

let currentLength = 12;
let currentPassword = "";

// -- Random sicuro -----------------------------------------------------------
// crypto.getRandomValues è il CSPRNG nativo del browser (stesso livello di
// sicurezza del modulo "secrets" in Python: si appoggia all'entropia del
// sistema operativo, non è un PRNG con seed prevedibile come Math.random).

function secureRandomInt(maxExclusive) {
  // Rejection sampling per evitare il "modulo bias": senza questo, un range
  // non divisore esatto di 256/65536 darebbe ad alcuni valori una probabilità
  // leggermente più alta di altri.
  const range = maxExclusive;
  const bytesNeeded = range <= 256 ? 1 : 4;
  const maxValid = bytesNeeded === 1
    ? Math.floor(256 / range) * range
    : Math.floor(4294967296 / range) * range;

  const buf = new Uint32Array(1);
  let val;
  do {
    if (bytesNeeded === 1) {
      const b = new Uint8Array(1);
      crypto.getRandomValues(b);
      val = b[0];
    } else {
      crypto.getRandomValues(buf);
      val = buf[0];
    }
  } while (val >= maxValid);

  return val % range;
}

function secureChoice(str) {
  return str[secureRandomInt(str.length)];
}

// -- Generazione password -----------------------------------------------------
// Stessa logica della versione Python: maiuscole/minuscole/cifre sempre
// presenti, speciali opzionali, riempimento dal pool completo, poi shuffle
// Fisher-Yates con indici estratti dal CSPRNG.

function generatePassword(length, useSpecial) {
  let pool = LOWER + UPPER + DIGITS;
  const required = [
    secureChoice(LOWER),
    secureChoice(UPPER),
    secureChoice(DIGITS),
  ];

  if (useSpecial) {
    pool += SPECIAL;
    required.push(secureChoice(SPECIAL));
  }

  const remaining = Math.max(length - required.length, 0);
  const chars = [...required];
  for (let i = 0; i < remaining; i++) {
    chars.push(secureChoice(pool));
  }

  for (let i = chars.length - 1; i > 0; i--) {
    const j = secureRandomInt(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  return chars.slice(0, length).join("");
}

function passwordStrength(length, useSpecial) {
  let score = 1;
  if (length >= 8) score++;
  if (length >= 12) score++;
  if (length >= 16) score++;
  if (useSpecial) score++;

  if (score <= 2) return { label: "Debole", color: "var(--red)", ratio: 0.3 };
  if (score <= 3) return { label: "Media", color: "var(--yellow)", ratio: 0.65 };
  return { label: "Forte", color: "var(--green)", ratio: 1.0 };
}

// -- UI ------------------------------------------------------------------

function setSelectedChip(length) {
  document.querySelectorAll(".chip").forEach((btn) => {
    btn.classList.toggle("selected", Number(btn.dataset.len) === length);
  });
}

function render() {
  currentPassword = generatePassword(currentLength, specialToggle.checked);
  passwordOutput.textContent = currentPassword;

  const { label, color, ratio } = passwordStrength(currentLength, specialToggle.checked);
  strengthLabel.textContent = label;
  strengthLabel.style.color = color;
  strengthBar.style.width = `${ratio * 100}%`;
  strengthBar.style.background = color;
  lengthLabel.textContent = `${currentLength} caratteri`;
}

chipRow.addEventListener("click", (e) => {
  const btn = e.target.closest(".chip");
  if (!btn) return;
  currentLength = Number(btn.dataset.len);
  setSelectedChip(currentLength);
  render();
});

specialToggle.addEventListener("change", render);
regenBtn.addEventListener("click", render);

copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(currentPassword);
    copyFeedback.textContent = "\u2713 Copiata negli appunti";
    setTimeout(() => { copyFeedback.textContent = ""; }, 1500);
  } catch (err) {
    copyFeedback.textContent = "Copia non riuscita";
    setTimeout(() => { copyFeedback.textContent = ""; }, 1500);
  }
});

// -- Avvio -----------------------------------------------------------------
setSelectedChip(currentLength);
render();
