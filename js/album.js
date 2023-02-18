let container = document.querySelector(`.album`);
let playlist = document.querySelector(`.playlist`);
let search = new URLSearchParams(window.location.search);
let i = search.get(`i`);
album = albums[i];

if(!album){
    container.innerHTML = `Ошибка<br>Редирект на главную через 3 секунды`;
    setTimeout(() => {
        window.location.pathname = `/music/index.html`;
    }, 3000);
} else {
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

    let tracks = album.tracks;
    for (let index = 0; index < tracks.length; index++) {
        let track = tracks[index];
        playlist.innerHTML += `
            <li class="list-group-item d-flex align-items-center">
                <img src="assets/play-button.png" alt="Играть" height="30px" class="me-3">
                <div>
                    <div>${track.title}</div>
                    <div>${track.author}</div>
                </div>
                <div class="ms-auto">${track.time}</div>
            </li>
        `;
    }
}
