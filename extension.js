
let myAdd = []
let listItems = ""
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const saveWebLinkBtn = document.getElementById("saveWebLink-btn")

const adderFromLocal = JSON.parse(localStorage.getItem("myAdd"))

if(adderFromLocal){
    myAdd = adderFromLocal
    callAdder(myAdd)
}

saveWebLinkBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myAdd.push(tabs[0].url)
        localStorage.setItem("myAdd",JSON.stringify(myAdd))
        console.log(myAdd)
        callAdder(myAdd)
    })
})


inputBtn.addEventListener("click", function(){
    
    myAdd.push(inputEl.value)
    inputEl.value=""
    localStorage.setItem("myAdd",JSON.stringify(myAdd))
    callAdder(myAdd)

})

function callAdder(adds){
    listItems=""
    for (x of adds){
        listItems+= `
        <li> 
        <a target='_blank' href='${x}'> ${x} </a>
        </li>
        `
    } 
    ulEl.innerHTML = listItems
}


deleteBtn.addEventListener("dblclick", function(){
    ulEl.innerHTML=""
    localStorage.clear()
    myAdd = []
})






