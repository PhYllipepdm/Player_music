let musicas = [
    {titulo:'808',artista:'Jovem Dex',src:'musicas/808.mp3',img:'img/jovemD.jpg'},
    {titulo:'NVMD DOC',artista:'Caio Luccas',src:'musicas/Caio Luccas - NVMD DOC OBRIGADO (PROD. Mozin, Dallass, Luchinha) dir. Shawlin_ofc.mp3'
    ,img:'img/caio-lucas.jpg'},
    {titulo:'My Spookiest Beat',artista:'Spookiest Beat',src:'musicas/prolly my spookiest beat.mp3',img:'img/spookiestBeat.jpg'}

];

let musica = document.querySelector('audio');

let indexMusica = 0;

musica.addEventListener('loadedmetadata', function() {
    let duracaoMusica = document.querySelector('.fim');
    duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));
});

let imagem = document.querySelector('img');
let nomeMusica = document.querySelector('.descricao h2');
let nomeArtista = document.querySelector('.nomeArtista');

renderizarMusica(indexMusica);
//Eventos
let botaoStart = document.getElementById('botao-play')
botaoStart.addEventListener('click',tocarMusica)

musica.addEventListener('timeupdate',atualizarBarra)

let botaoPause = document.querySelector('.botao-pause');
botaoPause.addEventListener('click',pausarMusica);

document.querySelector('.anterior').addEventListener('click',() => { //função anônima
    indexMusica --;
    if(indexMusica<0){
        indexMusica = 2;
    }
    renderizarMusica(indexMusica);
});

document.querySelector('.proxima').addEventListener('click',() => { //função anônima
    indexMusica ++ ;
    if(indexMusica>2){
        indexMusica = 0;
    }
    renderizarMusica(indexMusica);
});

//Funções

function renderizarMusica(index){
    musica.setAttribute('src',musicas[index].src)
    musica.addEventListener('loadeddata', () => {
        nomeMusica.textContent = musicas[index].titulo;
        nomeArtista.textContent = musicas[index].artista;
        imagem.src = musicas[index].img;
    }); //Quando a música carregar vai executar a função
}


function tocarMusica(){
    musica.play();
    document.querySelector('.botao-pause').style.display = 'block';
    botaoStart.style.display = 'none';
}

function pausarMusica(){
    musica.pause();
    document.querySelector('.botao-pause').style.display = 'none';
    botaoStart.style.display = 'block';
}

function atualizarBarra() {
    let barra = document.querySelector('progress');
    const progresso = (musica.currentTime / musica.duration) * 100;
    barra.style.width = progresso + '%';
    let tempoDecorrido = document.querySelector('.inicio');
    tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime));
}

function segundosParaMinutos(segundos){
    let campoMinuto = Math.floor(segundos/60);
    let campoSegundos = segundos % 60;

    if(campoSegundos<10){
        campoSegundos = '0' + campoSegundos;
    }
    return campoMinuto+ ':' +campoSegundos;
}

