function e(e){return e.length>=10}class t{static create(e){return fetch("https://authorization-app-88153-default-rtdb.firebaseio.com/questions.json",{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}}).then((e=>e.json())).then((e=>console.log(e)))}}const n=document.getElementById("form"),o=document.querySelector("#question-input"),a=document.querySelector("#submit");n.addEventListener("submit",(function(n){if(n.preventDefault(),e(o.value)){const e={text:o.value.trim(),date:(new Date).toJSON()};t.create(e).then((()=>{o.value="",o.className="",a.disabled=!0}))}})),o.addEventListener("input",(()=>{a.disabled=!e(o.value)}));