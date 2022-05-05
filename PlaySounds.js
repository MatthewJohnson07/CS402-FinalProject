import { Audio } from 'expo-av';

async function loadedGame() {
    const { sound } = await Audio.Sound.createAsync(
        require('./sounds/KH1LoadGame.mp3')
    );
    await sound.playAsync();
}

async function movedCursor() {
    const { sound } = await Audio.Sound.createAsync(
        require('./sounds/KH1CursorMoveOriginal.mp3')
    );
    await sound.playAsync();
}

async function pressedPurple() {
    const { sound } = await Audio.Sound.createAsync(
        require('./sounds/KH1Select.mp3')
    );
    await sound.playAsync();
}

async function lockedDoor() {
    const { sound } = await Audio.Sound.createAsync(
        require('./sounds/SH1LockedDoor.mp3')
    );
    await sound.playAsync();
}

async function openedDoor() {
    const { sound } = await Audio.Sound.createAsync(
        require('./sounds/SH1OpenedDoor.mp3')
    );
    await sound.playAsync();
}

async function doorUnlocked() {
    const { sound } = await Audio.Sound.createAsync(
        require('./sounds/SH1DoorUnlocked.mp3')
    );
    await sound.playAsync();
}

async function grassyStep() {
    const { sound } = await Audio.Sound.createAsync(
        require('./sounds/SH1GrassyStep.mp3')
    );
    await sound.playAsync();
}

export default function PlaySound(songToPlay) {
    switch (songToPlay) {
        case 'loadedGame':
            loadedGame();
            break;
        case 'movedCursor':
            movedCursor();
            break;
        case 'pressedPurple':
            pressedPurple();
            break;
        case 'lockedDoor':
            lockedDoor();
            break;
        case 'openedDoor':
            openedDoor();
            break;
        case 'doorUnlocked':
            doorUnlocked();
            break;
        case 'grassyStep':
            grassyStep();
            break;
    }
}