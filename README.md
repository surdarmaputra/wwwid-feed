
<p align="center">
<img src="./src/images/wwwid-512.png" width="200" style="margin: auto;">
</p>

# WWWID Reader #

[![Build Status](https://travis-ci.org/sdarmaputra/wwwid-feed.svg?branch=master)](https://travis-ci.org/sdarmaputra/wwwid-feed)

Simple content reader app for [WWWID](https://medium.com/wwwid) as part of [WWWID PWA Challenge](https://medium.com/wwwid/tantangan-web-developer-untuk-membuat-aplikasi-web-bisa-digunakan-kurang-dari-5-detik-70bb7431741d).

[Demo](https://sdarmaputra.github.io/wwwid-feed)

## Features and Capabilites ##

- List of feeds
- Feed detail
- Category filter with search box
- List of feeds by category
- Lazy load image (for some pages)

## Getting Started ##

1. Clone the repo
2. Run `yarn install`

### How to develop ###

1. Run `yarn run dev` to fire up development server
2. Start to code
3. Run `yarn run build` to generate final app files

This project use [webpack-dev-server](https://github.com/webpack/webpack-dev-server) to serve project files during development process. The configuration file for development located in `webpack.dev.js`.

### Running the tests ###

1. Run `yarn run test` to fire up [jasmine](https://jasmine.github.io/)

Here's the library used for testing:
- [jasmine](https://jasmine.github.io/) as a test framework.
- [jasmine-dom-custom-matchers](https://github.com/devrafalko/jasmine-dom-custom-matchers) as assertions for DOM-related tests
- [JSDOM](https://github.com/jsdom/jsdom) as a helper for DOM-related tests

All test scenarios located in directory `spec`.

### Deployment ###

1. Run `yarn run deploy`

We use [gh-pages](https://github.com/tschaub/gh-pages) to deploy the app into GitHub Page.


## Audit ##

We use [Lighthouse](https://developers.google.com/web/tools/lighthouse/) to help us auditing and improving the app quality. Audit logs located in directory `audits`

## License ##
MIT

Crafted with :heart: by [sdarmaputra](https://github.com/sdarmaputra)
