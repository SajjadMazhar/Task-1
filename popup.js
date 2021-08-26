document.addEventListener("DOMContentLoaded", ()=>{
    // calls when clicking on 'Go' button of popup
    document.querySelector("button").addEventListener("click", ()=>{
        let start = document.getElementById("start");
        let end = document.getElementById("end");
        let pages = [start.value, end.value];

        // sends the input data of popup to content.js
        chrome.tabs.query({currentWindow:true, active:true}, (tab)=>{
            chrome.tabs.sendMessage(tab[0].id, pages)
        })
    })
}, false)