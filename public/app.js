let btns = document.querySelectorAll('button')
const mainP = document.querySelector('#main-paragraph')
const secondaryP = document.querySelector('#show-operation-paragraph')

let arr = []
let lastOperation = ''

function reset() {
  mainP.textContent = '0'
  secondaryP.textContent = ''
  arr = []
  lastOperation = ''
  console.clear()
}

//! issue -> it doesn't work when you write a number after an operation
function printNumber(text) {
  console.log(arr)
  if (text === 'AC' || text == 'Backspace' || text == 'Delete' || text == 'Escape') {
    reset()
    return
  }

  if (lastOperation != '') {
    arr.push(Number(mainP.textContent)) //! can be NaN (NaN is typeof=Number)
    mainP.textContent = ''
  }

  if (text === ',') text = '.'

  if (text === '.' && (mainP.textContent === '0' || mainP.textContent === '')) {
    mainP.textContent = '0.'
    return
  }

  if (mainP.textContent === '0') {
    mainP.textContent = text
    return
  }

  if (text === '.' && mainP.textContent.includes('.')) {
    return
  }

  if (mainP.textContent.length === 9) return

  mainP.textContent += text
}

function makeOperation(btnId) {
  arr.push(Number(mainP.textContent)) //! can be NaN

  if (arr[arr.length - 2]) {
    if (lastOperation === 'div') {
      //! cut 4 digits after '.' 
      //Example:
      // 4.123456789 -> 4.1235
      // toFixed doesn't solve this
      // Exampe:
      // 4 -> 4.0000 (ugly)
      let result = arr[arr.length - 2] / arr[arr.length - 1]
      if (!Number.isInteger(result)) {
        result = result.toFixed(4)
      }
      mainP.textContent = result
      secondaryP.textContent = `${arr[arr.length - 2]} / ${arr[arr.length - 1]} = ${result}`

      //* solve this .0000 (using slice?)
      // result = toString(result)
      // if (result.slice(-4) == '0000') {
      //   result = Number(result.slice(0, -5))
      //   console.log(result)
      // } else {
      //   result = Number(result)
      // }
    } else if (lastOperation === 'mult') {
      let result = arr[arr.length - 2] * arr[arr.length - 1]

      if (!Number.isInteger(result)) {
        result = result.toFixed(4)
      }
      mainP.textContent = result
      secondaryP.textContent = `${arr[arr.length - 2]} x ${arr[arr.length - 1]} = ${result}`

    } else if (lastOperation === 'sub') {
      let result = arr[arr.length - 2] - arr[arr.length - 1]

      if (!Number.isInteger(result)) {
        result = result.toFixed(4)
      }
      secondaryP.textContent = `${arr[arr.length - 2]} - ${arr[arr.length - 1]} = ${result}`
      mainP.textContent = result

    } else if (lastOperation === 'add') {
      let result = arr[arr.length - 2] + arr[arr.length - 1]

      if (!Number.isInteger(result)) {
        result = result.toFixed(4)
      }
      secondaryP.textContent = `${arr[arr.length - 2]} + ${arr[arr.length - 1]} = ${result}`
      mainP.textContent = result
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
      console.warn('what')
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
        makeOperation(btn.id)
      } else {
        console.log(`btn not found, btn: ${btn}`)
      }
    } else {
      console.log('error: ' + btn)
    }
  })
}

document.addEventListener('keyup', e => {
  let key = e.key || String.fromCharCode(e.keyCode)
  // console.log(key)

  //AC
  if (key == 'Backspace' || key == 'Delete' || key == 'Escape') printNumber(key)

  if ((key >= 0 && key <= 9) || key == '.' || key == ',') printNumber(key)
  if (key == '/') makeOperation('div')
  if (key == '*') makeOperation('mult')
  if (key == '-') makeOperation('sub')
  if (key == '+') makeOperation('add')
  if (key == '=' || key == 'Enter') makeOperation('equals')
})

// ios stuff preventing zoom
document.addEventListener(
  'gesturestart', (e) => e.preventDefault()
);