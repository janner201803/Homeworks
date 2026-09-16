/*
Una función es un bloque de código que sirve para realizar una tarea y puede recibir datos.

Función Regular: Es la forma tradicional de crear una función en JavaScript. Para definirla se utiliza
la palabra function, seguida del nombre de la función y los parámetros que va a recibir.
*/
function numeroParImpar(numero) {
    if (numero % 2 === 0) {
        console.log("El número " + numero + " es par");
    } else {
        console.log("El número " + numero + " es impar");
    }
}
numeroParImpar(8);
numeroParImpar(7);

/*
Función Flecha:Es otra forma de crear una función en JavaScript. Se caracteriza por utilizar el
símbolo => y normalmente se guarda en una variable usando const. Su sintaxis es más corta que la
de una función regular, por lo que permite escribir el código de una manera más sencilla.
También tiene algunas diferencias en la forma en que maneja this.
*/
const numeroParImparFlecha = (numero) => {
    if (numero % 2 === 0) {
        console.log("El número " + numero + " es par");
    } else {
        console.log("El número " + numero + " es impar");
    }
}

numeroParImparFlecha(10);
numeroParImparFlecha(5);

/*
Conclusion
Las dos sirven para crear funciones y pueden hacer la misma tarea. La principal diferencia está en la
forma de escribirlas: la regular usa "function" y la flecha usa "=>".También se diferencian en algunas
cosas internas,como el uso de "this", por lo que no siempre se comportan exactamente igual.
*/
