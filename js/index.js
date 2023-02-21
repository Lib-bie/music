let container = document.querySelector(`.albums`);
let input = document.querySelector(`.form-control`);


render();
input.addEventListener(`input`, searchByTitle);


// Выыод альбомов
function render(){
    container,innerHTML = ``;
    for(let i = 0; i < albums.length; i++){
        renderItem(i);
    }
}

// Вывод одного альбома
function renderItem(i){
    album = albums[i];
    container.innerHTML += `
        <div class="col">
            <a href="album.html?i=${i}" class="text-decoration-none">
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

// Поиск альбома по названию
function searchByTitle(){
    let search = input.value.toLowerCase();
    
    container.innerHTML = ``;

    for(let i = 0; i < albums.length; i++){
        let albumTitle = albums[i].title.toLowerCase();
        if(albumTitle.includes(search)){
            renderItem(i);
        }
    }
}