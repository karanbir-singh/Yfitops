# Yfitops

## Caratteristiche principali
Il sito Yfitops permette ad un utente di ascoltare musica. Il principale obiettivo di questo sito è quello di concendere all'utente di registrarsi
e solo dopo aver effettuato il login, gli è permesso di caricare dei file musicali locali sul sito in modo da poter ascoltarli anche senza aver bisogno di
avere le musische in locale. Oltre all'uploading di canzoni, è possibile ricercare le canzoni caricate dall'utente (se loggato) e se non trova risultati sarà
un secondo servizio musicale ad occuparsi di fornire all'individuo i risultati (Spotify, Amazon Music, ecc.).

## User story
L'utente può eseguire le seguenti operazioni:
  * registrarsi con email e password
  * ascoltare la musica ricercata
  * se ha effetuato il **login**
    * caricare i propri file musicali senza limite di dimensione *(ovviamente i files devono essere di dimensioni ragionevoli -> **non si possono caricare dei film**)*
    * cancellare dei file caricati su remoto
    * ascoltare la propria musica caricata su remoto
    * una restrizione che limita ciascun utente riguarda alla **dimensione massima dei files nell'insieme** causato da un limite del database su cui sono caricati i file
  * *(se fattibile)* ricercare una canzone attraverso l'uso del microfono: il dispositivo ascolta la musica nei dintorni dell'utente e cerca di trovarne una corrispondenza 
    *(tipo Shazam)*
  
## MVP
* **Step iniziali**
  * permettere all'utente di registrarsi e effetuare il login
  * ricercare le canzoni -> risposta da una API concessa dal secondo servizio musicale
  * streaming della musica
  * *(se fattibile)* ricerca la canzone tramite l'ascolto del microfono
* **Step successivi** *(praticamente dopo aver effetuato il login)*
  * gestione files: aggiunta/cancellazione files caricati su database
  * streaming dei files caricati su database

## Tecnologie
* React.js per il Front-end
* Express.js per il Middleware (definizione delle rotte)
* Database: Firebase Storage (?)
* Autenticazione: Firebase
* API secondo servizio musicale: (?)
* *(se fattibile)*API per la ricerca della musica tramite microfono: (?)
