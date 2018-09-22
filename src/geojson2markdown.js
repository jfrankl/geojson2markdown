const fs = require('fs')
const commandLineArgs = require('command-line-args')
const path = require('path')
const slugify = require('slugify')
const empty = require('empty-folder')
const json2yaml = require("./js/json2yaml.js")
const emptyObject = require("./js/empty-object.js")

const optionDefinitions = [
    { name: 'filename', alias: 'p', type: String },
    { name: 'src', type: String, multiple: true, defaultOption: true },
]

const options = commandLineArgs(optionDefinitions)

const input = options.src[0];
const outputDirectory = options.src[1];

function writeFiles(data) {
	myFile = JSON.parse(data).features;
	myFile.forEach((feature, i) => {
		const newobj = {...feature.properties, geojson: feature, number: i}
		const filename = feature.properties[options.filename] || input.split(".")[0];
		emptyObject(newobj.geojson.properties);
		yaml = "---\n" + json2yaml(newobj) + "\n---";
		fs.writeFile(outputDirectory + `${i}-${slugify(filename)}.md`, yaml, function(err) {
		    if (err) { return console.log(err); } 
		}); 
	})
}

// Create output directory if it doesn't exist; empty it if it does exist
if (!fs.existsSync(outputDirectory)){
    fs.mkdirSync(outputDirectory);
} else {
	empty(outputDirectory, false, (o)=>{
	    if(o.error) console.error(err);
	});
}

// Read geojson input and create markdown files for each individual feature
fs.readFile(input, function(err, data) {
	if (err) { return console.log(err) } else {
		writeFiles(data);
	}
});