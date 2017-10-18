/*
Commands to implement:
    Change colour
    Move x pixels left/right
    Add element
*/

const commandList = {
    change : {
        pink : '#ff3d7a',
        orange : '#ff6636',
        green : '#249c1d'
    }
}

const body = document.body;



// When speech is recognised, check through commandlist to see if that phrase exists. If it does, listen for next utterance.