# xvii

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
    - add game_id to schema
    - add game_secret to schema

- [ ] home page
    - put something on the home page temporarily

- [ ] profile page
    - put something on the profile page temporarily

- [ ] server logging
    - incorporate log service on ws and errors
    - remove console logs from client

- [ ] env vars
    - remove all references to keys, urls, db strings from server and client
    - add all needed env vars in README as to help construct .bashrc or .zshrc file

- [ ] deployment stack
    - alter client Dockerfile to build and serve client
    - tie client and server together behind nginx

### eventually:
- notification component
- canvas game, with controls on focus
- ws for game state, and player input

## Notes:

### Colors:  

#fceef2, #110307, #eab4d5, #86284f, #e6ebd3, #04a777

### Symbols: 

❤ , ★