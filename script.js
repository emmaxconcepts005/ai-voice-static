const w=document.getElementById("wave");
if(w)for(let i=0;i<34;i++){const b=document.createElement("b");b.style.setProperty("--i",i);b.style.setProperty("--h",25+Math.abs(Math.sin(i*.7)*60+Math.cos(i*1.9)*15));w.appendChild(b)}
function route_unused(){const h=(location.hash||"#home").slice(1),id=pages.includes(h)?h:"home";
document.querySelectorAll(".page").forEach(p=>p.classList.toggle("on",p.id===id));
document.querySelectorAll("nav a").forEach(a=>a.getAttribute("href")==="#"+id?a.setAttribute("aria-current","page"):a.removeAttribute("aria-current"));
scrollTo(0,0)}

const fm=document.getElementById("f");
if(fm)fm.addEventListener("submit",async e=>{
e.preventDefault();
const f=fm.elements,note=document.getElementById("note"),btn=fm.querySelector("button[type=submit]");
if(!f["name"].value.trim()||!/^\S+@\S+\.\S+$/.test(f["email"].value)){note.textContent="Enter your name and a valid email address, then send again.";(f["name"].value.trim()?f["email"]:f["name"]).focus();return}
btn.disabled=true;note.textContent="Sending...";
try{
const r=await fetch(fm.action,{method:"POST",body:new FormData(fm),headers:{Accept:"application/json"}});
if(r.ok){fm.reset();note.textContent="Thanks, your message was sent. I'll reply by email or WhatsApp."}
else{const j=await r.json().catch(()=>({}));note.textContent=(j.errors&&j.errors.map(x=>x.message).join(" "))||"Something went wrong. Please try again, or message me on WhatsApp."}
}catch(_){note.textContent="The message could not be sent. Check your connection, or email or message me on WhatsApp."}
btn.disabled=false});
