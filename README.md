# Collectors website
Website for collectors where they can find or post collections. I made frontend and backend parts of this app.
[Backend repo URL](https://github.com/sytniyOD/collections_project_backend)

## Features

- Can choose language (en, ru) and theme.
![Language and theme](/public/img/language-theme.gif "Language and theme")
- Registration with validation and paswword confirm.
 ![Sign up](/public/img/registration.gif "Sign up")
- Login with validation. Blocked users can't enter account.
![Sign in](/public/img/login.gif "Sign in")
- Two types of roles: user and admin. Admin can manage users (block, delete, make admin/user) and edit/delete/create collections and items of users
![Users management](/public/img/users.gif "Users management")
- Main page - clickable tags cloud, collections with most items and last added items.
![Main page](/public/img/main-page.gif "Main page")
- Collection creation where collector can add up to 15 optional fields (strings, numbers, dates, booleans, texts with markdown )
![Create collection](/public/img/create-collection.gif "Create collection")
-Collection page with image (stored in firebase store), markdown description and items (with search and sort).
-Item creation.
![Create item](/public/img/create-item.gif "Create item")
-Item page with live comments and likes (one user can post one like).
![Item](/public/img/item.gif "Item")
-Full text search items (with Mongo Atlas).
![Search](/public/img/item.gif "Search")

# Tech

This app uses following technologies to work properly:

#### Database:

- **MongoDB**
- **Atlas search engine**

#### Backend:
- **Nest.js**
- **Class-validator and Class-transformer**
- **Passport**
- **Bcrypt**
- **Swagger**

### Frontend:
- **React**
- **Vite**
- **Redux** and **Redux Toolkit**
- **Rtk Query**
- **Firebase** - image storage
- **Material UI** and **emotions** - styles
- **i18next** - translation
- **React-select**
- **React-hook-form**
- **React-drag-drop-files**
- **React-simplemde-editor, markdown-to-jsx - work with markdown**
- **Material-react-table**
- **Uuid**
- **Yup** - form validation

### Try it out 

This app is deployed on **Vercel** (front) and  **Render** (back).
Try it out: <https://collections-project-frontend.vercel.app/>
*It may take time to start backend, so if it's not working comeback in one minute.*