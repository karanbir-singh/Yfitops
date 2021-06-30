# Yfitops

## Caratteristiche principali
Il sito Yfitops permette ad un utente di ascoltare musica. Il principale obiettivo di questo applicativo è quello di concedere all'utente di registrarsi
e, solo dopo aver effettuato il login, gli è permesso di caricare dei file musicali locali sul sito in modo da poter ascoltarli anche senza aver bisogno di
avere i file in locale. 

>**Obiettivo secondario (non raggiunto, per mancanza di tempo)**: Oltre all'uploading di canzoni, è possibile ricercare le canzoni caricate dall'utente (se loggato) e se non trova risultati sarà un secondo servizio musicale ad occuparsi di fornire all'individuo i risultati (Spotify, Amazon Music, ecc.).


## User story
L'utente può eseguire le seguenti operazioni:
  * registrarsi con email e password
  * se ha effetuato il **login**
    * caricare i propri file musicali senza limite di dimensione *(ovviamente i files devono essere di dimensioni ragionevoli -> **non si possono caricare dei film**)*
    * cancellare dei file caricati su remoto
    * ascoltare la propria musica caricata su remoto
    * Firebase limita ciascun utente per quanto riguarda l'uploading dei files (**quantità massima 1 GB/day)**
  
## MVP
  * riproduzione audio
  * riproduzione dei files caricati sullo storage
## Dopo MVP
  * gestione files: aggiunta/cancellazione dei files su storage
  * permettere all'utente di registrarsi e effetuare il login
  * uploading dei files su una propria cartella

## Tecnologie
* React.js come front-end
* Cloud Storage: Firebase Storage come back-end 
* Autenticazione: Firebase Authentication
* *API secondo servizio musicale: (era Spotify)*

Demo: [https://yfitops-cabf7.web.app/](https://yfitops-cabf7.web.app/)
