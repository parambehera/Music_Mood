console.log("Jay shree ram");
async function callSongs() {
  try {
    const songs = await fetch("./API/song_api.json");
    let song = await songs.json();

    return song;
  } catch (error) {
    console.log(error);
  }
}

let tittle = document.querySelector("#tittle");
let music = document.querySelector(".Musics");
let artist = document.querySelector("#artist");
let mc = document.querySelector(".music-card");
(async function main() {
  let songs = await callSongs();
  for (const element of songs) {
    let HTML = `<div class="music-card">
                    <div class="SALM">
                         <i class="fa-solid fa-music fa-sm"></i>
                         <div class="SA">
                            <div class="name">${element.album}</div>
                            <div class="artist">${element.artist}</div>
                            <div class="Link">${element.link}</div>
                         </div>
                    </div>
                    <i class="fa-regular fa-circle-play fa-2xl"></i>
                </div>`;
    music.innerHTML = music.innerHTML + HTML;
  }
  let pbtn = document.getElementById("pm");
  let backward = document.getElementById("bm");
  let forward = document.getElementById("fm");
  let duration =document.getElementById("dur");
  let mbtn=document.getElementById("mb");
  pbtn.addEventListener("click", () => {
    if (pbtn.classList.contains("fa-play")) {
      pbtn.classList.remove("fa-play");
      pbtn.classList.add("fa-pause");
      mbtn.classList.add("fa-beat-fade");
    } else {
      pbtn.classList.remove("fa-pause");
      pbtn.classList.add("fa-play");
      mbtn.classList.remove("fa-beat-fade");
    }
  });

  const player = (audio, pbtn) => {
    pbtn.addEventListener("click", () => {
      if (pbtn.classList.contains("fa-play")) {
        audio.pause();
      } else {
        audio.play();
      }
    });
  };

  let i = 0;
  let j = i % songs.length;
  // console.log(songs[j].link);
  let audio = new Audio(songs[j].link);
  player(audio, pbtn);

  backward.addEventListener("click", () => {
    if (i >= 0) i--;
    j = i % songs.length;
    audio.src = songs[j].link;
    if (pbtn.classList.contains("fa-play")) {
      pbtn.classList.remove("fa-play");
      pbtn.classList.add("fa-pause");
      mbtn.classList.add("fa-beat-fade");
      audio.play();
      // if(audio.src==mc.getElementsByClassName("Link")[0].innerHTML){
      //   mc.classList.add("green")
      // }
    } else {
      audio.play();
    }
    tittle.innerHTML=songs[j].album;
    artist.innerHTML=songs[j].artist;
    duration.innerText = "0:0";
  });

  forward.addEventListener("click", () => {
    i++;
    j = i % songs.length;
    audio.src = songs[j].link;
    if (pbtn.classList.contains("fa-play")) {
      pbtn.classList.remove("fa-play");
      pbtn.classList.add("fa-pause");
      mbtn.classList.add("fa-beat-fade");
      audio.play();
    } else {
      audio.play();
    }
    tittle.innerHTML=songs[j].album;
    artist.innerHTML=songs[j].artist;
    // duration.innerText = "0:0";
  });

  Array.from(document.querySelector(".Musics").getElementsByClassName("music-card")).forEach((e)=>{
        e.addEventListener("click", () => {
       audio.src=e.querySelector(".Link").innerHTML;
      //  for (const element of songs) {
      //     if(audio)
      //  }
       if (pbtn.classList.contains("fa-play")) {
        pbtn.classList.remove("fa-play");
        pbtn.classList.add("fa-pause");
        mbtn.classList.add("fa-beat-fade");
        audio.play();
      } 
      else {
        audio.play();
      }
      tittle.innerHTML=e.querySelector(".name").innerHTML;
      artist.innerHTML=e.querySelector(".artist").innerHTML;
        })
  })

  audio.addEventListener("timeupdate", () => {
    let now = audio.currentTime;
    let min = Math.floor((-now + audio.duration) / 60);
    let sec = Math.floor((-now + audio.duration) % 60);
    // console.log(min);
    // console.log(sec);
    duration.innerText = `${min}:${sec}`;
    
  });
// console.log( Array.from(document.querySelector(".Musics").getElementsByClassName("music-card")));

})();
