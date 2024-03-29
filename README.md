# xvii

---

## deployment:

### env vars:

- `ENVIRONMENT` - deployment environment
- `POSTGRES_USER` - name of the db user
- `POSTGRES_DB` - name of the database
- `POSTGRES_PASSWORD` - password of the db user
- `SESSION_JWT_SECRET` - secret for reading json web tokens
- `REACT_APP_API_URL` - url for the server's http api used within the client
- `REACT_APP_CHAT_WS_URL` - url for the server's chat ws used within the client

---

## History:

- 02.25.2023: intialized repo
- 02.27.2023: initalized node app
- 02.28.2023: built some stuff
- 03.04.2023: added user auth with sessions
- 03.08.2023: added server to docker compose
- 03.12.2023: added logging service, begin designing login ui
- 03.18.2023: implemented login api into client, begin designing header
- 03.19.2023: added session checking for auto login, decoupled server from docker compose (for now), refined ui
- 03.20.2023: added chat and mail models, added text file download to info button, added mail api
- 03.25.2023: added chatroom with web socket server
- 03.26.2023: fixed conditional autoscroll on chat, added show/hide on pass inputs
- 03.27.2023: minor improvements to chat and header
- 04.02.2023: fixed cleanup on chat ws, started inbox component, moved all env vars to .zshrc file, removed hardcoded urls from client
- 04.15.2023: removed console.log from server logs, removed client non-error console logs
- 04.16.2023: fixed sequelize migration config file, tested mail api and added errors for bad requests, began work on inbox page
- 04.26.2023: changed page name, started inbox table
- 04.27.2023: continued work on inbox table, setup associations between mail and users, added delete endpoint
- 05.06.2023: started design of game component.

---

## to do:

### soon:
- [ ] login/create modal
    - input validation and errors displayed in modal
    - make keyboard navigible (close button, a tags, more visibly selected) 
    - remove button component, remake using css

- [ ] inbox page
    - first draft design messages table
    - first draft design write message window
    - figure out how to pass line breaks in stored and displayed text
    - fix selected display

- [ ] home page
    - put something on the home page temporarily

- [ ] profile page
    - put something on the profile page temporarily

- [ ] deployment stack
    - alter client Dockerfile to build and serve client
    - tie client and server together behind nginx

- [ ] window size
    - add window size hook
    - use hook to calculate ui conponent height 

### eventually:
- notification component
- canvas game, with controls on focus
- ws for game state, and player input

## Notes:

### Colors:  

#fceef2, #110307, #eab4d5, #86284f, 
#e6ebd3, #04a777, #675750, #5A301C
#1768ac, #044389


### Symbols: 

❤ , ★