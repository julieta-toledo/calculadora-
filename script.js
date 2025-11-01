const display = document.getElementById('display');
let current = '0';
let previous = '';
let operator = null;

function updateDisplay() {
  display.textContent = current;
}

document.querySelector('.buttons').addEventListener('click', e => {
  const btn = e.target;
  const num = btn.dataset.number;
  const action = btn.dataset.action;

  if (num !== undefined) {
    if (current === '0') current = num;
    else current += num;
  }

  if (action) {
    switch (action) {
      case 'clear':
        current = '0';
        previous = '';
        operator = null;
        break;

      case 'backspace':
        current = current.length > 1 ? current.slice(0, -1) : '0';
        break;

      case 'add':
      case 'subtract':
      case 'multiply':
      case 'divide':
        operator = action;
        previous = current;
        current = '0';
        break;

      case 'equals':
        if (operator && previous !== '') {
          const a = parseInt(previous);
          const b = parseInt(current);
          switch (operator) {
            case 'add':
              current = a + b;
              break;
            case 'subtract':
              current = a - b;
              break;
            case 'multiply':
              current = a * b;
              break;
            case 'divide':
              current = b !== 0 ? Math.floor(a / b) : 'Error';
              break;
          }
          operator = null;
          previous = '';
        }
        break;
    }
  }

  updateDisplay();
});
