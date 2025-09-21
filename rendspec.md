# Rendszer specifikáció – Szóleó (magyar Wordle klón)

## 1. Bevezetés
A **Szóleó** egy böngészőben játszható magyar nyelvű szórejtvény játék, amely a népszerű *Wordle* mintájára készült.  
Célja, hogy a játékos egy véletlenszerűen kiválasztott **6 betűs magyar szót** találjon ki **7 próbálkozás** alatt.  
A játék közben a rendszer színkódolt visszajelzést ad minden próbálkozás után.

---

## 2. Funkcionális követelmények

### 2.1 Játékmenet
- A játék minden indításkor kiválaszt egy véletlen **6 betűs magyar szót** az engedélyezett szólistából.
- A játékos legfeljebb **7 próbálkozással** találhatja ki a szót.
- Minden beírt szó ellenőrzésre kerül:  
  - csak érvényes magyar szó (a szólistában szerepelhet) fogadható el.
  - érvénytelen szó esetén visszajelzést kap a játékos.

### 2.2 Visszajelzés színek alapján
- **🟩 Zöld:** jó helyen jó betű  
- **🟦 Kék:** jó helyen lévő betű, de más ékezettel  
- **🟨 Sárga:** rossz helyen lévő jó betű  
- **🟪 Lila:** rossz helyen lévő betű, de más ékezettel  
- **⬜ Szürke:** a betű nem szerepel a szóban

### 2.3 Felhasználói felület
- Egyszerű és mobilbarát kezelőfelület.  
- Billentyűzet támogatás: fizikai billentyűzet és virtuális képernyő-billentyűzet.  
- Téma választás: **sötét** és **világos** mód.  
- A próbálkozások eredménye táblázatos rácsban (grid) jelenik meg.  

---

## 3. Nem funkcionális követelmények
- **Reszponzív dizájn**: asztali és mobil eszközön egyaránt jól használható.  
- **Gyors betöltés**: minimalizált HTML, CSS, JavaScript használatával.  
- **Hozzáférhetőség**: színek mellett ikonok és kontraszt figyelembevétele.  
- **Nyelvi sajátosságok**: ékezetes betűk (á, é, í, ó, ö, ő, ú, ü, ű) kezelése.  

---

## 4. Technológia
- **Frontend**: HTML, CSS, JavaScript  
- **Keretrendszer**: React
- **Szólista**: magyar 6 betűs szavak szótára  
- **Tárolás**: játékállapot tárolása böngészőben (localStorage)  