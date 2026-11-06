# SNIK Quiz

![build](https://github.com/snikproject/snik-graph/actions/workflows/build.yml/badge.svg)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

![SNIK Quiz screenshot](../../releases/download/0.2/snik-quiz.png)

## Usage

Play at http://www.snik.eu/quiz by clicking on the correct answer for each of the questions or pressing the corresponding letter (`a`–`d`, upper or lower case).

## Development

Requires `npm` and a Linux style command line with tools like `sed`.

### Create Questions

- There are several types of questions which have a template each.
- The questions from all templates are merged into a [JavaScript file](src/data/quiz-data.js).
- Recreating the questions is only necessary when the templates have been changed or the data on the [SNIK SPARQL endpoint](https://www.snik.eu/sparql) has changed in a way that should be reflected in the questions.
- Recreating the questions is a partially automated process.

#### Process

subject.sparql depends on the graph http://www.snik.eu/ontology/derived.
For each template:

1. Execute the SPARQL query in the `sparql` directory, for example [definition.sparql](sparql/definition.sparql). You may need to disable "Strict checking of void variables" in the Virtuoso SPARQL Query Editor.
2. Save the output as a tab separated values (TSV) file, such as `definition.tsv`.
3. Use the transformation script to create a JavaScript file for example `./transform-definition < input.tsv > definition.js`. The script skips the TSV header row, emits question and answer text as escaped strings, and writes a complete file with the Biome suppression comment, `export default [` header and `];` footer.
4. Review the generated file and correct any remaining errors with a text editor.

When merging multiple template files into one data file, keep a single header, footer and Biome suppression comment and concatenate only the question lines. Data files contain plain strings, not JSX elements.

#### Question Templates

- Name: Given a definition, choose between the names of 4 "similar" classes to find the correct one.

##### Add a new Question Template

Create the files as required by the process.

### Run Locally

Check out this repository, then `npm install` once, then `npm run dev`.

### Deploy to GitHub Pages

    npm run build
    ./deploy

### License

SNIK Quiz uses the MIT license like <https://github.com/davidrayoussef/react-quiz>, which this is a fork of with minimal modifications.
The main contribution of SNIK Quiz is the question data, not the user interface.
