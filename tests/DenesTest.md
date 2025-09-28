# Projekt neve: Szóleó
# Tesztelő: Győri Dénes

| Test Case ID | Teszt neve | Előfeltétel | Lépések | Elvárt eredmény | Valós eredmény | Státusz |
|--------------|------------|-------------|---------|----------------|----------------|---------|
| TC30 | Speciális karakter tiltása | Játék indítva | Szóbeírás számokkal vagy speciális karakterrel (`123`, `@`) | Hibaüzenet vagy karakterek figyelmen kívül hagyása | - | N/A |
| TC31 | Nagybetű kezelés | Játék indítva | Szó beírása csupa nagybetűvel | A játék kisbetűsít, és helyesen ellenőrzi | - | N/A |
| TC32 | Célszó ékezet nélkül | Célszó ékezetes | Szó ékezet nélkül beírva | A játék felismeri és helyesen jelöli a betűket | - | N/A |
| TC33 | Üres próba beküldése | Játék indítva | Enter lenyomása üres sorban | Nem engedi tovább, hibaüzenet jelenik meg | - | N/A |
| TC34 | Nagyon gyors kattintások | Játék indítva | Többször, nagyon gyorsan Enter-t nyomni | Csak egyetlen próbálkozás számítson | - | N/A |
| TC35 | Célszó nagyon ritka szó | JSON bővítve ritka szóval | Ritka célszó kisorsolása | Játék helyesen lefut, scoreboard, színezés rendben | - | N/A |
| TC36 | Betöltési sebesség | - | Mérd, mennyi idő alatt tölt be a játék különböző böngészőkben | Betöltési idő elfogadható (<2s) | - | N/A |
| TC37 | Mentés böngésző bezárása után | Folyamatban lévő játék | Oldal frissítés vagy böngésző bezárás/nyitás | Játékállapot elmentve vagy újrakezdve, szabályoknak megfelelően | - | N/A |
| TC38 | Accessibility teszt (képernyőolvasó) | Játék indítva | Gombok, színek ellenőrzése képernyőolvasóval | Szöveges alternatívák elérhetők | - | N/A |
