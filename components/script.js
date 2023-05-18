const songs = [
  {
    name: "Pasoori",
    artist: "Shae Gill, Ali Sethi",
    image: "./assets/Pasoori.jpeg",
  },
  {
    name: "Rangi Saari",
    artist: "Kavita Seth, Kanishk Seth",
    image: "./assets/Rangi Saari.jpeg",
  },
  {
    name: "Chand Baaliyan",
    artist: "Aditya A",
    image: "./assets/Chand Baaliyan.jpeg",
  },
];

const songImage = document.querySelector(".song-image");
const songName = document.getElementById("songName");
const artistName = document.getElementById("artistName");
const prevButton = document.getElementById("prevButton");
const playButton = document.getElementById("playButton");
const nextButton = document.getElementById("nextButton");

let currentSongIndex = 0;
let isPlaying = false;

loadSong(currentSongIndex);

function loadSong(index) {
  const song = songs[index];
  songImage.style.backgroundImage = `url("${song.image}")`;
  songName.textContent = song.name;
  artistName.textContent = song.artist;
}

function togglePlay() {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
}

function playSong() {
  isPlaying = true;
}

function pauseSong() {
  isPlaying = false;
}

function prevSong() {
  currentSongIndex--;
  if (currentSongIndex < 0) {
    currentSongIndex = songs.length - 1;
  }
  loadSong(currentSongIndex);
}

function nextSong() {
  currentSongIndex++;
  if (currentSongIndex >= songs.length) {
    currentSongIndex = 0;
  }
  loadSong(currentSongIndex);
}

playButton.addEventListener("click", togglePlay);
prevButton.addEventListener("click", prevSong);
nextButton.addEventListener("click", nextSong);

const themeToggle = document.getElementById("themeToggle");
const body = document.querySelector(".body");

themeToggle.addEventListener("change", toggleTheme);

function toggleTheme() {
  if (themeToggle.checked) {
    body.classList.add("dark-theme");
    body.classList.remove("light-theme");
  } else {
    body.classList.add("light-theme");
    body.classList.remove("dark-theme");
  }
}

const seeker = document.getElementById("seeker");
const progressBar = document.getElementById("progressBar");
const seekbar = document.querySelector(".seekbar");

let isDragging = false;

function calculateProgress(event) {
  const seekbarWidth = seekbar.offsetWidth;
  const clickPosition = event.clientX - seekbar.getBoundingClientRect().left;
  let progress = (clickPosition / seekbarWidth) * 100;
  progress = Math.max(0, Math.min(100, progress)); // Restrict progress between 0 and 100
  return progress.toFixed(2);
}

function updateSeeker(progress) {
  const seekerPosition = progress + "%";
  seeker.style.left = seekerPosition;
  progressBar.style.width = seekerPosition;
}

seeker.addEventListener("mousedown", () => {
  isDragging = true;
});

window.addEventListener("mouseup", () => {
  if (isDragging) {
    isDragging = false;
  }
});

window.addEventListener("mousemove", (event) => {
  if (isDragging) {
    const progress = calculateProgress(event);
    updateSeeker(progress);
  }
});

const photoGallery = document.querySelector(".gallery-images");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");
const galleryWidth = document.querySelector(".gallery-container").offsetWidth;

const photos = [
  "./assets/Back.jpeg",
  "./assets/Pasoori.jpeg",
  "./assets/Chand Baaliyan.jpeg",
  "./assets/Rangi Saari.jpeg",
  "./assets/Back.jpeg",
  "./assets/Pasoori.jpeg",
  "./assets/Chand Baaliyan.jpeg",
  "./assets/Rangi Saari.jpeg",
  "./assets/Back.jpeg",
  "./assets/Pasoori.jpeg",
];

function createPhotoElements() {
  let photoElements = "";
  for (let i = 0; i < photos.length; i++) {
    photoElements += `<img src="${photos[i]}" alt="Photo ${i + 1}">`;
  }
  photoGallery.innerHTML = photoElements;
}

function scrollGallery(direction) {
  const scrollAmount = direction === "left" ? -galleryWidth : galleryWidth;
  photoGallery.scrollBy({ left: scrollAmount, behavior: "smooth" });
}

leftArrow.addEventListener("click", () => scrollGallery("left"));
rightArrow.addEventListener("click", () => scrollGallery("right"));

createPhotoElements();
