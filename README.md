# SNIK Quiz

## Question Templates

### Name
Given a definition, choose between the names of 4 "similar" classes to find the correct one.

`
SELECT ?class SAMPLE((?def) as ?def) SAMPLE(?a1 as ?a1) SAMPLE(?a2 as ?a3) SAMPLE(?a3 as ?a3)
{
 ?class a owl:Class.
 ?class skos:definition ?def.
 FILTER(STRLEN(?def)>50).
 FILTER(LANGMATCHES(LANG(?def),"en"))
 
 ?class [] ?a1,?a2,?a3.
 owl:Class ^a ?a1,?a2,?a3.
 FILTER(?class<?a1&&?class<?a2&&?class<?a3
 &&?a1<?a2&&?a1<?a3
 &&?a2<?a3)
} GROUP BY ?class LIMIT 1000
`
