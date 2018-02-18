const { JSDOM } = require('jsdom')

const page = new JSDOM('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>WWWID Feeds</title></head><body></body></html>')
const { window } = page
const { document, Element, location } = window

global.window = window
global.document = document
global.Element = Element
global.location = location
