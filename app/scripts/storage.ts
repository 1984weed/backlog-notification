export interface BNStorage {
    spaceName: string;
    apiKey: string;
    frequency: number;
    isSound: boolean;
}

export const canRequest = (s: BNStorage): boolean =>
    s.spaceName !== '' && s.apiKey !== '';


const defaultStorage: BNStorage  = {
    spaceName: '',
    apiKey: '',
    frequency: 60,
    isSound: false
}

export const getStorage = (): BNStorage => {
    let param = {};
    const apiKey = localStorage.apiKey;
    if(apiKey != null){
        param = Object.assign(param, {apiKey});
    }
    const spaceName = localStorage.spaceName;
    if(apiKey != null){
        param = Object.assign(param, {spaceName});
    }

    const frequency = localStorage.frequency;
    if(frequency != null){
        param = Object.assign(param, {frequency});
    }

    const isSound = localStorage.isSound;
    if(isSound != null){
        param = Object.assign(param, {isSound});
    }
    return Object.assign({}, defaultStorage, param);
};

export const setStorage = (param: any) => {
    Object.assign(localStorage, param);
}