//Punto 1
//Botones
var one = document.getElementById("uno");
var two = document.getElementById("dos");
var three = document.getElementById("tres");
var four = document.getElementById("cuatro");
var five = document.getElementById("cinco");
var six = document.getElementById("seis");
var seven = document.getElementById("siete");
var eight = document.getElementById("ocho");
var nine = document.getElementById("nueve");
var zero = document.getElementById("cero");
var ce = document.getElementById("C");
var ac = document.getElementById("AC");
var prc = document.getElementById("porc");
var daiv = document.getElementById("divi");
var eq = document.getElementById("ig");
var plus = document.getElementById("mas");
var min = document.getElementById("men");
var times = document.getElementById("mul");
var point = document.getElementById("punto");

//Elementos de operaciones
var n1 = 0; //operador uno
var n2 = 0; //operador dos
var division = false;
var suma = false;
var resta = false;
var multiplicacion = false;
var pnt = false; //para poner el punto decimal solo una vez

//Otros elementos
var pantalla = document.getElementById("screen"); //el input que muestra todo el proceso que estamos realizando
var ans1 = document.getElementById("resp1"); //h4 que muestra el resultado
pantalla.innerText = "0";
var prim; //posicion anterior, para guardar todo en un array
var seg; //posicion siguiente
var cantidad = []; //array que tiene todo lo que se ve en pantalla
var i = 0; //acomulador para usar el array

//local storage
var beefore = document.getElementById("anteriores");
var guardar = [];
var k = 0;

//Funciones

function numero(a) { //mostrar los numeros en pantalla y guardarlos en variables
    if (pantalla.value == "0") {
        pantalla.value = a.value;
        cantidad[0] = [a.value];
        i = 1;
    } else {
        if (i == 1) {
            prim = pantalla.value;
            seg = a.value;
            pantalla.value = prim + seg
            cantidad[1] = pantalla.value;
            i++;
        } else if (i >= 2) {
            prim = pantalla.value;
            seg = a.value;
            pantalla.value = prim + seg
            cantidad[i] = pantalla.value;
            i++
        }

    }

}


function operacion() {
    if (n1 == 0) {
        n1 = parseInt(pantalla.value);
        pantalla.value = "0";
        division = false;
        multiplicacion = false;
        suma = false;
        resta = false;
        pnt = false;
    } else {
        alert("Solo se puede usar una vez la operación")
    }
}



//Operaciones
prc.addEventListener("click", function () {
    pantalla.value = pantalla.value / 100
})

daiv.addEventListener("click", function () {
    operacion();
    division = true;
})

plus.addEventListener("click", function () {
    operacion();
    suma = true;
})

min.addEventListener("click", function () {
    operacion();
    resta = true;

})

times.addEventListener("click", function () {
    operacion();
    multiplicacion = true;

})



eq.addEventListener("click", function () {
    n2 = parseInt(pantalla.value);
    if (division == true) {
        if(n2==0){alert("No se puede dividir entre 0");}
        else{
            ans1.innerText = n1 / n2;
            division=false;
            guardar[k] = (n1+"/"+n2+"="+(n1/n2));
            k++;
        }
    }else if(suma == true){
        ans1.innerText = n1 + n2;
        suma=false;
        guardar[k] = (n1+" + "+n2+" = "+(n1+n2));
        k++;
    }else if(resta == true){
        ans1.innerText = n1 - n2;
        resta=false;
        guardar[k] = (n1+" - "+n2+" = "+(n1-n2));
        k++;
    }else if(multiplicacion == true){
        ans1.innerText = n1 * n2;
        multiplicacion=false;
        guardar[k] = (n1+" x "+n2+" = "+(n1*n2));
        k++;
       }

})


ce.addEventListener("click", function () {
    pantalla.value = "0"
    ans1.innerText = "";
    i = 0;
    n1 = 0;
    n2 = 0;
    pnt = false;
})

ac.addEventListener("click", function () {
    pantalla.value = cantidad[i - 1];
    i--
    if (i < 0) {
        pantalla.value = "0";
        ans1.innerText = "";
        n1 = 0;
        n2 = 0;
        pnt = false;
    }
})


//Numeros
point.addEventListener("click", function(){
    if(pnt==false){
        numero(point);
        pnt=true;
    }
    
})
zero.addEventListener("click", function () {
    numero(zero);
})
one.addEventListener("click", function () {
    numero(one);
})
two.addEventListener("click", function () {
    numero(two);
})
three.addEventListener("click", function () {
    numero(three);
})
four.addEventListener("click", function () {
    numero(four);
})
five.addEventListener("click", function () {
    numero(five);
})
six.addEventListener("click", function () {
    numero(six);
})
seven.addEventListener("click", function () {
    numero(seven);
})
eight.addEventListener("click", function () {
    numero(eight);
})
nine.addEventListener("click", function () {
    numero(nine);
})

//Punto 2
var input = document.getElementById("screen2"); //input inicial
var answ = document.getElementById("resps"); //resultado
var upca = document.getElementById("upc");
var lc = document.getElementById("lowc");
var input_ct = document.getElementById("cont");

upca.addEventListener("click", function () {
    input_val = input.value;
    input_val = input_val.toUpperCase();
    answ.innerText = input_val;
})

lc.addEventListener("click", function () {
    input_val = input.value;
    input_val = input_val.toLowerCase();
    answ.innerText = input_val;
})

input_ct.addEventListener("click", function () {
    input_val = input.value;
    input_val = input_val.length;
    answ.innerHTML = input_val;
})


//local storage

cleann = document.getElementById("vaciar");

eq.addEventListener("click", function () {
    localStorage.setItem("dato", guardar);
    beefore.innerHTML = localStorage.getItem("dato");
    

});

vaciar.addEventListener("click",function(){
var option = confirm("¿Seguro que quiere eliminar los datos guardados?");
if(option==true){
k=0;
guardar = []
beefore.innerHTML = "";
}

})

