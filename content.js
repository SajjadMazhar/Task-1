console.log("Okay... Let's start!");
let nameList = []; // To push all the sames after extraction

// receiving inputs 'start' and 'end' page number...
chrome.runtime.onMessage.addListener((req) => {
    selectPage(req[0], req[1]);
})

// retrieving button elements redirect to the page associated with the button
async function selectPage(start, end) {
    try {
        startScrollLoop();
        for (let i = start - 1; i < end; i++) {

            await sleep(5000);
            let numberBtns = document.querySelectorAll(".artdeco-pagination__pages li button");
            numberBtns[i].click();
            await sleep(5000);
            loadNames();

        }

        console.log(nameList);
        nameList = [];
        stopScrollLoop();
        alert("Done!");

    } catch (err) { console.log("Error occured: " + err); }

}

// retrieving names and pushing it into a list
function loadNames() {
    let allNameTags = document.querySelector(".ph0").querySelectorAll(".app-aware-link span span");
    for (let i = 0; i < allNameTags.length; i += 2) {
        nameList.push(toAlpha(allNameTags[i].innerHTML));
    }
}

function toAlpha(str) {
    return str.replace(/[^A-Za-z\b \b]/g, "");
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// handles start/stop scroll loop 
function incrementScroll() {
    window.scrollBy(0, 50);
}

function startScrollLoop() {
    scrollLoop = setInterval(incrementScroll, 200);
}

function stopScrollLoop() {
    clearInterval(scrollLoop);
}





