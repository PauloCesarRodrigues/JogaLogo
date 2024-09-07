let jogos = [];


async function carregarJogos() {
  try {
    const response = await fetch('jogos.json');
    if (!response.ok) {
      throw new Error('Erro ao carregar o arquivo JSON');
    }
    jogos = await response.json();
  } catch (error) {
    console.error('Erro:', error);
  }
}


function filtrarJogos() {
  const termoPesquisa = document.querySelector('#pesquisa').value.toLowerCase();
  const listaJogos = document.querySelector('#lista-jogos');


  listaJogos.innerHTML = '';


  const resultados = jogos.filter(jogo => {
    return (
      jogo.nome.toLowerCase().includes(termoPesquisa) ||
      jogo.descricao.toLowerCase().includes(termoPesquisa)
    );
  });


  if (resultados.length > 0 && resultados.length <= 5) {
    resultados.forEach(jogo => {
      const card = document.createElement('div');
      card.classList.add('resultados__card');

      const jogoDiv = document.createElement('div');
      jogoDiv.classList.add('resultados__jogo');

      const titulo = document.createElement('h2');
      titulo.classList.add('resultados__titulo');
      titulo.textContent = jogo.nome;

      const plataformas = document.createElement('div');
      plataformas.classList.add('resultados__plataformas');
      plataformas.textContent = jogo.plataformas.join(', ');

      const descricao = document.createElement('p');
      descricao.classList.add('resultados__descricao');
      descricao.textContent = jogo.descricao;

      const link = document.createElement('a');
      link.classList.add('resultados__link');
      link.href = jogo.link;
      link.textContent = 'Acesse a Página oficial do jogo';
      link.target = '_blank';

      jogoDiv.appendChild(titulo);
      jogoDiv.appendChild(plataformas);
      jogoDiv.appendChild(descricao);
      jogoDiv.appendChild(link);

      card.appendChild(jogoDiv);
      listaJogos.appendChild(card);
    });
} else if (resultados.length > 6) {
    const mensagemInfo = document.createElement('p');
    mensagemInfo.classList.add('mensagem-info');
    mensagemInfo.textContent = 'Muitos resultados encontrados. Continue digitando para refinar a pesquisa.';
    listaJogos.appendChild(mensagemInfo);
} else {
    const mensagemErro = document.createElement('p');
    mensagemErro.textContent = 'Nenhum jogo encontrado.';
    mensagemErro.style.color = 'red';
    listaJogos.appendChild(mensagemErro);
  }
}


document.querySelector('#pesquisa').addEventListener('input', filtrarJogos);


carregarJogos();