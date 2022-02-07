# SNIK Quiz

![build](https://github.com/snikproject/snik-graph/actions/workflows/build.yml/badge.svg)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

![SNIK Quiz screenshot](../../releases/download/0.2/snik-quiz.png)

## Usage
Play at http://www.snik.eu/quiz by clicking on the correct answer for each of the questions.

## Development
Requires `npm` and a Linux style command line with tools like `sed`.

### Create Questions

* There are several types of questions which have a template each.
* The questions from all templates are merged into a [JavaScript file](src/data/quiz-data.js).
* Recreating the questions is only necessary when the templates have been changed or the data on the [SNIK SPARQL endpoint](https://www.snik.eu/sparql) has changed in a way that should be reflected in the questions.
* Recreating the questions is a partially automated process.

#### Process

subject.sparql depends on the graph http://www.snik.eu/ontology/derived.
For each template:

1. Execute the SPARQL query in the `sparql` directory, for example [definition.sparql](sparql/definition.sparql). You may need to disable "Strict checking of void variables" in the Virtuoso SPARQL Query Editor.
2. Save the output as a tab separated values (TSV) file, such as `definition.tsv`.
3. Use the transformation script to create a JavaScript  for example `./transform-definition < input > definition.js`
4. The transformation file may not be correct, use a text editor with search and replace to create a syntactically correct JavaScript array.

At the end, use the existing [quiz-data.js](src/data/quiz-data.js) to get the header and footer and add the contents of the template arrays.

#### Question Templates

* Name: Given a definition, choose between the names of 4 "similar" classes to find the correct one.

##### Add a new Question Template
Create the files as required by the process.

### Run Locally
`npm start`

### Deploy to GitHub Pages

    npm run build
    ./deploy

### License
SNIK Quiz uses the MIT license like <https://github.com/davidrayoussef/react-quiz>, which this is a fork of with minimal modifications.
The main contribution of SNIK Quiz is the question data, not the user interface.
