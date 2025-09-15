# Követelményspecifikáció – Szóleó

Ez a dokumentum a **Szóleó** nevű szórejtvény játék követelményeit tartalmazza. A játék célja, hogy a felhasználó meghatározott számú próbálkozásból kitaláljon egy ötbetűs magyar szót.

---

## 1. Funkcionális követelmények

| Azonosító | Leírás |
|-----------|--------|
| F1 | A rendszer tudjon véletlenszerűen szót választani egy listából. |
| F2 | A felhasználó maximum 6 próbálkozással tippelhet egy 5 betűs magyar szót. |
| F3 | A rendszer minden tipp után jelezze vissza a betűk helyességét színkódolással. |
| F4 | A bevitt szó legyen érvényes (szerepeljen a szótárban). |
| F5 | A játék végén jelenjen meg a helyes szó. |
| F6 | Legyen napi kihívás funkció (napi egy meghatározott szó). |
| F7 | Legyen gyakorló mód véletlenszerű szavakkal. |
| F8 | Legyen lehetőség új játék indítására a játék végén. |

---

## 2. Nem-funkcionális követelmények

| Azonosító | Leírás |
|-----------|--------|
| NF1 | A játék legyen reszponzív (mobilbarát). |
| NF2 | Az UI legyen letisztult és felhasználóbarát. |
| NF3 | A játék maximum 2 másodperc alatt töltődjön be. |
| NF4 | A játék működjön modern böngészőkben (Chrome, Firefox, Safari, Edge). |
| NF5 | Legyen támogatva sötét / világos téma. |
| NF6 | A rendszer ne engedje meg nem-alfabetikus karakterek bevitelét. |

---

## 3. Technológiai követelmények

| Azonosító | Leírás |
|-----------|--------|
| T1 | A frontend készülhet Vanilla JS-ben vagy React-ben. |
| T2 | A szólista egy JSON fájlban vagy API-n keresztül elérhető formátumban legyen tárolva. |
| T3 | Az alkalmazás legyen hosztolható statikus weboldalként (Netlify, GitHub Pages, Vercel stb.). |
| T4 | A backend opcionális, csak ha statisztikát vagy napi szót akarunk szerver oldalon kezelni. |


---

## Verzió

**Dokumentum verziója:** 1.0  
**Dátum:** 2025-09-15  
**Készítette:** DontBeL8