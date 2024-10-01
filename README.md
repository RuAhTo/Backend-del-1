# Backend-del 1

## Beskrivning
Backend-del 1 är en drag & drop-baserad todo-lista där användare kan hantera sina uppgifter genom att skapa, byta kategori och ta bort todo:s. Systemet har fullt stöd för auktorisering, vilket innebär att användaren kan registrera ett konto, logga in, och få åtkomst till sina egna todos. Användaren har även möjlighet att ändra sin användarinformation.

## Installation
Följ dessa steg för att installera och köra projektet:

1. **Backend**:
    - Navigera till backend-mappen:
      ```bash
      cd backend
      ```
    - Installera alla nödvändiga beroenden:
      ```bash
      npm i
      ```
    - Skapa en `.env`-fil och lägg till din databas-URL:
      ```plaintext
      DATABASE_URL=<din-databas-url>
      ```
    - Kör dev:
      ```bash
      npm run dev
      ```

2. **Frontend**:
    - Navigera till frontend-mappen:
      ```bash
      cd frontend
      ```
    - Installera alla nödvändiga beroenden:
      ```bash
      npm i
      ```
    - Kör dev:
      ```bash
      npm run dev
      ```

## Konfiguration
Databasens URL måste anges i `.env`-filen med variabelnamnet `DATABASE_URL`. URL:en skickas via Canvas eller vid förfrågan.

