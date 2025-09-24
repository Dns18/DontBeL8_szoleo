    const WORD_LENGTH = 5;
    const MAX_GUESSES = 6;

    // Magyar szólista ékezetekkel
   let WORDS = [];

fetch('szolista.json')
  .then(response => response.json())
  .then(jsonObj => {
    WORDS = jsonObj.szavak.map(s => s.toLowerCase());
    startGame();  // start the game after loading words
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
      ['a','s','d','f','g','h','j','k','l','é','á','ű'],
      ['Enter','y','x','c','v','b','n','m','ö','ü','ó','Backspace']
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

    function revealGuess(guess){
      const solutionArr = solution.split('');
      const guessArr = guess.split('');
      const tileEls = [];
      for(let c=0;c<WORD_LENGTH;c++) tileEls.push(document.getElementById(`tile-${currentRow}-${c}`));

      const result = Array(WORD_LENGTH).fill('absent');
      const solCount = {};
      for(let i=0;i<WORD_LENGTH;i++){
        const s = solutionArr[i]; solCount[s] = (solCount[s]||0)+1;
      }
      for(let i=0;i<WORD_LENGTH;i++){
        if(guessArr[i]===solutionArr[i]){ result[i]='correct'; solCount[guessArr[i]]--; }
      }
      for(let i=0;i<WORD_LENGTH;i++){
        if(result[i]==='correct') continue;
        const g = guessArr[i];
        if(solCount[g] && solCount[g]>0){ result[i]='present'; solCount[g]--; }
      }

      tileEls.forEach((el,i)=>{
        el.classList.add('pop');
        el.classList.add('revealed');
        el.classList.add(result[i]);
        el.setAttribute('aria-label', result[i]);
        const keyEl = document.getElementById('key-'+guessArr[i].toLowerCase());
        if(keyEl){
          const prev = keyEl.dataset.state;
          const rank = {absent:0,present:1,correct:2};
          if(!prev || rank[result[i]] > rank[prev]){
            keyEl.dataset.state = result[i];
            keyEl.classList.add(result[i]);
          }
        }
        setTimeout(()=>el.classList.remove('pop'), 300);
      });

      setTimeout(()=>{
        if(guess===solution){
          const msgEl = document.getElementById('message');
          msgEl.classList.add('win');
          message(`Nyertél! A szó: ${solution.toUpperCase()}`,0);
          setTimeout(()=>msgEl.classList.remove('win'), 5000); // 5 másodpercig marad
          gameOver=true; return;
        }
        currentRow++; currentCol=0;
        if(currentRow>=MAX_GUESSES){
          message(`Vesztettél. A szó: ${solution.toUpperCase()}`, 6000);
          gameOver=true; return;
        }
      }, WORD_LENGTH*250 + 200);
    }

    window.addEventListener('keydown', (e)=>{
      if(e.key==='Enter' || e.key==='Backspace' || /^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ]$/.test(e.key)){
        e.preventDefault();
        handleKey(e.key.length===1? e.key : e.key);
      }
    });

    newBtn.addEventListener('click', startGame);

    startGame();

    window.__WORDLE = {setWords:(arr)=>{ if(Array.isArray(arr) && arr.length){ WORDS.length=0; arr.forEach(s=>WORDS.push(s.toLowerCase())); startGame(); } }};