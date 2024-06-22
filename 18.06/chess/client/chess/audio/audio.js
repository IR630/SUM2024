const AudioContext = window.AudioContext;

const audioContext = new AudioContext();

const audioElement = document.getElementById("music");

const track = audioContext.createMediaElementSource(audioElement);
track.connect(audioContext.destination);

const playButton = document.getElementById("musicButton");

playButton.addEventListener(
  "click",
  () => {
    // Check if context is in suspended state (autoplay policy)
    if (audioContext.state === "suspended") {
      audioContext.resume().then(() => {
        console.log("aboba");
      });
    }

    // Play or pause track depending on state
    if (playButton.dataset.playing === "false") {
      audioElement.play();
      playButton.dataset.playing = "true";
    } else if (playButton.dataset.playing === "true") {
      audioElement.pause();
      playButton.dataset.playing = "false";
    }
  },
  false,
);
