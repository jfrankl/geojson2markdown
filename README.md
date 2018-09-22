# geojson2markdown
Takes a geojson file and outputs a markdown file for each feature.

## Usage

```sh
$ node geojson2Markdown.js <input> <outputDirectory> <-p propertyName>
```
**Parameters**

-   `input` **[GeoJSON]** input GeoJSON FeatureCollection
-   `outputDirectory` **[directory]** output directory
-   `propertyName` **[string]?** property on geojson feature to use in markdown filename (optional)

## Installation

Install dependencies:

```sh
$ npm install
```

## Example

This repository comes prepackaged with a sample geojson file. Let's see how you would convert that to markdown files.
```sh
$ cd src/
$ node geojson2Markdown.js data/ne_10m_parks_and_protected_lands_scale_rank.geojson  _output/ -p name
```
