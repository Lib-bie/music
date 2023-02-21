let container = document.querySelector(`.album`);
let playlist = document.querySelector(`.playlist`);
let input = document.querySelector(`.form-control`);

let album = getAlbum();
let tracks = album.tracks;
    
if(!album){
    renderError();
} else {
    renderAlbumInfo();
    renderTracks();
    setupAudio();
    input.addEventListener(`input`, searchByTitle);
}

// Получаем нужный альбом из массива
function getAlbum(){
    let search = new URLSearchParams(window.location.search);
    let i = search.get(`i`);
    return albums[i];
}

// Если альбом не найден
function renderError(){
    container.innerHTML = `Ошибка<br>Редирект на главную через 3 секунды`;
    setTimeout(() => {
        window.location.pathname = `/music/index.html`;
    }, 3000);
}

// Вывод информации об альбоме
function renderAlbumInfo(){
    container.innerHTML = `
        <div class="card mb-3">
            <div class="row">
                <div class="col-md-4">
                    <img src="${album.img}" alt="Картинка альбома" class="img-fluid rounded-start">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${album.title}</h5>
                        <p class="card-text">${album.discription}</p>
                        <p class="card-text"><small class="text-muted">Сборник выпущен в ${album.year} году</small></p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Вывод треков из альбома
function renderTracks(){
    for (let i = 0; i < tracks.length; i++) {
        renderTrack(i)
    }
}

// Вывод одного трека
function renderTrack(i){
    let track = tracks[i];
    playlist.innerHTML += `
        <li class="track list-group-item d-flex align-items-center">
            <img src="assets/play.png" alt="Играть" height="30px" class="me-3 img-play">
            <img src="assets/pause.png" alt="Играть" height="30px" class="me-3 img-pause d-none">
            <div>
                <div>${track.title}</div>
                <div>${track.genre}</div>
            </div>
            <div class="progress ms-auto w-50" role="progressbar" aria-label="Warning example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar bg-warning" style="width: 0%"></div>
            </div>
            <div class="time ms-3 d-flex justify-content-end">${track.time}</div>
            <audio class="audio" src="${track.src}"></audio>
        </li>
    `;
}

// Код для запуска звуков
function setupAudio() {
    // Найди коллекцию с треками
    let trackNodes = document.querySelectorAll(`.track`); 
    let tracks = album.tracks;
    for (let i = 0; i < trackNodes.length; i++) { 
        // Один элемент
        let node = trackNodes[i];
        let timeNode = node.querySelector(`.time`);
        let progressNode = node.querySelector(`.progress-bar`);
        // Тег аудио внутри этого элемента
        let audio = node.querySelector(`.audio`); 
        let track = tracks[i];

        let imgPause = node.querySelector(`.img-pause`);
        let imgPlay = node.querySelector(`.img-play`);
        node.addEventListener(`click`, function () {
            // Если трек сейчас играет...
            if (track.isPlaying) {
                track.isPlaying = false;
                // Поставить на паузу
                audio.pause();
                imgPause.classList.add(`d-none`);
                imgPlay.classList.remove(`d-none`);
            // Если трек сейчас не играет...
            } else {
                track.isPlaying = true;
                // Включить проигрывание
                audio.play();
                imgPause.classList.remove(`d-none`);
                imgPlay.classList.add(`d-none`);
                updateProgress();
            }
        });
        function updateProgress() {
            // Нарисовать актуальное время
            let time = getTime(audio.currentTime)
            if(time != timeNode.innerHTM){
                progressNode.style = `width: ${audio.currentTime / audio.duration * 100}%`
                timeNode.innerHTML = time;
                requestAnimationFrame(updateProgress);
            }
          }
    }
}

// Поиск трека по названию
function searchByTitle(){
    let search = input.value.toLowerCase();
    
    playlist.innerHTML = ``;

    for(let i = 0; i < tracks.length; i++){
        let trackTitle = tracks[i].title.toLowerCase();
        let albumGenre = tracks[i].genre.toLowerCase();
        if(trackTitle.includes(search) || albumGenre.includes(search)){
            renderTrack(i);
        }
    }
}

// Счётчик времени для треков
function getTime(time){
    let currentSeconds = Math.floor(time);
    let minutes = Math.floor(currentSeconds / 60);
    let seconds = Math.floor(currentSeconds % 60);
    if(minutes < 10){
        minutes = `0`+ minutes;
    }
    if(seconds < 10){
        seconds = `0`+ seconds;
    }
    return `${minutes}:${seconds}`
}