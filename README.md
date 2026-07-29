# 3D-DICE

A 3D dice generator that allows you to customise dice. You can then bookmark, and roll your custom dice whenever you like.

Live Site: [https://dice.codedonkey.uk](https://dice.codedonkey.uk)

## TableTop Build

I started a project 5 years ago called Tabletop Build. The idea was to allow board game designers a SASS platform to design games and sell games. Not only as web based games, but also as physical games through 3D and conventional printing.

Unfortunately it was a troubled project from the beginning, and the collective cost dramas resulted in an expensive mess.

Issues faced

- A 3rd party React component based UI library becoming commercial requiring a massive rewrite. Having to replace UI components throughout an application was not fun!

- SVG Security restrictions imposed by browsers causing constant failures with various browser updates. SVGs are a major security hole. This project currently can't use WebGPU because it considers its generated SVGs insecure. A never ending drama!

- My last employment agency asking me to sign an agreement not to distribute my project for the duration of my 2 year contract! Blood still boils over that one.

- Ultimately AI being able to generate images, models, and online games off simple instructions. This totally killed the project. My heart was broken when I asked a visual model to produce a Baywatch themed snakes and ladders game, and out came an awesome image. I can't make a tool as good as that, game over for my project.

Anyway I have 3 years worth of code that is doing nothing, and I am looking for a job in a highly competitive market. So I am resurrecting some old projects. This project represents about 10% of Tabletop Build functionality.

## Is this it?

Nope, I'll be updating this site with the ability to draw on the dice surface probably next week. I need a break, I built 6 projects in 3 weeks. Including [https://codedonkey.uk](https://codedonkey.uk), I need a couple of days to rest the brain.

## instructions

| code                | description                                                                |
| ------------------- | -------------------------------------------------------------------------- |
| `npm install`       | install dependencies                                                       |
| `nvm use`           | Use node version specified in projects .nvmrc file. (NVM needs installing) |
| `nvm run test`      | run jest tests                                                             |
| `nvm run serveDev`  | serve site in development mode (vite), unzipped with livereload (vite)     |
| `nvm run serveProd` | serve site in production mode (vite), zipped no reload                     |
| `nvm run clean`     | clean project with prettier                                                |
| `nvm run validate`  | validate code with typescript & prettier compiler                          |
| `nvm run build`     | Build site, validates files before doing so                                |

## Run in Mac container

```bash
container system start
container run -it --rm --name dice \
  -p 8080:80 \
  --volume "$(pwd)/dist:/usr/local/apache2/htdocs/" \
  --volume "$(pwd)/httpd-override.conf:/usr/local/apache2/conf/extra/httpd-override.conf" \
  httpd:2.4 \
  sh -c "httpd -D FOREGROUND -C 'Include conf/extra/httpd-override.conf'"

```

## General Instructions

### Update libraries

How to update libraries to the latest

```bash
npx npm-check-updates -u
npm install
```

### Update node

This project has been set up to use a specific version of node via `.nvmrc` file. Run this command to update to your local version.

```bash
nvm ls-remote --lts # see latest build
nvm install node # update to the latest build
node -v > .nvmrc # this project to the latest
```
