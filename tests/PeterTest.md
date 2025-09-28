# Projekt neve: Szóleó  
# Tesztelő: Kiss Péter  

| Test Case ID | Teszt neve | Előfeltétel | Lépések | Elvárt eredmény | Valós eredmény | Státusz |
|--------------|------------|-------------|---------|----------------|----------------|---------|
| TC17 | Nyerés után új játék indítása | Játék megnyerve | „Új játék” gomb megnyomása | Új célszó generálódik, a tábla kiürül | Új célszó generálódik, a tábla kiürül | Pass |
| TC18 | Veszítés után célszó megjelenítése | Összes próba felhasználva | Célszó ellenőrzése | Játék megjeleníti a helyes szót | Játék megjeleníti a helyes szót | Pass |
| TC19 | Szóhossz ellenőrzés | Játék indítva | 4 vagy kevesebb betűs szó próbálása | Hibaüzenet jelenik meg | Hibaüzenet jelenik meg | Pass |
| TC20 | Light/Dark mód váltás | Játék indítva | Téma váltása | Színek a kiválasztott módnak megfelelően változnak | Színek a kiválasztott módnak megfelelően változnak | Pass |
| TC21 | Tooltip megjelenítése | Játék indítva | Egér ráhúzása az információ ikonra | Tooltip szövege megjelenik | Tooltip szövege megjelenik | Pass |
| TC22 | Billentyűzet működése egérkattintással | Játék indítva | Betűre kattintás | Betű bekerül a szóba | Betű bekerül a szóba | Pass |
| TC23 | Backspace működése | Játék indítva | Betű beírása → Backspace megnyomása | Utolsó betű törlődik | Utolsó betű törlődik | Pass |
| TC24 | Enter gomb működése | Játék indítva | Szó beírása → Enter megnyomása | Szó ellenőrzése és színezése | Szó ellenőrzése és színezése | Pass |
| TC25 | Scoreboard növekedése nyeréskor | Játék megnyerve | Scoreboard ellenőrzése | Nyert meccsek száma nő | Nyert meccsek száma nő | Pass |
| TC26 | Scoreboard változása veszteségkor | Játék elveszítve | Scoreboard ellenőrzése | Vesztett meccsek száma nő | Vesztett meccsek száma nő | Pass |
| TC27 | Reszponzív nézet (mobil) | Mobilnézet szimulálva | Játék indítva | Tábla és billentyűzet lekicsinyítve jelenik meg | Tábla és billentyűzet nem lekicsinyítve jelenik meg | Fail |
| TC28 | Helyes betű ismétlése | Célszó ismert | Betű többször szerepel → többször beírva | Csak megfelelő pozícióban jelöli zölddel | Csak megfelelő pozícióban jelöli zölddel | Pass |
| TC29 | Célszó ismétlődő betűkkel | Célszó ismert (pl. „anna”) | Célszó ellenőrzése | Színezés helyesen kezeli az ismétlődést | Színezés helyesen kezeli az ismétlődést | Pass |
