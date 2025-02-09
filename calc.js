class Calculator {
    constructor(lastresultnumber, currentresultnumber) {
        this.lastresultnumber = lastresultnumber[0];
        this.currentresultnumber = currentresultnumber[0];

        
        console.log('lastresultnumber:', this.lastresultnumber);
        console.log('currentresultnumber:', this.currentresultnumber);

        this.currentresult = '';
        this.lastresult = '';
        this.operation = undefined;
    }

    clear() {
        this.currentresult = '';
        this.lastresult = '';
        this.operation = undefined;
    }

    delete() {
        this.currentresult = this.currentresult.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currentresult.includes('.')) return;
        this.currentresult = this.currentresult.toString() + number.toString();
        console.log('currentresult after append:', this.currentresult);  
    }

    chooseOperation(operation) {
        if (this.currentresult === '') return;
        if (this.lastresult !== '') {
            this.compute();
        }
        this.operation = operation;
        this.lastresult = this.currentresult;
        this.currentresult = '';
    }

    compute() {
        let computation;
        const last = parseFloat(this.lastresult);
        const curr = parseFloat(this.currentresult);
        if (isNaN(last) || isNaN(curr)) return;
        switch (this.operation) {
            case '+':
                computation = last + curr;
                break;
            case '-':
                computation = last - curr;
                break;
            case '*':
                computation = last * curr;
                break;
            case '÷':
                computation = last / curr;
                break;
            default:
                return;
        }
        this.currentresult = computation;
        this.operation = undefined;
        this.lastresult = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0,
            });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        console.log('Updating display...');
        this.currentresultnumber.innerText = this.getDisplayNumber(this.currentresult);
        if (this.operation != null) {
            this.lastresultnumber.innerText = `${this.getDisplayNumber(this.lastresult)} ${this.operation}`;
        } else {
            this.lastresultnumber.innerText = '';
        }
    }
}

const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operation');
const equalsButtons = document.querySelectorAll('.equals');
const deleteButtons = document.querySelectorAll('.delete');
const allClearButtons = document.querySelectorAll('.all-clear');
const lastresultnumber = document.querySelectorAll('.lastresult');
const currentresultnumber = document.querySelectorAll('.currentresult');

console.log('numberButtons:', numberButtons);  

const calculator = new Calculator(lastresultnumber, currentresultnumber);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.compute();
        calculator.updateDisplay();
    });
});

allClearButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.clear();
        calculator.updateDisplay();
    });
});

deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.delete();
        calculator.updateDisplay();
    });
});
