# VAIL

"Visual and Intuitive Learning" is a collection of interactive sketches in various disciplines that attempts to explain complex ideas in an obvious visual way as to be grasped intuitively.

The sketches are written in [P5js](p5js.org) / Javascript. Each sketch resides in the "lessons" folder. I designed it so that each sketch essentially stands alone in its own scope and is loaded in the main page dynamically using jQuery. For now, a human-edited JSON file orchestrates the organization.

## Dev Environment

`git clone https://github.com/jsphweid/VAIL.git` to clone to directory

`npm install` to download dependencies

`npm start` to serve up the app

`npm run build` to make production build to '/build' folder

### TODO
 - abstract common sketch building functions (draw grid? forward / backward button)
 - use node to parse file directory of /lessons (lessons/digital-signal-processing/convolution.js) and MAKE the json file on build. Therefore, creating a new lesson is as easy as adding it and building the project. Getting it to work with the view in the accordion sidebar is just a grunt task. For now, useful tool: http://www.jsoneditoronline.org/
 - routing using URLs would make it easier to send someone a link to a sketch and automatically have it open up.
 - a 'standard' for sketch size needs to be determined OR a way of dynamically handling various sketch sizes needs to be developed.
