# HUGO - SASS - GULP Boilerplate
Husagu is a platform and style (somewhat) opionated boilerplate for creating static websites. It makes no assumptions about your CSS writing or Hugo structure. It helps you by setting up the website for you and automating the common tasks. 
It uses:
- [Hugo](https://gohugo.io) - Blazingly fast static site generator written in GO
- [SASS](http://sass-lang.com) - An extension of CSS that adds power and elegance to the basic language
- [GULP](https://gulpjs.com/) - Easily customizable task runner

## Requirements
This boilerplate requires NodeJS, Hugo, Yarn/NPM and Gulp to function. 

#### Installation
Installation instructions written here are for Ubuntu. Everything can easily be transposed to another Linux distro, or even OS X. Windows users... Well, Google is your friend...

**NodeJS**
```
sudo apt-get update
sudo apt-get install nodejs
```

**Yarn/NPM**
_*NPM gets installed with NodeJS_ 
```
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn
```

**Hugo**
```
sudo apt-get update
sudo apt-get install hugo
```

**Gulp**
```
sudo apt-get update
npm install gulp-cli -g
```

## Usage

#### Setup
To setup the site clone the git repository to your desired folder with:
```
mkdir name-of-project
cd name-of-project
git clone https://github.com/linkto/gitrepo.git
```
To install all the local dependencies for the project:
```
yarn install
```
or
```
npm install
```
#### Watch 
Watch tasks are used so you can see all the changes you make live in the browser.

Spin up the Hugo server:
```
hugo server -D
```
Run the gulp task:
```
gulp
```
#### Build
Build tasks are used for building and pushing the development version of the site to the static folder that is basically your final website root folder. This folder can be pushed to github, copied to any webserver or integrated with a service (like Netlify).

Build the hugo site:
```
hugo build
```
Add all the assets to the production site with:
```
gulp build
```

## What does Husagu do?
Husagu helps you by setting up a basic Hugo site with some useful HTML included from [HTML5Boilerplate](https://html5boilerplate.com/). The template files are also created with the most basic and useful Hugo code that helps getting your site of the ground quickly, while at the same time not making any assumptions about the structure of your site.

The SASS is preloaded with [Normalize.css](https://necolas.github.io/normalize.css/), a print stylesheet and a few CSS rules in ```_base.scss```. Husagu tries to get out of your way and let you style your site the way you would like.

The gulp tasks make editing and publishing the website a breeze. All you have to do is use four commands ```gulp```, ```gulp build```, ```hugo server -D``` and ```hugo build``` respectively.
 
> _With Husagu, you get your basic Hugo site with useful Hugo and HTML snippets, you have your server with live changes, code and image optimization, and an automated build system._ 

#### What Husagu doesn't do?
Husagu doesn't come preloaded with libraries and bolierplates like jQuery or Bootstrap. So don't expect writing something like ```<button class="btn btn-primary" type="submit">Button</button>``` and getting automatic styling and behavior. Husagu is a lightweight starting point for your websites, and doesn't make any assumptions about your grid systems, components, site behavior etc. However, if you want to use libraries, implementing them is really easy. All it takes is copying the desired JS library to ```src/js/vendors/``` folder, or CSS libraries to ```src/scss/vendors/``` folder and doing ```@import``` in ```main.scss``` file.
## Default folders


## SASS Guidelines

You can write SASS any way you like, but I like to use a modified combination of [SMACSS](https://smacss.com) and [BEM](http://getbem.com/)

Structure of the SCSS folder:

```
scss/
|
|– abstracts/
|   |– _variables.scss    # Sass Variables
|   |– _functions.scss    # Sass Functions
|   |– _mixins.scss       # Sass Mixins
|   |– _helpers.scss      # Sass Helper Classes
|
|– base/
|   |– _reset.scss        # Reset/normalize
|   |– _typography.scss   # Typography rules
|   |- _base.scss         # Most commonly used elements
|   |- _prints.scss       # Print styles
|   …                     # Etc.
|
|– components/
|   |– _buttons.scss      # Buttons
|   |– _carousel.scss     # Carousel
|   |– _cover.scss        # Cover
|   |– _dropdown.scss     # Dropdown
|   …                     # Etc.
|
|– layout/
|   |– _navigation.scss   # Navigation
|   |– _grid.scss         # Grid system
|   |– _header.scss       # Header
|   |– _footer.scss       # Footer
|   |– _sidebar.scss      # Sidebar
|   |– _forms.scss        # Forms
|   …                     # Etc.
|
|– pages/
|   |– _home.scss         # Home specific styles
|   |– _contact.scss      # Contact specific styles
|   …                     # Etc.
|
|– themes/
|   |– _theme.scss        # Default theme
|   |– _admin.scss        # Admin theme
|   …                     # Etc.
|
|– vendors/
|   |– _bootstrap.scss    # Bootstrap
|   |– _jquery-ui.scss    # jQuery UI
|   …                     # Etc.
|
`– main.scss              # Main Sass file
```

#### Folder Explanation

- The **abstracts/** folder gathers all Sass tools and helpers used across the project. Every global variable, function, mixin and placeholder should be put in here.

- The **base/** folder holds what we might call the boilerplate code for the project. In there, you might find the reset file, some typographic rules, and probably a stylesheet defining some standard styles for commonly used HTML elements (that I like to call _base.scss).

- For smaller components, there is the **components/** folder. While layout/ is macro (defining the global wireframe), components/ is more focused on widgets. It contains all kind of specific modules like a slider, a loader, a widget, and basically anything along those lines. There are usually a lot of files in components/ since the whole site/application should be mostly composed of tiny modules.

- The **layout/** folder contains everything that takes part in laying out the site or application. This folder could have stylesheets for the main parts of the site (header, footer, navigation, sidebar…), the grid system or even CSS styles for all the forms.

- If you have page-specific styles, it is better to put them in a **pages/** folder, in a file named after the page. For instance, it’s not uncommon to have very specific styles for the home page hence the need for a _home.scss file in pages/.

- On large sites and applications, it is not unusual to have different themes. There are certainly different ways of dealing with themes but I personally like having them all in a **themes/** folder.

- And last but not least, most projects will have a **vendors/** folder containing all the CSS files from external libraries and frameworks – Normalize, Bootstrap, jQueryUI, FancyCarouselSliderjQueryPowered, and so on. Putting those aside in the same folder is a good way to say “Hey, this is not from me, not my code, not my responsibility”.
If you have to override a section of any vendor, I recommend you have an 8th folder called vendors-extensions/ in which you may have files named exactly after the vendors they overwrite.
For instance, vendors-extensions/_bootstrap.scss is a file containing all CSS rules intended to re-declare some of Bootstrap’s default CSS. This is to avoid editing the vendor files themselves, which is generally not a good idea.

- The **main** file (usually labelled main.scss) should be the only Sass file from the whole code base not to begin with an underscore. This file should not contain anything but @import and comments.

Files should be imported according to the folder they live in, one after the other in the following order:
```
1. abstracts/
2. vendors/
3. base/
4. layout/
5. components/
6. pages/
7. themes/
```