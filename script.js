const API_KEY = "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";

function generateResume(){

let name = document.getElementById("name").value;
let profession = document.getElementById("profession").value;
let skills = document.getElementById("skills").value;
let experience = document.getElementById("experience").value;
let photoInput = document.getElementById("photo");

if(!name || !profession || !skills || !experience){
alert("Please fill all fields");
return;
}

let reader = new FileReader();

if(photoInput.files.length > 0){

reader.onload = function(){

localStorage.setItem("photo", reader.result);
localStorage.setItem("name", name);
localStorage.setItem("profession", profession);
localStorage.setItem("skills", skills);
localStorage.setItem("experience", experience);

window.location.href = "resume.html";

};

reader.readAsDataURL(photoInput.files[0]);

}else{

localStorage.setItem("photo","");
localStorage.setItem("name",name);
localStorage.setItem("profession",profession);
localStorage.setItem("skills",skills);
localStorage.setItem("experience",experience);

window.location.href="resume.html";

}

}


async function generateAI(){

let skills = localStorage.getItem("skills");
let profession = localStorage.getItem("profession");
let experience = localStorage.getItem("experience");

let prompt = `
Write a professional resume profile summary of around 200 words.

Profession: ${profession}
Skills: ${skills}
Experience: ${experience}

The summary should be professional, ATS friendly, highlight achievements, leadership, productivity and career impact.
`;

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
);

let data = await response.json();

if(data && data[0] && data[0].generated_text){
return data[0].generated_text;
}else{
return "A motivated professional skilled in "+skills+" with experience in "+experience+".";
}

}
catch(error){
return "A motivated and detail-oriented professional with strong expertise in "+skills+". Demonstrated experience in building and delivering multiple web projects while focusing on clean design, performance, and usability. Skilled in modern development practices and passionate about creating responsive, user-friendly digital solutions. Proven ability to solve technical challenges, collaborate effectively, and continuously learn new technologies to improve product quality and efficiency.";
}

}



if(window.location.pathname.includes("resume.html")){

document.getElementById("userPhoto").src = localStorage.getItem("photo");
document.getElementById("userName").innerText = localStorage.getItem("name");
document.getElementById("userProfession").innerText = localStorage.getItem("profession");

let skills = localStorage.getItem("skills").split(" ")
let skillsHTML = ""

skills.forEach(skill=>{
skillsHTML += "<li>"+skill+"</li>"
})

document.getElementById("userSkills").innerHTML = skillsHTML


let experience = localStorage.getItem("experience")

let expHTML = `
<li>Developed and delivered multiple web development projects including ${experience}, focusing on responsive design and modern frontend practices.</li>

<li>Built user-friendly interfaces using modern web technologies while ensuring performance, accessibility, and clean UI design.</li>

<li>Collaborated on planning, development, and deployment of web applications, improving usability and overall website performance.</li>
`

document.getElementById("userExperience").innerHTML = expHTML

generateAI().then(text=>{
document.getElementById("about").innerText = text;
})

}


function downloadPDF(){

let element = document.getElementById("resume");

html2pdf().from(element).save("resume.pdf");

}
