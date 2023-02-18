let container = document.querySelector(`.albums`);
console.log(window.location)
for (let index = 0; index < albums.length; index++) {
    album = albums[index];
    container.innerHTML += `
        <div class="col">
            <a href="album.html?i=${index}" class="text-decoration-none">
                <div class="card">
                    <img src="${album.img}" alt="Бег" class="card-img-top">
                    <div class="card-body">
                        <p class="card-text">${album.title}</p>
                    </div>
                </div>
            </a>
        </div>
    `;
}