const WORD_LENGTH = 5;
    const MAX_GUESSES = 6;

    // Magyar szólista ékezetekkel
   let WORDS = [];

// Beolvassuk az 5 betűs szavakat json-ből
fetch('szolista.json')
  .then(response => response.json())
  .then(jsonObj => {
    WORDS = jsonObj.szavak.map(s => s.toLowerCase());
    startGame();
  })
  .catch(err => console.error("Hiba a szólista betöltésekor:", err));

    const boardEl = document.getElementById('board');
    const keyboardEl = document.getElementById('keyboard');
    const messageEl = document.getElementById('message');
    const newBtn = document.getElementById('newBtn');

    let solution = '';
    let currentRow = 0;
    let currentCol = 0;
    let board = Array.from({length:MAX_GUESSES},()=>Array(WORD_LENGTH).fill(''));
    let state = Array.from({length:MAX_GUESSES},()=>Array(WORD_LENGTH).fill(''));
    let gameOver = false;
let score = 0;
let scoreList = []; // pontok listája

function updateScoreboard() {
  const scoreboard = document.getElementById('scoreboard');
  if (!scoreList.length) {
    scoreboard.innerHTML = '<em>Még nincs pontod.</em>';
    return;
  }
  scoreboard.innerHTML = `<b>Pontok:</b><ul style="margin-top:6px;">${
    scoreList.map((item, i) =>
      `<li>Játék ${i+1}: <b>${item.word.toUpperCase()}</b> — <span style="color:${item.points>0?'green':'red'}">${item.points} pont</span></li>`
    ).join('')
  }</ul><div style="margin-top:8px;"><b>Összesen: ${score} pont</b></div>`;
}

    function createBoard(){
      boardEl.innerHTML='';
      for(let r=0;r<MAX_GUESSES;r++){
        const row = document.createElement('div'); row.className='row';
        for(let c=0;c<WORD_LENGTH;c++){
          const tile = document.createElement('div');
          tile.className='tile';
          tile.id = `tile-${r}-${c}`;
          tile.setAttribute('aria-label', 'üres');
          row.appendChild(tile);
        }
        boardEl.appendChild(row);
      }
    }

    const KEYS = [
      ['q','w','e','r','t','z','u','i','o','p','ő','ú'],
      ['a','s','d','f','g','h','j','k','l','í','é','á','ű'],
      ['Enter','y','x','c','v','b','n','m','ö','ü','Backspace']
    ];

    function createKeyboard(){
      keyboardEl.innerHTML='';
      KEYS.forEach(row=>{
        const rowEl = document.createElement('div'); rowEl.className='keyrow';
        row.forEach(k=>{
          const key = document.createElement('div'); key.className='key';
          key.textContent = k.length>1 ? k : k.toUpperCase();
          if(k==='Enter'||k==='Backspace') key.classList.add('wide');
          key.addEventListener('click', ()=>handleKey(k));
          key.id = `key-${k.toLowerCase()}`;
          rowEl.appendChild(key);
        });
        keyboardEl.appendChild(rowEl);
      });
    }

    function pickWord(){
      const idx = Math.floor(Math.random()*WORDS.length);
      return WORDS[idx];
    }

    function startGame(){
      solution = pickWord();
      currentRow=0; currentCol=0; gameOver=false;
      board = Array.from({length:MAX_GUESSES},()=>Array(WORD_LENGTH).fill(''));
      state = Array.from({length:MAX_GUESSES},()=>Array(WORD_LENGTH).fill(''));
      createBoard(); createKeyboard(); message('');
      updateScoreboard();
    }

    function message(txt, timeout=2000){
      messageEl.textContent = txt;
      if(timeout>0){
        clearTimeout(messageEl._t);
        messageEl._t = setTimeout(()=>{ if(messageEl.textContent===txt) messageEl.textContent=''; }, timeout);
      }
    }

    function handleKey(key){
      if(gameOver) return;
      if(key==='Backspace') return removeLetter();
      if(key==='Enter') return submitGuess();
      if(typeof key === 'string' && key.length===1){
        addLetter(key);
      }
    }

    function addLetter(letter){
      if(currentCol>=WORD_LENGTH) return;
      board[currentRow][currentCol]=letter.toLowerCase();
      const tile = document.getElementById(`tile-${currentRow}-${currentCol}`);
      tile.textContent=letter.toUpperCase();
      currentCol++;
    }

    function removeLetter(){
      if(currentCol<=0) return;
      currentCol--;
      board[currentRow][currentCol]='';
      const tile = document.getElementById(`tile-${currentRow}-${currentCol}`);
      tile.textContent='';
    }

    function submitGuess(){
      if(currentCol<WORD_LENGTH){ message('Túl rövid'); return; }
      const guess = board[currentRow].join('');
      revealGuess(guess);
    }

    function getPoints(row) {
      // Ha elsőre találja ki: 6 pont, ha utolsóra: 1 pont
      return MAX_GUESSES - row;
    }

    function revealGuess(guess) {
      const solutionArr = solution.split('');
      const guessArr = guess.split('');
      const tileEls = [];

      for (let c = 0; c < WORD_LENGTH; c++) {
        tileEls.push(document.getElementById(`tile-${currentRow}-${c}`));
      }

      const result = Array(WORD_LENGTH).fill('absent');

      // Számolja meg a betűket az eredménybe
      const solCount = {};
      for (let i = 0; i < WORD_LENGTH; i++) {
        const s = solutionArr[i];
        solCount[s] = (solCount[s] || 0) + 1;
      }

      // Ékezet map a magánhangzóknak
      const accentMap = {
        'a': 'aá', 'á': 'aá',
        'e': 'eé', 'é': 'eé',
        'i': 'ií', 'í': 'ií',
        'o': 'oóöő', 'ó': 'oóöő', 'ö': 'oóöő', 'ő': 'oóöő',
        'u': 'uúüű', 'ú': 'uúüű', 'ü': 'uúüű', 'ű': 'uúüű'
      };
      const vowels = Object.keys(accentMap);

      function getAccentGroup(letter) {
        return accentMap[letter.toLowerCase()] || letter.toLowerCase();
      }

      // Első: a helyes betűk
      for (let i = 0; i < WORD_LENGTH; i++) {
        if (guessArr[i] === solutionArr[i]) {
          result[i] = 'correct';
          solCount[guessArr[i]]--;
        }
      }

      // Második: jelenléti vagy ékezet hibák
      for (let i = 0; i < WORD_LENGTH; i++) {
        if (result[i] === 'correct') continue;

        const g = guessArr[i];
        const gGroup = getAccentGroup(g);

        let found = false;

        // Csekkolja az ékezeteket máshol
        for (let j = 0; j < WORD_LENGTH; j++) {
          if (i === j) continue;
          if (g === solutionArr[j] && solCount[solutionArr[j]] > 0) {
            result[i] = 'present';
            solCount[solutionArr[j]]--;
            found = true;
            break;
          }
        }

        if (found) continue;

        // Csekkolja a rossz ékezeteket
        for (let j = 0; j < WORD_LENGTH; j++) {
          if (solCount[solutionArr[j]] > 0 && getAccentGroup(solutionArr[j]) === gGroup) {
            if (vowels.includes(g.toLowerCase())) {
              if (i === j) {
                result[i] = 'almostcorrect'; // blue
              } else {
                result[i] = 'almostpresent'; // purple
              }
              solCount[solutionArr[j]]--;
            }
            break;
          }
        }
      }

      // Rakja be a helyes színeket a négyzetre/billentyűre
      tileEls.forEach((el, i) => {
        el.classList.remove('absent', 'present', 'correct', 'almostcorrect', 'almostpresent');
        el.classList.add('pop', 'revealed', result[i]);
        el.setAttribute('aria-label', result[i]);

        const keyEl = document.getElementById('key-' + guessArr[i].toLowerCase());
        if (keyEl) {
          const prev = keyEl.dataset.state;
          const rank = { absent: 0, almostcorrect: 1, almostpresent: 2, present: 3, correct: 4 };
          if (!prev || rank[result[i]] > rank[prev]) {
            keyEl.dataset.state = result[i];
            keyEl.classList.remove('absent', 'present', 'correct', 'almostcorrect', 'almostpresent');
            keyEl.classList.add(result[i]);
          }
        }

        setTimeout(() => el.classList.remove('pop'), 300);
      });

      // Nyerés észlelő
      setTimeout(() => {
        if (guess === solution) {
          const points = getPoints(currentRow);
          score += points;
          scoreList.push({ word: solution, points });
          messageEl.classList.add('win');
          message(`Nyertél! A szó: ${solution.toUpperCase()} +${points} pont`, 0);
          setTimeout(() => messageEl.classList.remove('win'), 5000);
          gameOver = true;
          updateScoreboard();
          return;
        }

        currentRow++;
        currentCol = 0;

        if (currentRow >= MAX_GUESSES) {
          scoreList.push({ word: solution, points: 0 });
          message(`Vesztettél. A szó: ${solution.toUpperCase()} | Pont: 0`, 6000);
          gameOver = true;
          updateScoreboard();
          return;
        }
      }, WORD_LENGTH * 250 + 200);
    }

    // Feladom button
    const revealBtn = document.getElementById('revealBtn');
    revealBtn.addEventListener('click', () => {
      if (gameOver) return;

      const solutionArr = solution.split('');
      for (let c = 0; c < WORD_LENGTH; c++) {
        const tile = document.getElementById(`tile-${currentRow}-${c}`);
        tile.textContent = solutionArr[c].toUpperCase();
        // Töröljük az eddigi színeket
        tile.classList.remove('correct', 'present', 'absent', 'almostcorrect', 'almostpresent', 'revealed', 'pop');

        // 'absent' színt rakunk a jelenlegi sorra, mert feladjuk
        tile.classList.add('absent');
      }

      message(`A szó: ${solution.toUpperCase()}`, 6000);
      gameOver = true;
    });

    window.addEventListener('keydown', (e)=>{
      if(e.key==='Enter' || e.key==='Backspace' || /^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ]$/.test(e.key)){
        e.preventDefault();
        handleKey(e.key.length===1? e.key : e.key);
      }
    });

    newBtn.addEventListener('click', () => {
      startGame();
      // Új játék indításakor nem nullázzuk a score-t, így folyamatosan gyűjtheti a pontokat
    });

    const themeBtn = document.getElementById('themeBtn');
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('light');
  themeBtn.textContent = document.body.classList.contains('light') ? '☀️' : '🌙';
});

    startGame();

    window.__WORDLE = {setWords:(arr)=>{ if(Array.isArray(arr) && arr.length){ WORDS.length=0; arr.forEach(s=>WORDS.push(s.toLowerCase())); startGame(); } }};