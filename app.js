const board = document.getElementById('board');
const cells = Array.from(board.getElementsByClassName('cell'));
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');

// Inicializa o jogador atual e o estado do tabuleiro
let currentPlayer = 'X';
let boardState = Array(9).fill(null);

// Combinações vencedoras possíveis
const CCombinations = [
    [0, 1, 2], // Linha superior
    [3, 4, 5], // Linha do meio
    [6, 7, 8], // Linha inferior
    [0, 3, 6], // Coluna esquerda
    [1, 4, 7], // Coluna do meio
    [2, 5, 8], // Coluna direita
    [0, 4, 8], // Diagonal principal
    [2, 4, 6], // Diagonal secundária
];

// Função para verificar se há um vencedor ou empate
function checkWinner() {
    for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return boardState[a]; // Retorna o vencedor
        }
    }
    return boardState.includes(null) ? null : 'Tie'; // Retorna 'Tie' se o tabuleiro estiver cheio
}

// Função para lidar com cliques nas células do tabuleiro
function handleClick(e) {
    const index = e.target.dataset.index;

    // Verifica se a célula já foi preenchida ou se já há um vencedor
    if (boardState[index] || checkWinner()) return;

    // Atualiza o estado do tabuleiro e o conteúdo da célula clicada
    boardState[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    // Verifica se há um vencedor após a jogada
    const winner = checkWinner();
    if (winner) {
        status.textContent = winner === 'Tie' ? 'Empate!' : `${winner} venceu!`;
        return;
    }

    // Troca o jogador atual e atualiza o status
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `É a vez do jogador ${currentPlayer}`;
}

// Função para reiniciar o jogo
function resetGame() {
    boardState = Array(9).fill(null);
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    status.textContent = `É a vez do jogador ${currentPlayer}`;
}

// Adiciona ouvintes de eventos aos elementos
board.addEventListener('click', handleClick);
resetButton.addEventListener('click', resetGame);

// Inicializa o jogo
resetGame();