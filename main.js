const commandList = {
    change : {
        pink : '#ff3d7a',
        orange : '#ff6636',
        green : '#249c1d'
    }
}


const controllables = [...document.querySelectorAll('.controllable')];
const actions = [...document.querySelectorAll('.action')];
let transcript;
let selectedAction;
let selectedElement;
let status = 'SELECTING ACTION';

controllables.forEach( (el, i) => {
    el.style.top = i*25 + 'vh';
    el.style.left = 20+ i*5 + 'vw';
})

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();
  recognition.interimResults = true;
  recognition.lang = 'en-GB';

  recognition.addEventListener('result', e => {
    transcript = e.results[0][0].transcript;
    let lastWord = transcript.split(' ')[transcript.split(' ').length-1];
    console.log(lastWord)

    if (status === 'SELECTING ACTION'){
        actions.forEach( action => {
            if (transcript.toLowerCase().includes(action.dataset.key.toLowerCase())){ 
                selectedAction = action;
                selectedAction.classList.add('selected')
                status = 'SELECTING ELEMENT';
            }
        })
    } else if (status === 'SELECTING ELEMENT'){
          // LOOP THROUGH CONTROLLABLES AND CHECK FOR A MATCH
        controllables.forEach( elem => {
            if (transcript.toLowerCase().includes(elem.dataset.key.toLowerCase())){ 
                selectedElement = elem;
                selectedElement.classList.add('selected')
                status = 'SELECTING VALUE';
            }
        })
    } else if (status === 'SELECTING VALUE'){
        let action = selectedAction.dataset.key.toLowerCase();
        if (action === 'move'){
            let dir = '';
            if (lastWord.toLowerCase().includes('left')) dir='left';
            if (lastWord.toLowerCase().includes('right')) dir='right';
            if (lastWord.toLowerCase().includes('up')) dir='up';
            if (lastWord.toLowerCase().includes('down')) dir='down';

            switch (dir) {
                case 'left':
                selectedElement.style.left = parseFloat(selectedElement.style.left.split('vw')[0]) - 2 + 'vw';
                console.log('triggered left')
                break;
                case 'right':
                console.log('triggered right')
                selectedElement.style.left = parseFloat(selectedElement.style.left.split('vw')[0]) + 2 + 'vw';
                break;
                case 'up':
                console.log('triggered up')
                selectedElement.style.top = parseFloat(selectedElement.style.top.split('vh')[0]) - 2 + 'vh';
                break;
                case 'down':
                console.log('triggered down')
                selectedElement.style.top = parseFloat(selectedElement.style.top.split('vh')[0]) + 2 + 'vh';
                break;
            }

        } else if (action ==='colour'){
            selectedElement.style.background = lastWord;
        } else if (action === 'toggle'){
        console.log('toggle')
        }
    }

    // If the user has stopped an utterance, reset status and remove highlight class
    if (e.results[0].isFinal) {
        controllables.forEach( el => el.classList.remove('selected'));
        actions.forEach( el => el.classList.remove('selected'));
        status = 'SELECTING ACTION';
      }
  })
  // When recognition has recognised the end of an utterance, start recognition again
  recognition.addEventListener('end', recognition.start);
  recognition.start();
  