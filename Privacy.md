# Privacy Policy — Password Generator (Generatore di Password)

**Ultimo aggiornamento:** 30 giugno 2026

Questa Privacy Policy descrive in modo specifico il trattamento dei dati da parte dell'estensione per Microsoft Edge **Password Generator — Generatore di password**.

## 1. Riepilogo

Password Generator **non raccoglie, non memorizza, non trasmette e non condivide alcun dato personale o di utilizzo**. L'estensione funziona interamente in locale, all'interno del browser dell'utente.

## 2. Dati raccolti

Nessuno. Nello specifico, l'estensione:

- non effettua alcuna richiesta di rete (nessun server remoto, nessuna API esterna, nessun servizio di analytics o tracciamento);
- non utilizza `chrome.storage`, `localStorage`, IndexedDB né cookie;
- non registra la cronologia delle password generate;
- non raccoglie identificativi del dispositivo, indirizzi IP, dati di geolocalizzazione o di navigazione.

## 3. Come funziona la generazione della password

Ogni password viene generata localmente utilizzando l'API nativa del browser `crypto.getRandomValues()` (generatore di numeri casuali crittograficamente sicuro). La password generata viene mostrata nel popup ed esiste solo in memoria volatile per la durata della sessione: viene eliminata automaticamente alla chiusura del popup e non viene mai scritta su disco.

## 4. Permessi richiesti e relativa motivazione

| Permesso | Motivazione |
|---|---|
| `clipboardWrite` | Necessario esclusivamente per copiare la password generata negli appunti del sistema, su azione esplicita dell'utente (pulsante "Copia"). Non viene letto né monitorato il contenuto degli appunti. |

L'estensione non richiede e non utilizza alcun altro permesso (nessun accesso a schede aperte, cronologia, segnalibri, webcam, microfono, posizione, ecc.).

## 5. Condivisione con terze parti

Non essendo raccolto alcun dato, non vi è alcuna condivisione di dati con terze parti, servizi pubblicitari o servizi di analisi.

## 6. Diritti dell'utente

Poiché Password Generator non raccoglie né conserva alcun dato personale, non esistono dati da poter consultare, esportare o richiedere in cancellazione: nulla viene mai memorizzato al di fuori della sessione corrente del popup.

## 7. Minori

L'estensione non è diretta a minori di 13 anni e non raccoglie consapevolmente dati da alcun utente, indipendentemente dall'età.

## 8. Modifiche a questa policy

Questa Privacy Policy potrà essere aggiornata in caso di modifiche alle funzionalità dell'estensione che comportino un trattamento di dati diverso da quello qui descritto. La data di "Ultimo aggiornamento" in cima al documento riflette sempre la versione più recente.

## 9. Contatti

Per domande relative a questa Privacy Policy o al funzionamento dell'estensione, è possibile aprire una issue sul repository GitHub del progetto.