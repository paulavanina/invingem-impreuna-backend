# Backend Repository
Acest repository conține codul sursă pentru backend-ul aplicației web dedicate pacienților care suferă de cancer. Backend-ul gestionează autentificarea, operațiile CRUD și oferă API-urile necesare pentru funcționarea frontend-ului. 

# Tehnologii utilizate
- Backend: Node.js
- Baza de date: Azure
- Hosting: Railway
- Securitate: Criptarea parolelor (bcrypt), autentificare cu JWT
- OpenAI API pentru implementarea chatbot-ului


# Functionalitati 
- **Autentificare și înregistrare**: Gestionarea creării conturilor și autentificării utilizatorilor folosind JWT.
- **Operații CRUD**: Permite crearea, citirea și ștergerea postărilor.
- **API-uri pentru frontend**: Oferă endpoint-uri pentru:
  - Înregistrare și autentificare
  - Gestionarea postărilor (creare, citire, ștergere)
  - Gestionarea profilului utilizatorului
    
## Configurare

## Variabile de mediu (.env)
Proiectul folosește un fișier `.env` pentru a stoca date sensibile, cum ar fi:
- `AZURE_SQL_SERVER`
- `AZURE_CONNECTION_STRING`
- `AZURE_SQL_DATABASE`
- `SECRET_TOKEN`: Cheia secretă folosită pentru semnarea token-urilor JWT.
- `PORT`: Portul pe care rulează serverul (`8080`).
- 
## Structura proiectului
- `src/controllers/`: Conține logica pentru gestionarea cererilor HTTP (ex: autentificare, postări).
- `src/routes/`: Gestionează rutele API și le asociază cu controller-ele corespunzătoare.
- `src/config/`: Conține configurații pentru baza de date, variabile de mediu, etc.

