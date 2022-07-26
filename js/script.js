// Numbers
const botones = [...document.querySelectorAll(".num")];
const numeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const simbolos = ["+", "-", "/", "*"];

const numBut = botones.filter(element => {
    if (numeros.includes(parseInt(element.value))) {
        return element;
    } else if (element.value == ".") {
        return element;
    }
});

// Operators

const operadores = botones.filter(element => {
    if (simbolos.includes((element.value))) {
        return element;
    }
});

var n1 = "0";
var n2 = "0";

// Other buttons

const otros = botones.filter(element => {
    if (!simbolos.includes((element.value)) && !numeros.includes(parseInt(element.value))) {
        return element;
    }
});

var fullOperation = "";
var firstNumber = true; //It allows to accumulate numbers in first screen
var position = "first"; //Indicates the addend position
var actualFunction = "";

// Screens

const pantallas = document.querySelectorAll(".scre");

// Functions

function vaciar() {
    n1 = "0";
    n2 = "0";
    firstNumber = true;
    position = "first";
    pantallas[0].value = "";
    pantallas[1].value = "0";
    fullOperation = "";
}

function operar(a, b, operacion) {
    return new Function('return (' + a + ") " + operacion + "(" + b + ")")();
}

// Events

numBut.forEach(element => {
    element.addEventListener("click", () => {
        if (element.value == "." && n1.includes(".") || n2.includes(".")) {
            console.log("Ya hay un punto puesto");
        } else if (position == "first") {
            if (!firstNumber) {
                n1 += element.value;
            } else {
                n1 = element.value;
                firstNumber = false;
            }
            pantallas[1].value = n1;
        } else {
            if (!firstNumber) {
                n2 += element.value;
            } else {
                n2 = element.value;
                firstNumber = false;
            }
            pantallas[1].value = n2;
        }
    });
});

operadores.forEach(element => {
    element.addEventListener("click", () => {
        if (position == "first") {
            position = "second";
            pantallas[1].value = n2;
            firstNumber = true;
            fullOperation = n1 + " " + element.value;
            pantallas[0].value = fullOperation;
            actualFunction = element.value;
        } else {
            if (n2 != "0") {
                if (n2 == "0" && actualFunction == "/") {
                    pantallas[1].value = "No se puede dividir entre 0";
                    setTimeout(() => pantallas[1].value = n2, 1500);
                } else {
                    fullOperation += " " + n2 + " = " + operar(n1, n2, actualFunction) + " " + element.value + " ";
                    pantallas[0].value = fullOperation;
                    pantallas[1].value = "0";
                    n1 = operar(n1, n2, actualFunction);
                    n2 = "";
                    position = "second";
                    actualFunction = element.value;
                };
            }
        }
    });
});

otros[2].addEventListener("click", () => {
    if (position == "first") {
        n1 = (n1 / 100).toString();
        pantallas[1].value = n1;
    } else {
        n2 = (n2 / 100).toString();
        pantallas[1].value = n2;
    }
})

otros[1].addEventListener("click", () => { //Delete one
    if (position == "first") {
        if (n1.length <= 2) {
            firstNumber = true;
        };
        if (n1.length == 1) {
            vaciar();
        };
        if (n1.length >= 2) {
            n1 = n1.substring(0, n1.length - 1);
            pantallas[1].value = n1;
        } else {
            n1 = "0";
            pantallas[1].value = n1;
        }
    } else {
        if (n2.length <= 2) {
            firstNumber = true;
        };
        if (n2.length == 1) {
            vaciar();
        };
        if (n2.length >= 2) {
            n2 = n2.substring(0, n2.length - 1);
            pantallas[1].value = n2;
        } else {
            n2 = "0";
            pantallas[1].value = n2;
        }
    };
})

otros[0].addEventListener("click", () => { //Delete everything
    vaciar();
});

otros[4].addEventListener("click", () => { // Results
    if (n2 != "0") {
        if (n2 == "0" && actualFunction == "/") {
            pantallas[1].value = "No se puede dividir entre 0";
            setTimeout(() => pantallas[1].value = n2, 1500);
        } else {
            pantallas[0].value = "";
            pantallas[1].value = operar(n1, n2, actualFunction);
            fullOperation += + n2 + " = " + operar(n1, n2, actualFunction) + " ";
            n1 = (operar(n1, n2, actualFunction)).toString();
            n2 = "";
            position = "first";
        };
    }
})