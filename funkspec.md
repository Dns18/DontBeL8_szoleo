# Funkcionális specifikáció – Szóleó

A **Szóleó** egy online, böngészőben játszható szórejtvény játék, amelyben a felhasználónak egy rejtett magyar szót kell kitalálnia meghatározott számú próbálkozással. A rendszer minden próbálkozás után vizuális visszajelzést ad a tippelt betűk helyességéről.

---

## 1. Áttekintés

- **Játék neve:** Szóleó
- **Típus:** Szórejtvény (Wordle-szerű)
- **Platform:** Web (reszponzív)
- **Célcsoport:** Magyar nyelven értő, 10+ korosztály
- **Technológia:** HTML, CSS, JavaScript / React (opcionális backend)

---

## 2. Fő funkciók

### 2.1 Játékindítás
- A játék minden új játék alkalmával kiválaszt egy rejtett szót egy előre definiált szólistából.

### 2.2 Tippelés
- A felhasználó próbálkozásokkal (maximum 6) tippelheti meg a rejtett szót.
- Csak pontosan 5 betűs, érvényes magyar szavak adhatók be.
- Billentyűzettel vagy virtuális képernyő-billentyűzettel történik a bevitel.

### 2.3 Visszajelzés
Minden tipp után a rendszer vizuálisan visszajelzi:
- 🟩 Zöld: helyes betű, jó pozícióban
- 🟨 Sárga: helyes betű, rossz pozícióban
- ⬜️ Szürke: a betű nem szerepel a szóban

### 2.4 Játék vége
- A játék véget ér, ha:
  - a játékos kitalálja a szót, vagy
  - elfogynak a próbálkozásai
- A játék végén megjelenik a helyes szó.
- Új játék indítható (gyakorló módban rögtön, napi módban másnap).

---

## 3. Felhasználói felület

### 3.1 Játékmező
- 6 sor x 5 mező (próbálkozások × betűk)
- Minden mezőben betű és háttérszín visszajelzés

### 3.2 Virtuális billentyűzet
- Megjeleníti az ékezetes magyar karaktereket is
- A gombok színe a próbálkozások alapján frissül (zöld/sárga/szürke)

### 3.3 Navigáció és vezérlés
- Játékmód választás
- Világos / sötét mód váltó
- Statisztika megtekintése (gyakorló módban opcionális)

---

## 4. Hibakezelés

- Érvénytelen szó esetén: figyelmeztető üzenet jelenik meg (pl. „Nem érvényes szó”)
- Nem elég hosszú szó esetén: „5 betűs szót adj meg”
- Technikai hibák esetén: általános hibaüzenet („Valami hiba történt, próbáld újra”)

---

## Verzió

**Dokumentum verziója:** 1.0  
**Dátum:** 2025-09-15  
**Projekt:** Szóleó  
**Készítette:** DontBeL8