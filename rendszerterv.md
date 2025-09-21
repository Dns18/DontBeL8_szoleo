# Rendszerterv – Szóleó (magyar Wordle klón)

## 1. Cél és áttekintés
A **Szóleó** egy böngészőben játszható magyar nyelvű szórejtvény játék, amely a Wordle mintájára készült.  
A cél, hogy a játékos egy véletlenszerűen kiválasztott **6 betűs magyar szót** találjon ki **7 próbálkozás** alatt.  
A rendszer webes frontend technológiákra épül, telepítés nélkül, azonnal játszható.

---

## 2. Rendszer architektúra

### 2.1 Fő komponensek
- **Felhasználói felület (UI)**  
  - HTML alapú játékrács a próbálkozások megjelenítésére  
  - Virtuális képernyő-billentyűzet + fizikai billentyűzet támogatás  
  - Sötét/világos mód váltható  

- **Játéklogika (JavaScript modulok)**  
  - Véletlen szó kiválasztása a szólistából  
  - Beírt szó ellenőrzése (érvényes szó-e)  
  - Betűk összehasonlítása és színkódolás előállítása  
  - Próbálkozások számlálása, győzelem/vesztés állapot kezelése  

- **Adattárolás**  
  - **Szólista**: magyar 6 betűs szavak JSON fájlban  
  - **Játékállapot**: böngésző `localStorage` (mentés és folytatás lehetősége)  

### 2.2 Architektúra ábra (logikai modell)

Felhasználó
│
▼
Felhasználói felület (HTML, CSS)
│
▼
Játéklogika (JavaScript)
├── Szó kiválasztás
├── Ellenőrzés
├── Színkódolás
│
▼
Adatok
├── Szólista (JSON)
└── Állapot (localStorage)

---

## 3. Folyamatleírás

1. **Játék indítása**  
   - Betöltődik a szólista  
   - Kiválasztásra kerül egy véletlen 6 betűs magyar szó  

2. **Felhasználói bemenet**  
   - A játékos beír egy 6 betűs szót  
   - A rendszer ellenőrzi, hogy érvényes szó-e  

3. **Értékelés és visszajelzés**  
   - Betűk összehasonlítása a célszóval  
   - Színezés szabályok szerint:  
     - 🟩 jó helyen jó betű  
     - 🟦 jó helyen lévő betű, de más ékezettel  
     - 🟨 rossz helyen lévő jó betű  
     - 🟪 rossz helyen lévő betű, de más ékezettel  
     - ⬜️ nem szerepel a szóban  

4. **Játékmenet folytatása**  
   - Maximum 7 próbálkozás  
   - Nyert/vesztett állapot megjelenítése  

---

## 4. Felhasználói felület terve

- **Játékrács**: 7 sor × 6 oszlop  
- **Virtuális billentyűzet**: magyar ábécé betűi (ékezetes karakterekkel)  
- **Téma támogatás**: sötét/világos mód, automatikus váltás `prefers-color-scheme` alapján  

---

## 5. Technológiai háttér

- **Frontend**:  
  - HTML5 – szerkezet  
  - CSS3 / TailwindCSS – reszponzív stílusok, témák  
  - React / JavaScript (ES6+) – játéklogika  

- **Adattárolás**:  
  - Szólista: JSON állomány (6 betűs magyar szavak)  
  - Játékállapot: böngésző `localStorage`  

- **Követelmények**:  
  - Modern böngésző (Chrome, Firefox, Edge, Safari)  
  - Mobil és desktop támogatás  

---

## 6. Nem funkcionális szempontok

- **Teljesítmény**: gyors betöltés, minimális külső függőség  
- **Reszponzivitás**: jól használható mobilon és asztali gépen  
- **Karbantarthatóság**: moduláris JavaScript kód, tiszta CSS  
- **Hozzáférhetőség**: megfelelő kontraszt, színek mellé vizuális jelek  

---