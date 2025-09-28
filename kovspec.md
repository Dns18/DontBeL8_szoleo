# Követelményspecifikáció – Szóleó

Ez a dokumentum a **Szóleó** nevű szórejtvény játék követelményeit tartalmazza. A játék célja, hogy a felhasználó meghatározott számú próbálkozásból kitaláljon egy hatbetűs magyar szót, hét próbálkozásból.

---

## 1. Funkcionális követelmények

| Azonosító | Leírás |
|-----------|--------|
| 1.1 | A rendszer tudjon véletlenszerűen szót választani egy listából. |
| 1.2 | A felhasználó maximum 6 próbálkozással tippelhet egy 5 betűs magyar szót. |
| 1.3 | A rendszer minden tipp után jelezze vissza a betűk helyességét színkódolással. |
| 1.4 | A bevitt szó legyen érvényes (szerepeljen a szótárban). |
| 1.5 | A játék végén jelenjen meg a helyes szó. |
| 1.6 | Lehessen új szót generálni. |
| 1.7 | Legyen lehetőség új játék indítására a játék végén. |

---

## 2. Nem-funkcionális követelmények

| Azonosító | Leírás |
|-----------|--------|
| 2.1 | A játék legyen reszponzív (mobilbarát). |
| 2.2 | Az UI legyen letisztult és felhasználóbarát. |
| 2.3 | A játék maximum 3 másodperc alatt töltődjön be. |
| 2.4 | A játék működjön modern böngészőkben (Chrome, Firefox, Safari, Edge). |
| 2.5 | Legyen támogatva sötét / világos téma. |
| 2.6 | A rendszer ne engedje meg nem-alfabetikus karakterek bevitelét. |

---

## 3. Technológiai követelmények

| Azonosító | Leírás |
|-----------|--------|
| 3.1 | A frontend készülhet Vanilla JS-ben vagy React-ben. |
| 3.2 | A szólista egy JSON fájlban vagy API-n keresztül elérhető formátumban legyen tárolva. |
| 3.3 | Az alkalmazás legyen hosztolható statikus weboldalként (Netlify, GitHub Pages, Vercel stb.). |
| 3.4 | A backend opcionális, csak ha statisztikát vagy napi szót akarunk szerver oldalon kezelni. |


---

## Verzió

**Dokumentum verziója:** 1.0  
**Dátum:** 2025-09-15  

**Készítette:** DontBeL8

