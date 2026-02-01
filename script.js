// =====================
// EASY CUSTOMIZATION 👇
// =====================

// 1) Put your photos here (use direct image links OR upload images to the repo and reference them)
const PHOTO_URLS = [
  // Example if you upload photos to repo: "photos/photo1.jpg"
  // Or use an online direct image link (must end in .jpg/.png):
  // "https://example.com/pic1.jpg",
];

// 2) Your letter text + your name
const LETTER_FROM = "Your Name";
const LETTER_BODY = `Happy Valentine’s Day, Manha 💗

You make my days brighter in a way I can’t explain — your smile, your heart,
and the calm I feel around you.

I’m grateful for you. Today and always.`;

// 3) Your video (YouTube link recommended)
const YOUTUBE_LINK = ""; // Example: "https://www.youtube.com/watch?v=VIDEO_ID"

// 4) Letter background photo (optional)
// Upload a photo to repo like: "backgrounds/letter-bg.jpg"
// Then set: const LETTER_BG_IMAGE = "backgrounds/letter-bg.jpg";
const LETTER_BG_IMAGE = "";

// =====================
// APP LOGIC
// =====================
const screens = {
  intro: document.getElementById("screen-intro"),
  choose: document.getElementById("screen-choose"),
  photos: document.getElementById("screen-photos"),
  letter: document.getElementById("screen-letter"),
  video: document.getElementById("screen-video"),
};

function showScreen(key){
  Object.values(screens).forEach(s => s.classList.remove("screen--active"));
  screens[key].classList.add("screen--active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

const btnYes = document.getElementById("btnYes");
const btnNo = document.getElementById("btnNo");
const btnBack = document.getElementById("btnBack");
const noMessage = document.getElementById("noMessage");

btnYes.addEventListener("click", () => showScreen("choose"));
btnBack.addEventListener("click", () => showScreen("intro"));

// "No" button playful
const noLines = [
  "Aww 😭 try again?",
  "Manha… are you sure? 🥺",
  "Okay but… what if you click YES? 😌",
  "Plot twist: the correct answer is YES 💘",
];
let noCount = 0;

function moveNo(){
  btnNo.style.position = "relative";
  btnNo.style.transform = `translate(${(Math.random()*18-9).toFixed(0)}px, ${(Math.random()*12-6).toFixed(0)}px)`;
}
btnNo.addEventListener("click", () => {
  noMessage.textContent = noLines[Math.min(noCount, noLines.length - 1)];
  noCount++;
  moveNo();
});

// choices
document.querySelectorAll(".choice").forEach(btn => {
  btn.addEventListener("click", () => {
    const which = btn.dataset.open;
    showScreen(which);
    if(which === "photos") renderPhotos();
    if(which === "letter") renderLetter();
    if(which === "video") renderVideo();
  });
});

// back buttons in other screens
document.querySelectorAll("[data-goto='choose']").forEach(b => {
  b.addEventListener("click", () => showScreen("choose"));
});

// PHOTOS
const photoGrid = document.getElementById("photoGrid");
function renderPhotos(){
  photoGrid.innerHTML = "";
  if(!PHOTO_URLS.length){
    photoGrid.innerHTML = `<p style="color:#6c4a56">No photos yet. Add links in <b>script.js</b> (PHOTO_URLS).</p>`;
    return;
  }
  PHOTO_URLS.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Photo";
    photoGrid.appendChild(img);
  });
}

// LETTER
function renderLetter(){
  document.getElementById("letterFrom").textContent = LETTER_FROM || "Someone who adores you";
  document.getElementById("letterBody").textContent = LETTER_BODY;

  if(LETTER_BG_IMAGE){
    // sets CSS variable used in styles.css
    screens.letter.style.setProperty("--letter-bg", `url('${LETTER_BG_IMAGE}')`);
  }else{
    screens.letter.style.setProperty("--letter-bg", "none");
  }
}

// VIDEO
const videoWrap = document.getElementById("videoWrap");
function toEmbed(url){
  try{
    const u = new URL(url);
    if(u.hostname.includes("youtu.be")){
      const id = u.pathname.replace("/", "");
      return `https://www.youtube.com/embed/${id}`;
    }
    if(u.hostname.includes("youtube.com")){
      const id = u.searchParams.get("v");
      if(id) return `https://www.youtube.com/embed/${id}`;
      if(u.pathname.startsWith("/embed/")) return url;
    }
  }catch(e){}
  return null;
}
function renderVideo(){
  videoWrap.innerHTML = "";
  if(!YOUTUBE_LINK){
    videoWrap.innerHTML = `<p style="color:#6c4a56">No video yet. Add a YouTube link in <b>script.js</b> (YOUTUBE_LINK).</p>`;
    return;
  }
  const embed = toEmbed(YOUTUBE_LINK);
  if(!embed){
    videoWrap.innerHTML = `<p style="color:#6c4a56">That link doesn’t look like YouTube. Use a YouTube share link.</p>`;
    return;
  }
  const iframe = document.createElement("iframe");
  iframe.src = embed;
  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  iframe.allowFullscreen = true;
  videoWrap.appendChild(iframe);
}

// MUSIC (copyright-safe placeholder)
const bgm = document.getElementById("bgm");
const musicToggle = document.getElementById("musicToggle");
const musicLabel = musicToggle.querySelector(".label");
let isPlaying = false;

function setMusicUI(){
  musicToggle.setAttribute("aria-pressed", String(isPlaying));
  musicLabel.textContent = isPlaying ? "Music: On" : "Music: Off";
}

// simple soft tone (no copyrighted audio)
let ctx, osc, gain;
function startTone(){
  ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
  osc = ctx.createOscillator();
  gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.value = 220;
  gain.gain.value = 0.03;
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
}
function stopTone(){
  try{ osc.stop(); }catch(e){}
  osc = null;
}

musicToggle.addEventListener("click", async () => {
  if(!isPlaying){
    isPlaying = true;
    setMusicUI();
    startTone();
  }else{
    isPlaying = false;
    setMusicUI();
    stopTone();
  }
});

setMusicUI();

