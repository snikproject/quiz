/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 *   https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
 */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function main()
{
 let html = "";
 html+="Which class has this definition?<br>";
 html+="<table><tr><th>Definition</th><th>Class 1</th><th>Class 2</th><th>Class 3</th><th>Class 4</th></tr>";
 for(const def of definition)
 {
  html+="<tr><td class='def'>"+def.def.value+"</td>";

  let classes = [def.class,def.a1,def.a2,def.a3];
  for(const c of shuffle(classes))
  {
   const message = c===def.class?"Right!":"Wrong!"; 
   html+="<td class='class' onclick='alert(\""+message+"\")'";
   html+="<span >"+c.value.replace("http://www.snik.eu/ontology/","") +"</span>";
   html+="</td>";
  }
  html+="</tr>";
 }
 html+="</table>";
 const ele = document.getElementById("main");
 ele.innerHTML = html;
}
