let a = document.querySelector('.a');
let zero = document.querySelector('.zero');
let buttons = document.querySelectorAll('button');
let n = document.querySelector('#num');
let apaga = document.querySelector('#c');
let evaluate = document.querySelector('#evaluate');
let valor = [];

apaga.addEventListener("click", () => {

    valor = [''];
    zero.innerHTML = 0;
    a.className = 'a'
    zero.className = 'zero';
    zero.style.color = "rgba(150, 150, 150, 0.87)";

})

buttons.forEach((btn) => {

    btn.addEventListener("click", () => {

        if (!btn.id.match('num')) {

            valor.push(btn.value);
            a.innerHTML = valor.join('');

            if (btn.classList.contains('number')) {

                zero.innerHTML = eval(valor.join(''));

            }

        }

        if (btn.id.match('num')) {

            valor.pop();
            a.innerHTML = valor.join('');
            zero.innerHTML = eval(valor.join(''));

        }

        if (btn.id.match('evaluate')) {

            a.className = 'zero';
            zero.className = 'a';
            zero.style.color = "white";

        }

        if (typeof eval(valor.join('')) == 'undefined') {

            zero.innerHTML = 0;

        }

    })
    
})