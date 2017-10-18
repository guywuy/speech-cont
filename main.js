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


const controllables = [...document.querySelectorAll('.controllable')];
let transcript;
let targetedElement;
let status = 'SELECTING ELEMENT';

controllables.forEach( (el, i) => {
    el.style.top = Math.random()*60 + 'vh';
    el.style.left = Math.random()*60 + 'vw';
})

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();
  recognition.interimResults = false;
  recognition.lang = 'en-GB';

  recognition.addEventListener('result', e => {
    transcript = e.results[0][0].transcript;
    console.log(transcript)

    // IF WE ARE CURRENTLY SELECTING AN ELEMENT
    if (status === 'SELECTING ELEMENT'){
          // LOOP THROUGH CONTROLLABLES AND CHECK FOR A MATCH
        controllables.forEach( elem => {
            if (transcript.toLowerCase().includes(elem.dataset.key.toLowerCase())){ 
                targetedElement = elem;
                status = 'SELECTING COLOR';
            }
        })
    } else if (status === 'SELECTING COLOR'){
            targetedElement.style.background = transcript;
            status = 'SELECTING ELEMENT';
    }
  })
  // When recognition has recognised the end of an utterance, start recognition again
  recognition.addEventListener('end', recognition.start);
  recognition.start();
  