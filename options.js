window.addEventListener('load', function() {
    let apiKey = document.getElementById("apiKey");
    let frequency = document.getElementById("frequency");
    let spaceName = document.getElementById("spaceName");

    spaceName.addEventListener("change", (e) => {
        localStorage.spaceName = e.target.value;
        notify();
    });
    spaceName.value = localStorage.spaceName || "";

    apiKey.addEventListener("change", (e) => {
        localStorage.apiKey = e.target.value;
        notify();
    });
    apiKey.value = localStorage.apiKey || ""

    frequency.addEventListener("change", (e) => {
        localStorage.frequency = e.target.value || 60;
        notify();
    })
    if(localStorage.frequency){
        localStorage.frequency = 60;
    }
    frequency.value = localStorage.frequency

    function notify(){
        chrome.runtime.sendMessage({update: true});
    }
});
