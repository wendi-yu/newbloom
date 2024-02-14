# newbloom
SE2024 Capstone Project

This repository is a monorepo for the fullstack project. The frontend and backend are each contained in their separate respective folders. Some shared configurations remain in the parent folder, mostly for linting. 

**Note**: Run `npm ci` in the parent repo before proceeding to the frontend or backend setup instructions, as some shared dependencies are specified in the parent folder.

## Developer Setup

These are the instructions to get the frontend repository up and running locally. Before running all of these, you'll want to run `cd frontend` to move into the frontend repo.

### Install Required Prerequisites

#### nvm
nvm stands for Node Version Manager, and is the recommended way to manage Node versions locally. We'll use it to manage our Node install. Instructions on installing nvm can be found [here](https://github.com/nvm-sh/nvm#installing-and-updating).

#### Node.js
Use nvm to install Node version 20.9.0:
```zsh
nvm install 20.9.0
```

#### Insall Node modules
Run this command in the root folder, and in both the `backend` and `frontend` folders.

```zsh
npm ci
```

## App Dev Guidelines

### Running the frontend locally

```zsh
cd frontend
npm run dev
```

### Running the backend locally

```zsh
cd backend
npm run dev
```

### Branch naming
We're using Linear for project management, so adding the ticket number in the branch name will automatically link your PR to the linear ticket. Naming format should be
```
{ticket-number}/{feature-description}
```
For example, `NEW-17/add-navbar`

### Linting
Run `npm run lint` to lint. This can be done from anywhere. Lint before you push!


