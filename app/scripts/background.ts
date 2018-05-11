import {getLabel, NotificationData, BacklogNotification} from './message'
import { getStorage, BNStorage, canRequest } from './storage';

function show(message: string, id: number, space: string, isSound: boolean){
    let notification = new Notification("You got a new notification in Backlog", {
        body: `${message}`
    })

    notification.onclick = function () {
        window.open(`https://${space}/globalbar/notifications/redirect/${id}`);
    };
    if(isSound) {
      let notifySound = new Audio("./sounds/bell.mp3");
      notifySound.play();
    }
}

let setId;
const request = (space: string, apiKey: string, isSound: boolean) => {
    fetch(`https://${space}/api/v2/notifications?apiKey=${apiKey}`).then(
        (response) => {
            if(response.status === 200){
                return response.json()
            } else {
                throw new Error("Setting error")
            }
        }
    ).then((data: BacklogNotification[]) => {
        let unreadItems = data.filter(item => {
            return item.id > (localStorage.lastId || 0)
        })
        let lastId = data ? data[0].id || 0 : 0
        if(unreadItems.length > 0){
            if(localStorage.lastId){
                unreadItems.forEach(a => show(getLabel(a, "en"), a.id, space, isSound))
            }
            localStorage.lastId = lastId
        }
    }).catch((e) => {
        console.error(e)
    });
}

function doRequest(storage: BNStorage){
    if(canRequest(storage)){
        request(storage.spaceName, storage.apiKey, storage.isSound);
    }
}

const alarmName = "polling"

const createAlarm = ()  => {
    const frequency = getStorage().frequency;
    chrome.alarms.create(alarmName, 
        {delayInMinutes: 0.1, periodInMinutes: frequency / 60}
    )
}


const cancelAlarm = () =>  
    chrome.alarms.clear(alarmName);

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        if (request.update === true){
            cancelAlarm()
            createAlarm()
        }
    }
);
createAlarm()

chrome.alarms.onAlarm.addListener(() => doRequest(getStorage()))


