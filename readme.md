# Coupling between Web-Components

**Attention**: This Project is under development and is not productive yet. 

## Goal
Our goal is to measure coupling between (web-)components in an progressive web app, based on different technologies. At first we focus on the web components standard. Afterwards, we would like to measure components from Angular, React and Vue.js. 

## Methodology

### Theory
We definied our metric in the paper mentioned under references. 


### Practice

1. Load recursive referenced files in the project into a tokenizer. Only select HTML, Javascript and Typescript files. 
2. Filter class definitions, used tages and initialized objects.
3. Connect the components based on coupling. Distingush between affrent and effrent coupling. (see theory)
4. Calculate the proposed metrics based on the results from step 3.

## References
This project is based on the paper "Transfer, Measure and Extend Maintainability Metrics for Web Component based Applications to Achieve Higher Quality" from Tobias Münch and Prof. Dr. Rainer Roosmann. 
- Link to Proceedings: https://www.scitepress.org/PublicationsDetail.aspx?ID=4KBx995+wbU=&t=1 