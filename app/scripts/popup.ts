import { setStorage, getStorage } from "./storage";

window.onload = function() {
    const spaceName = document.getElementById("spaceName") as HTMLInputElement;
    const apiKey = document.getElementById("apiKey") as HTMLInputElement;
    const frequency = document.getElementById("frequency") as HTMLInputElement;
    const sound = document.getElementById("sound") as HTMLInputElement;

    spaceName.addEventListener("change", e => {
        setStorage({spaceName: (e.target as HTMLInputElement).value});
        notify();
    });

    apiKey.addEventListener("change", e => {
        setStorage({apiKey: (e.target as HTMLInputElement).value});
        notify();
    });

    frequency.addEventListener("change", e => {
        setStorage({frequency: (e.target as HTMLInputElement).value});
        notify();
    });

    sound.addEventListener("change", e => {
        setStorage({isSound: (e.target as HTMLInputElement).checked});
    });

    const storage = getStorage();
    spaceName.value = storage.spaceName;
    apiKey.value = storage.apiKey;
    frequency.value = storage.frequency.toString();
    sound.checked = storage.isSound;
}

const notify = () => {
    chrome.runtime.sendMessage({update: true});
}
