class Quiz {
    constructor(data, parentElement) {
        this.DATA = data;
        this.parentEl = document.querySelector(parentElement);
        this.activeIndex = 0;
    }

    actualQuiestions() {
        let questions = this.DATA[this.activeIndex].answers.map(question => {
            return `<li data-id="${question.id}"><input type="checkbox"><span>${question.text}</span></li>`;
        });
        return questions.join('');
    }

    render() {
        if (this.activeIndex === 0) {
            this.parentEl.innerHTML = `
                <div class="question">${this.DATA[this.activeIndex].question}</div>
                <ul class="answers">${this.actualQuiestions()}</ul>
                <div class="buttons">
                    <button id="button-next">Next</button>
                </div>
            `;
        } else if (this.activeIndex === this.DATA.length - 1) {
            this.parentEl.innerHTML = `
                <div class="question">${this.DATA[this.activeIndex].question}</div>
                <ul class="answers">${this.actualQuiestions()}</ul>
                <div class="buttons">
                    <button id="button-prev">Prev</button>
                </div>
            `;
        } else {
            this.parentEl.innerHTML = `
                <div class="question">${this.DATA[this.activeIndex].question}</div>
                <ul class="answers">${this.actualQuiestions()}</ul>
                <div class="buttons">
                    <button id="button-prev">Prev</button>
                    <button id="button-next">Next</button>
                </div>
            `;
        }
        let inputs = this.parentEl.querySelectorAll('input[type="checkbox"]');
        let btnNext = this.parentEl.querySelector('#button-next');
        let btnPrev = this.parentEl.querySelector('#button-prev');
        inputs[0].checked = 'checked';
        inputs.forEach(input => {
            input.addEventListener('change', () => {
                inputs.forEach(input => {
                    input.checked = false;
                });
                input.checked = 'checked';
                if (this.activeIndex < this.DATA.length - 1) {
                    this.activeIndex++;
                    this.render();
                }
            });
        });
        if (btnNext) {
            btnNext.addEventListener('click', () => {
                if (this.activeIndex < this.DATA.length - 1) {
                    this.activeIndex++;
                    this.render();
                }
            });
        }
        if (btnPrev) {
            btnPrev.addEventListener('click', () => {
                if (this.activeIndex >= 1) {
                    this.activeIndex--;
                    this.render();
                }
            });
        }
    }

    init() {
        this.render();
    }
}

const questions = [
    {
        question: 'Qustion 1',
        answers: [
            { id: 1, text: 'kjgrdjodjg'},
            { id: 2, text: 'klefoskpog'},
        ]
    },
    {
        question: 'Qustion 2',
        answers: [
            { id: 3, text: 'eigjgioshiog'},
            { id: 4, text: 'seijfijseiofhs'},
        ]
    },
    {
        question: 'Qustion 3',
        answers: [
            { id: 5, text: 'eigjgioshiog'},
            { id: 6, text: 'seijfijseiofhs'},
        ]
    },
];

const quiz = new Quiz(questions, '#quiz');

quiz.init();