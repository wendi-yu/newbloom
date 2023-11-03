# newbloom
SE2024 Capstone Project

## Developer Setup

These are the instructions to get the repository up and running locally.

### Install Required Prerequisites

#### nvm
nvm stands for Node Version Manager, and is the recommended way to manage Node versions locally. We'll use it to manage our Node install. Instructions on installing nvm can be found [here](https://github.com/nvm-sh/nvm#installing-and-updating).

#### Node.js
Use nvm to install Node version 20.9.0:
```zsh
nvm install 20.9.0
```

#### Insall Node modules
```zsh
npm install
```

## App Dev Guidelines

### Running the app locally
```zsh
npm run dev
```

### Branch naming
We're using Linear for project management, so adding the ticket number in the branch name will automatically link your PR to the linear ticket. Naming format should be
```
{ticket-number}/{feature-description}
```
For example, `NEW-17/add-navbar`

### Linting
Run `npm run lint` to lint. Lint before you push!


