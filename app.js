let btns = document.querySelectorAll('button')
const screenP = document.querySelector('p')

let arr = []
let lastOperation = ''

function reset() {
  screenP.textContent = '0'
  arr = []
  lastOperation = ''
}

function printNumber(text) {
  if (text === 'AC') {
    reset()
    return
  }

  if (lastOperation != '') {
    arr.push(Number(screenP.textContent)) //! can be NaN
    screenP.textContent = ''
  }

  if (text === ',') text = '.' //if user uses keyboard... next feature ;)

  if (text === '.' && screenP.textContent === '0') {
    screenP.textContent = '0.'
    return
  }

  if (screenP.textContent === '0') {
    screenP.textContent = text
    return
  }

  if (text === '.' && screenP.textContent.includes('.')) {
    return
  }

  if (screenP.textContent.length === 9) return

  screenP.textContent += text
}

function storeOperation(btnId) {
  arr.push(Number(screenP.textContent)) //! can be NaN

  if (arr[arr.length - 2]) {
    if (lastOperation === 'div') {
      //! cut 4 digits after '.' 
      //Example:
      // 4.123456789 -> 4.1235
      // toFixed doesn't solve this
      // Exampe:
      // 4 -> 4.0000 (ugly)
      let result = (arr[arr.length - 2] / arr[arr.length - 1]).toFixed(4)
      console.log(`${arr[arr.length - 2]} / ${arr[arr.length - 1]} = ${result}`)

      //* solve this
      result = toString(result)
      if (result.slice(-4) == '0000') {
        result = Number(result.slice(0, -5))
        console.log(result)
      }
      result = Number(result)
      screenP.textContent = result
    }
  }

  switch (btnId) {
    case 'div':
      lastOperation = 'div'
      break;
    case 'mult':
      lastOperation = 'mult'
      break;
    case 'sub':
      lastOperation = 'sub'
      break;
    case 'add':
      lastOperation = 'add'
      break;
    case 'equals':
      lastOperation = 'equals'
      //make operation and print
      break;

    default:
      break;
  }
}

// EVENT LISTENER
for (i = 0; i < btns.length; i++) {
  let btn = btns[i]
  btn.addEventListener('click', () => {

    if (btn) {
      if (btn.classList.contains('number')) {
        printNumber(btn.textContent)
      } else if (btn.classList.contains('operation')) {
        storeOperation(btn.id)
      } else {
        console.log(`btn not found, btnId: ${btn.id}`)
      }
    } else {
      console.log('error: ' + btn)
    }

  })
}
