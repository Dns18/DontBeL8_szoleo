# Projekt neve: Szóleó
# Tesztelő: Petric Edmond

| Test Case ID | Teszt neve | Előfeltétel | Lépések | Elvárt eredmény | Valós eredmény | Státusz |
|--------------|------------|-------------|---------|----------------|----------------|---------|
| TC01 | Szólista JSON-re cserélése | Projekt elindítva | Szólista betöltése .json fájlból | A játék a JSON-ban lévő 5 betűs magyar szavakat használja | A játék a JSON-ban lévő 5 betűs magyar szavakat használja | Pass |
| TC02 | Szólista érvényesség | JSON betöltve | 5 betűs szó generálása | Generált szó szerepel a JSON szólistában | Generált szó szerepel a JSON szólistában | Pass |
| TC03 | Kék szín megjelenítése (jó hely, más ékezettel) | Célszó ismert | Betű ugyanott, de más ékezettel beírva | Betű kék (🟦) színnel jelenik meg | Nem működik(sárgát mutat) | Fail |
| TC04 | Kék szín megjelenítése (jó hely, más ékezettel) | Célszó ismert | Betű ugyanott, de más ékezettel beírva | Betű kék (🟦) színnel jelenik meg | Betű kék (🟦) színnel jelenik meg | Pass |
| TC05 | Kék szín a játékrácson | Kék szín tesztelve | Próba elküldése | Rácson a megfelelő cella kék | Rácson a megfelelő cella kék | Pass |
| TC06 | Lila szín megjelenítése (rossz hely, más ékezettel) | Célszó ismert | Betű rossz pozícióban, más ékezettel | Betű lila (🟪) színnel jelenik meg | Nem működik(kéket mutat) | Fail |
| TC07 | Lila szín megjelenítése (rossz hely, más ékezettel) | Célszó ismert | Betű rossz pozícióban, más ékezettel | Betű lila (🟪) színnel jelenik meg | Betű lila (🟪) színnel jelenik meg | Pass |
| TC08 | Lila szín a játékrácson | Lila szín tesztelve | Próba elküldése | Rácson a megfelelő cella lila | Rácson a megfelelő cella lila | Pass |
| TC09 | "Feladom" gomb megjelenítése | Játék indítva | Feladom gomb ellenőrzése | Gomb látható és kattintható | Gomb látható és kattintható | Pass |
| TC10 | "Feladom" gomb működése | Feladom gomb látható | Gomb megnyomása | Játék véget ér, célszó megjelenik | Játék véget ér, célszó megjelenik | Pass |
| TC11 | Billentyűn színek megjelenítése (jó hely, jó betű) | Próba elküldve | Betű a megfelelő helyen | Billentyű zöld (🟩) | Billentyű zöld (🟩) | Pass |
| TC12 | Billentyűn színek megjelenítése (rossz hely, jó betű) | Próba elküldve | Betű rossz helyen | Billentyű sárga (🟨) | Billentyű sárga (🟨) | Pass |
| TC13 | Billentyűn színek megjelenítése (jó hely, más ékezettel) | Próba elküldve | Betű ugyanott, más ékezettel | Billentyű kék (🟦) | Billentyű kék (🟦) | Pass |
| TC14 | Billentyűn színek megjelenítése (rossz hely, más ékezettel) | Próba elküldve | Betű rossz helyen, más ékezettel | Billentyű lila (🟪) | Billentyű lila (🟪) | Pass |
| TC15 | Billentyűn színek megjelenítése (nem szereplő betű) | Próba elküldve | Betű nincs a szóban | Billentyű szürke (⬜) | Billentyű szürke (⬜) | Pass |
| TC16 | Szólista JSON frissítés utáni kompatibilitás | Új JSON feltöltve | Próba generálása | Játék megfelelően működik, új szavak használhatók | Játék megfelelően működik, új szavak használhatók | Pass |