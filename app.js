let btns = document.querySelectorAll('button')
const screenP = document.querySelector('p')

function printNumber(text) {
  if (text === 'AC') {
    screenP.textContent = '0'
    return
  }

  if (screenP.textContent === '0') {
    screenP.textContent = text
    return
  }

  if (text === ',' && screenP.textContent.includes(',')) {
    return
  }

  if (screenP.textContent.length === 9) return

  screenP.textContent += text
}

for (i = 0; i < btns.length; i++) {
  let btn = btns[i]
  btn.addEventListener('click', () => {

    if (btn) {
      printNumber(btn.textContent)
    } else {
      console.log('error: ' + btn)
    }

  })
}
