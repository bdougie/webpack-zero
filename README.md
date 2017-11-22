# webpack-zero

## Steps to complete
- Step 1: webpack.config.js
- Step 2: module.exports
  Pull Request #1
  
- Step 3: src/index.js
- Step 4: input, output - build/bundle.js
  Pull Request #2

- Step 5: add babel loader
  Pull Request #3
  
- Step 6: Add React Code...

## Tutorial
Webpack is a build tool for modern web applications. When webpack bundles your application, it recursively builds a dependency graph that includes every module your application needs. From this graph it then packages all of those modules into one or more bundles.

This concept of module bundling is not unique to webpack, but its approach has help it take the spot as the most popular build tool for bundling your application. Part of this is to due to the React community adopting webpack pretty early on and creating more awareness around the idea of bundling Singe Page Apps into static assets. 

At the 2016 Chrome Dev Summit, Addy Osmani shared a remarkable revelation showing webpack usage amongst devs who use a build tool to bundle their projects, webpack owns 83% of that pie. I suppose you can say webpack has the cake and eats it too. 

![](https://d2mxuefqeaa7sj.cloudfront.net/s_6C52E34C351224F33CA7850D2D802587DC56DED6F00E804B1E1B2454768600E1_1510699591777_Screenshot+2017-11-14+14.45.53.png)


Now that webpack has found its way into a large of amount of boilerplates and CLI generated templates that provide little to no configuration and learning needed. Templates are great but there is a lot of value with understanding the underlying tools, which is why I am going walk you through how to get webpack up and running in a React application by confidently using just the webpack-cli and nothing more. 

Staring webpack from scratch

![](https://media.giphy.com/media/3jI8ZR6CKhu3S/giphy.gif)


The follow tutorial will use npm to manage dependencies so please make sure you have it installed on your environment before you begin. Please be sure to confirm you are using npm 5 and node 8 or later. 

I recently made scones from scratch and it was a mind opening experience. In addition to all the steps it took, one included adding cold butter to flour with my bare hands and it felt wrong (mostly because I am new to baking), but at the end of that experience I had a tasty scone. I say this because the following might feel weird and I am going to ask you to trust me because at the end of this we are going to have a fully baked and production ready React application from scratch.

Open up your terminal or equivalent command line prompt and create a folder called webpack-from-scratch move into that newly created directory.


    mkdir webpack-from-scratch && cd webpack-from-scratch

Because we are using npm, we can initialize a JavaScript project using the following. The `-y` flag is to pass through the prompts asking you details about the project we do not answers to and to be honest, we might never have the answers to those 😃 .


    npm init -y

We can now install webpack, remember you should be using npm 5 for this which saves references of dependencies (like webpack) to you package-lock.json. 


    npm install webpack
Getting more than scratch into webpack

Now that you have you project setup we need to focus on getting webpack setup and doing what it needs to. 

From here on out, I am going to refer to running the webpack CLI which just means type webpack in your terminal and press enter. 

Run the webpack CLI and hitting enter. This should provide a helpful error message stating that we have no output webpack.config.js file.


    webpack
    
    # Error message in terminal
    No configuration file found and no output filename configured via CLI option.
    A configuration file could be named 'webpack.config.js' in the current directory. 
    Use --help to display the CLI options.  

This is a simple fix and only requires us to create that config file. You will also need to add a module to export from your webpack.config.js file.  


    touch webpack.config.js 
    echo 'module.exports = {}' > webpack.config.js 

Your config should now look like this.


    // webpack.config.js
    module.exports = {}

If you are not familiar with module exporting in JavaScript, a module encapsulates related code into a single unit of code. It is common to share JavaScript files through the use of modules and webpack is giant exported module. Based on the keys set in module ,webpack can generate your bundle. You can learn more about JavaScript modules from sitepoint.

Webpack is built on 4 basic concepts, which I go into much greater detail in a previous post. These concepts include the Entry, Output, Loader, and Plugins and are all the available options for a webpack.config.js. Every thing you can possibly do falls within those concepts.

Entry and Output
Run the webpack CLI and take note of the new error message. This error message is because we did not adding anything to an entry and out destination to your webpack.config.js module. Output is necessary and will let webpack know where to place the result from bundling.


    ...
    Error: 'output.filename' is required, either in config file or as --output-filename

Add an output key and make the destination bundle.js. There is not rule that for naming, but it is common to see the output of webpack called bundle or something similar. This will make more sense later on when have something to actually to bake into our bundle. For now we are just going to be bundling into one JavaScript file, but it is common to create a folder where all static assets are placed. 


    module.exports = {
      output: {
        filename: 'bundle.js'
      }
    }

If you now run the webpack CLI, you will see a new error stating that there is no entry set up.


    Configuration file found but no entry configured. 

The Entry is what webpack actually bundles. You can have multiple entry points to perform more advanced features like code splitting and vendor dependency management. For now just create an index.js with some JavaScript in it. 


    // index.js
    console.log('¡Hola Mundo!')

Now add index.js to the Entry point of your webpack module. 

    module.exports = {
      entry:'./index.js',
      output: {
        filename: 'bundle.js'
      }
    }

If you now run the webpack CLI, you should get an error and now have successfully bundled. So what happened? The answer is nothing yet, remember with great power comes, great responsibility. 


    Hash: fc1fcae6c941947e2d32
    Version: webpack 3.8.1
    Time: 61ms
        Asset    Size  Chunks             Chunk Names
    bundle.js  2.5 kB       0  [emitted]  main
       [0] ./index.js 28 bytes {0} [built]
         

Webpack has created a bundle.js that looks exactly like you index.js, well sort of. What webpack did was take all your modules making a dependency graph and place it in what looks like comments at the top of your bundle. I am not going to break that down now because that is reading for robots. However, if you if you look at the bottom of the file you can see our original console.log made it.


    // bundle.js
    /******/ (function(modules) { // webpackBootstrap
    /******/         // The module cache
    /******/         var installedModules = {};
    /******/
    /******/         // The require function
    /******/         function __webpack_require__(moduleId) {
    /******/
    /******/                 // Check if module is in cache
    /******/                 if(installedModules[moduleId]) {
    /******/                         return installedModules[moduleId].exports;
    /******/                 }
    /******/                 // Create a new module (and put it into the cache)
    /******/                 var module = installedModules[moduleId] = {
    /******/                         i: moduleId,
    /******/                         l: false,
    /******/                         exports: {}
    /******/                 };
    /******/
    /******/                 // Execute the module function
    /******/                 modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    /******/
    /******/                 // Flag the module as loaded
    /******/                 module.l = true;
    /******/
    /******/                 // Return the exports of the module
    /******/                 return module.exports;
    /******/         }
    /******/
    /******/
    /******/         // expose the modules object (__webpack_modules__)
    /******/         __webpack_require__.m = modules;
    /******/
    /******/         // expose the module cache
    /******/         __webpack_require__.c = installedModules;
    /******/
    /******/         // define getter function for harmony exports
    /******/         __webpack_require__.d = function(exports, name, getter) {
    /******/                 if(!__webpack_require__.o(exports, name)) {
    /******/                         Object.defineProperty(exports, name, {
    /******/                                 configurable: false,
    /******/                                 enumerable: true,
    /******/                                 get: getter
    /******/                         });
    /******/                 }
    /******/         };
    /******/
    /******/         // getDefaultExport function for compatibility with non-harmony modules
    /******/         __webpack_require__.n = function(module) {
    /******/                 var getter = module && module.__esModule ?
    /******/                         function getDefault() { return module['default']; } :
    /******/                         function getModuleExports() { return module; };
    /******/                 __webpack_require__.d(getter, 'a', getter);
    /******/                 return getter;
    /******/         };
    /******/
    /******/         // Object.prototype.hasOwnProperty.call
    /******/         __webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
    /******/
    /******/         // __webpack_public_path__
    /******/         __webpack_require__.p = "";
    /******/
    /******/         // Load entry module and return exports
    /******/         return __webpack_require__(__webpack_require__.s = 0);
    /******/ })
    /************************************************************************/
    /******/ ([
    /* 0 */
    /***/ (function(module, exports) {
    
    console.log('¡Hola Mundo!')
    
    
    /***/ })
    /******/ ]);
    

This is so amazing! You are now a webpack expert, feel free to add me as a reference for your Senior Java Engineer applications. 

Despite you now being a webpack expert, there are still more we can do with this module bundler. Having an entry and output for your bundle is only the beginning. 

Loaders
Loaders are the concept of webpack that does tedious things for you. We are going to add React to our project and in order use the latest React with JSX, we will need to add a babel-loader. Babel is a code transpilier that allows you to write code in the flavor you need and have it transpile to a version readable by non-supported browsers. 

Replace the below code in your index.js and run the webpack CLI. 


    class World {
      hello() { console.log('¡Hola Mundo!'); }
    }
    
    (new World).hello();

You will see that there were no issues reported to the console and the code was bundled successfully. There are some browsers and environments that cannot not use the latest JavaScript. This is where we can use a babel-loader. 


    npm install babel-loader babel-preset-env -D 

Create a .babelrc file and add a reference to the babel-preset-env. 

    {
      presets: ["env"]
    }

Add new key to our webpack module, which will also have a rule that is our loader.

    const path = require('path'); // add this for path context in loader
    
    module.exports = {
      entry: './index.js',
      output: {
        filename: 'bundle.js'
      },
      module: { // new concept, loaders
        rules: [ 
          {
            test: /\.js$/,
            include: path.resolve('./index.js'), // file to transpile
            loader: 'babel-loader', // loaders referenced
            exclude: /node_modules/, // we do not need to transpile other libraries
            query: require('./.babelrc'), // reference to babel rules
          }
        ]
      },
    }
    

Run the webpack CLI and note that the bundle.js is now represented as the older ES5 version. Being able to use the older version is useful for systems and environments that require it. AWS lambda is an environment that does just that, you are unable to run latest JavaScript there and will need transpile your code before uploading it there.


    "use strict";
    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
    
    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
    
    var World = function () {
      function World() {
        _classCallCheck(this, World);
      }
    
      _createClass(World, [{
        key: 'hello',
        value: function hello() {
          console.log('¡Hola Mundo!');
        }
      }]);
    
      return World;
    }();
    
    new World().hello();

There are few other popular loaders for converting SCSS to CSS and making CSS Modules available. You can also add loaders to import and convert different image types and files types, like SVG or TypeScript.

Plugins
There are certain problems develops need to solve over and over to get a production build. One of them is minification. Luckily Uglify is open sourced and available for us to use to make our bundle smaller. 

Run the webpack CLI and take note of you bundle.js size. For just a little bit of JavaScript it takes 2.5kbs.


    $ webpack
    Hash: fc1fcae6c941947e2d32
    Version: webpack 3.8.1
    Time: 61ms
        Asset    Size  Chunks             Chunk Names
    bundle.js  2.5 kB       0  [emitted]  main
       [0] ./index.js 28 bytes {0} [built]

Add a new key to our webpack module, plugins, and include the UglifyJS webpack optimize plugin. You will also need to add the path module for the ability to provide path context to the webpack loader.


    const path = require('path'); // add this for path context in loader
    
    module.exports = {
      entry: './index.js',
      output: {
        filename: 'bundle.js'
      },
      module: { // new concept, loaders
        rules: [ 
          {
            test: /\.js$/,
            include: path.resolve('./index.js'), // file to transpile
            loader: 'babel-loader', // loaders referenced
            exclude: /node_modules/, // we do not need to transpile other libraries
            query: require('./.babelrc'), // reference to babel rules
          }
        ]
      },
      plugins: [
        new webpack.optimize.UglifyJsPlugin()
      ]
    }

 
Now run the webpack CLI, your bundle size should be significantly smaller. This is because all whitespace and comments have removed. All variables have been replaced with single characters, all for the sake of saving space. 


    !function(n){function e(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return n[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var t={};e.m=n,e.c=t,e.d=function(n,t,r){e.o(n,t)||Object.defineProperty(n,t,{configurable:!1,enumerable:!0,get:r})},e.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(t,"a",t),t},e.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},e.p="",e(e.s=0)}([function(n,e,t){"use strict";function r(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}var o=function(){function n(n,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}return function(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}}();(new(function(){function n(){r(this,n)}return o(n,[{key:"hello",value:function(){console.log("¡Hola Mundo!")}}]),n}())).hello()}]);

This is significantly harder to read for debugging purposes, which is why browsers have the ability to pretty print the contents from the web console. That does not account for the variable name changes, which can be tweak in the options for the plugin. You can also take advantage of this feature without adding the plugin by just adding the `-p` flag (production) to your webpack command line invocation. This will run UglifyJS without needing to include it and save the readability hassle when debugging locally.


    webpack -p 

Run the webpack CLI with the mentioned `-p` flag and take note of you bundle.js size. We were able to shave off a 2kb’s just from minification.


    $ webpack -p
    Hash: 55c9acfaade84ec81ed4
    Version: webpack 3.8.1
    Time: 621ms
        Asset       Size  Chunks             Chunk Names
    bundle.js  520 bytes       0  [emitted]  main
       [0] ./index.js 42 bytes {0} [built]

There are number of other plugins for webpack created by the community for Offline Caching, Compression, and Hot Module Replacement. Take a look at the list webpack recommends in their documentation. 

Now time for React
React is a library that makes creating UI and the components much easier. We will need to add a few React dependencies before getting started. 


    npm install react react-dom
    npm install babel-preset-react -D

Add the babel-react-react  to the .babelrc file.
 

    {
      presets: ["env"]
    }

Create a new file, called index.html, trust me this is going to be great. Take note, that we re setting a script tag to point to our bundle.js. The body also includes a div tag with a root id.


    <!-- index.html -->
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>React App</title>
    </head>
    <body>
        <div id='root'></div>
        <script src="./bundle.js"></script>
    </body>
    </html>

Update the index.js to use React code with the JSX code below. If you are not familiar with React I recommend checking out their getting started tutorial.


    import React from 'react';
    import ReactDOM from 'react-dom';
    
    class HelloWorld extends React.Component {
      render() {
        return <h1>¡Hola Mundo!</h1>;
      }
    }

Finally point the ReactDOM rendering to the root div and include the HelloWord component.


    // index.js
    ...
    
    // add this to the bottom of your index.js
    const root = document.getElementById('root');
    
    ReactDOM.render(HelloWorld, root);

Holy biscuits! We now have a React app. Thanks to webpack for doing most of the work and babel for getting on JSX on the page. If you open the index.html you be able to see el mundo glorioso.

![](https://d2mxuefqeaa7sj.cloudfront.net/s_6C52E34C351224F33CA7850D2D802587DC56DED6F00E804B1E1B2454768600E1_1511306037881_Screenshot+2017-11-21+15.13.39.png)

Deploy your site to production

I assume you would like you want to share this experience with others and you can by deploying this amazing project to Netlify. There are a few things you need to do to make that happen.

So far we have been using the webpack CLI to build. We also found out the the production flag is preferred. Add the the webpack command to your npm scripts so we can always run the production, even if we don’t think about it. 


    {
      ...,
      "scripts": {
        "build": "webpack -p"
      },
      ...
    }

We should now add the html-webpack-plugin to new index.html.


    npm install html-webpack-plugin -D

Now remove the script tag from our index.html.


    <!-- index.html -->
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>React App</title>
    </head>
    <body>
        <div id='root'></div>
    </body>
    </html>

Update the webpack.config.js to use the HtmlWebpackPlugin. I also am going make a change where instead of bundle in to the root ./bundle.js, I will now bundle into a build folder.  


    const path = require('path');
    const webpack = require('webpack');
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    
    module.exports = {
      entry: './index.js',
      output: {
        // move bundle.js to a folder instead the root 
        path: path.resolve('./build'),
        filename: 'bundle.js'
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            include: path.resolve('./index.js'),
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: require('./.babelrc'),
          }
        ]
      },
      plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        // New plugin
        new HtmlWebpackPlugin({
          // injects bundle.js to our new index.html
          inject: true,
          // copys the content of the existing index.html to the new /build index.html
          template:  path.resolve('./index.html'),
        }),
      ]
    }

Now run npm run build to produce a new build folder that looks like the following:

    ├── build
    │   ├── bundle.js
    │   └── index.html 

With this addition, we can run a production build using `npm run build`, this is helpful when using the Netlify Continuous Deployment feature. Be sure to also set your build location as build.

https://www.youtube.com/watch?v=mN9oI98As_4&

What is next?

Webpack is a powerful tool that can do much more than just bundle your project. I hope you have a good foundation for understanding new and existing webpack configs. Check out the webpack documentation to find out how you add code splitting, compression, and adding a development server to your project. I go over that as well in a previous post on what build tools can do for you.
