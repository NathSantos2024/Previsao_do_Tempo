document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('load', () => {
        alterarVideoBackground();
    });  
}) 

    document.getElementById("input-busca").addEventListener('keyup', function(event){
        if(event.keyCode === 13){
            buscaTemp();
            alterarVideoBackground();
        }
    });

    function buscaTemp() {
        var inputValor = document.getElementById("input-busca").value.trim().toLowerCase();
        var [cidade, pais] = inputValor.split(',').map(item => item.trim()).map(item => removerAcentos(item).replace(/ç/g, 'c'));
        var APIkey = "ee7e5dd0def56595006960b8910f8b9c"; 
        var url;

        if (pais) {
            // Se o país foi especificado, use tanto o nome da cidade quanto o código do país na solicitação
            var url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade},${pais}&appid=${APIkey}&units=metric&lang=pt`;
        } else {
            // Caso contrário, use apenas o nome da cidade na solicitação
            var url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${APIkey}&units=metric&lang=pt`;
        } 
        
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Cidade não encontrada! Tente digitar (Cidade, País) para ser mais precisa a sua busca.");
                }
                return response.json();
            })
            .then(data => {
                var temperaturaAtual = data.main.temp;
                var temperaturaMaxima = data.main.temp_max;
                var temperaturaMinima = data.main.temp_min;
                var cidadeNome = data.name;
                var climaIcone = data.weather[0].icon;
                mostraTemp(cidadeNome, temperaturaAtual, temperaturaMaxima, temperaturaMinima, climaIcone);
                limpaBusca(); 
                mostraEnvelope(); 
                alterarVideoBackground(); 
            })
            .catch(error => {
                console.error("Erro ao obter dados!", error.message);
                alert(error.message);
            });
    }

    function mostraEnvelope() {
        document.querySelector('.envelope').classList.add('mostrar'); 
        document.querySelector('.caixa').style.alignItems = 'initial'; 
        document.querySelector('.busca').classList.add('apos-busca');
    }

    function mostraTemp(cidadeNome, temperaturaAtual, temperaturaMaxima, temperaturaMinima, climaIcone) {
        document.querySelector('.icone-tempo').src = `src/img/${climaIcone}.png`;
        document.querySelector('.nome-cidade').innerHTML = `${cidadeNome}`;
        document.querySelector('.temperatura').innerHTML = `${temperaturaAtual.toFixed(0)}°C`;
        document.querySelector('.maxtemperatura').innerHTML = `Máx: ${temperaturaMaxima.toFixed(0)}°C`;
        document.querySelector('.mintemperatura').innerHTML = `Mín: ${temperaturaMinima.toFixed(0)}°C`;
    }

    function limpaBusca() {
        document.getElementById("input-busca").value = "";
    }

    function alterarVideoBackground() {
        // Array com os caminhos dos vídeos
        const videos = [
            './src/video/video1.mp4',
            './src/video/video2.mp4',
            './src/video/video3.mp4',
            './src/video/video4.mp4',
            './src/video/video5.mp4',
            './src/video/video7.mp4',
        ];

        // Seleciona um vídeo aleatório do array
        const randomVideo = videos[Math.floor(Math.random() * videos.length)];

        // Atualiza a origem do vídeo
        document.getElementById("video-source").src = randomVideo;

        // Recarrega o vídeo
        document.querySelector(".video").load();
    }

    function removerAcentos(texto) {
        return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }





