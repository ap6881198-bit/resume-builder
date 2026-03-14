const API_KEY = "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"


function generateResume(){

let name=document.getElementById("name").value
let profession=document.getElementById("profession").value
let skills=document.getElementById("skills").value
let experience=document.getElementById("experience").value
let photo=document.getElementById("photo").files[0]

let reader=new FileReader()

reader.onload=function(){

localStorage.setItem("photo",reader.result)
localStorage.setItem("name",name)
localStorage.setItem("profession",profession)
localStorage.setItem("skills",skills)
localStorage.setItem("experience",experience)

window.location="resume.html"

}

reader.readAsDataURL(photo)

}



async function generateAI(){

let skills=localStorage.getItem("skills")
let profession=localStorage.getItem("profession")
let experience=localStorage.getItem("experience")

let prompt =
`Write a short professional resume summary for a ${profession}. 
Skills: ${skills}. 
Experience: ${experience}.`

try{

let response = await fetch(
"https://api-inference.huggingface.co/models/gpt2",
{
method:"POST",
headers:{
"Authorization":"Bearer "+API_KEY,
"Content-Type":"application/json"
},
body:JSON.stringify({
inputs:prompt
})
}
)

let data = await response.json()

if(data && data[0] && data[0].generated_text){
return data[0].generated_text
}
else{
return "A passionate professional skilled in "+skills+" with experience in "+experience+"."
}

}
catch(error){

return "A passionate professional skilled in "+skills+" with experience in "+experience+"."

}

}



if(window.location.pathname.includes("resume.html")){

document.getElementById("userPhoto").src=localStorage.getItem("photo")
document.getElementById("userName").innerText=localStorage.getItem("name")
document.getElementById("userProfession").innerText=localStorage.getItem("profession")

document.getElementById("userSkills").innerText=localStorage.getItem("skills")
document.getElementById("userExperience").innerText=localStorage.getItem("experience")

generateAI().then(text=>{
document.getElementById("about").innerText=text
})

}



function downloadPDF(){

let element=document.getElementById("resume")

html2pdf().from(element).save("resume.pdf")

}
