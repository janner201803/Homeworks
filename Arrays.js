// Este documento explica cada metodo de los arrays en Javascript con sus ejemplos

//Metodo at()
/* 
El método at() devuelve el elemento en la posición especificada del array.
Este método acepta un índice como argumento y devuelve el elemento correspondiente.
Si el índice es negativo, se cuenta desde el final del array.
*/

let numeros = [1000, 2000, 3000, 4000, 5000];

console.log(numeros.at(0)); // Devuelve el primer elemento del array: 1000
console.log(numeros.at(-1)); // Devuelve el último elemento del array: 5000

//Metodo concat()
/*
El método concat() se utiliza para unir dos o más arrays.
Este método no cambia los arrays existentes, sino que devuelve un nuevo array.
*/

let array1 = [1, 2, 3];
let array2 = [4, 5, 6];

let array3 = array1.concat(array2);
console.log(array3); // Devuelve un nuevo array: [1, 2, 3, 4, 5, 6]

//Método constructor

/*
El constructor Array() se utiliza para crear un nuevo array.
Se puede utilizar con o sin argumentos.
Además, permite crear una instancia de un objeto de tipo Array.
 */

let array4 = new Array(5); 
// Crea un array con 5 posiciones vacías.
// El objeto creado es de tipo Array.

console.log(array4); 
// Devuelve: [ <5 empty items> ]

console.log(array4.constructor);
// Devuelve: [Function: Array]

console.log(array4 instanceof Array);
// Devuelve: true

//Metodo copyWithin()
/*
El método copyWithin() copia una parte del array a otra posición dentro del mismo array.
Este método modifica el array original y no devuelve un nuevo array.
*/

let array5 = [1, 2, 3, 4, 5];

array5.copyWithin(0, 3);
console.log(array5); // Devuelve: [4, 5, 3, 4, 5]

//Metodo entries()
/*
El método entries() devuelve un nuevo objeto Array Iterator que contiene
los pares clave/valor para cada índice del array.
*/

let frutas = ["Manzana", "Pera", "Uva"];

for (let elemento of frutas.entries()) {
    console.log(elemento);
}

/*
Devuelve:
[0, "Manzana"]
[1, "Pera"]
[2, "Uva"]
*/

//Metodo every()
/*
El método every() comprueba si todos los elementos del array cumplen con una condición especificada.
Devuelve true si todos los elementos cumplen con la condición, de lo contrario devuelve false.
*/
let numeros = [2, 4, 6, 8];

let todosPares = numeros.every((num) => num % 2 === 0);
console.log(todosPares); // Devuelve: true

let algunosPares = numeros.every((num) => num % 2 === 1);
console.log(algunosPares); // Devuelve: false


//Metodo fill()
/*
El método fill() cambia todos los elementos de un array por un valor estático,
desde el índice de inicio hasta el índice de fin.
Este método devuelve el array modificado.
*/
let numeros = [1, 2, 3, 4];

numeros.fill(0);
console.log(numeros);// [0, 0, 0, 0]

//Metodo filter()
/*
El método filter() crea un nuevo array con todos los elementos que cumplan la condición
implementada por la función dada.
*/
let numeros = [1, 2, 3, 4, 5];

let numerosPares = numeros.filter((num) => num % 2 === 0);
console.log(numerosPares); // Devuelve: [2, 4]

//Metodo find()
/*
El método find() devuelve el valor del primer elemento del array que cumple con la función de prueba proporcionada.
Si ningún elemento cumple con la función de prueba, devuelve undefined.
*/
let numeros = [1, 2, 3, 4, 5];

let primerPar = numeros.find((num) => num % 2 === 0);
console.log(primerPar); // Devuelve: 2

//Metodo findIndex()
/*
El método findIndex() devuelve el índice del primer elemento del array que cumple con la función de prueba proporcionada.
Si ningún elemento cumple con la función de prueba, devuelve -1.
*/
let numeros = [1, 2, 3, 4, 5];

let indicePrimerPar = numeros.findIndex((num) => num % 2 === 0);
console.log(indicePrimerPar); // Devuelve: 1

//Metodo findLast()
/*
El método findLast() devuelve el valor del último elemento del array que cumple con la función de prueba proporcionada.
Si ningún elemento cumple con la función de prueba, devuelve undefined.
*/
let numeros = [1, 2, 3, 4, 5];

let ultimoPar = numeros.findLast((num) => num % 2 === 0);
console.log(ultimoPar); // Devuelve: 4

//Metodo findLastIndex()
/*
El método findLastIndex() devuelve el índice del último elemento del array que cumple con la función de prueba proporcionada.
Si ningún elemento cumple con la función de prueba, devuelve -1.
*/
let numeros = [1, 2, 3, 4, 5];

let indiceUltimoPar = numeros.findLastIndex((num) => num % 2 === 0);
console.log(indiceUltimoPar); // Devuelve: 3

//Metodo flat()
/*
El método flat() crea un nuevo array con todos los elementos de sub-array concatenados
en él de manera recursiva hasta la profundidad especificada.
*/
let numeros = [1, 2, [3, 4, [5, 6]]];
let numerosAplanados = numeros.flat(2);
console.log(numerosAplanados); // Devuelve: [1, 2, 3, 4, 5, 6]

/*
El numero 2 dentro del flat(2) indica la profundidad de aplanamiento, es decir,
cuántos niveles de sub-arrays se deben aplanar. En este caso, se aplanan hasta 2 niveles de profundidad.
Ej: en nuestro array tenemos 2 arreglos dentro del arreglo principal, el primer arreglo tiene 2 elementos y el segundo arreglo
tiene 2 elementos, por lo que al aplanar hasta 2 niveles de profundidad, obtenemos un array con todos los elementos en un solo nivel.
*/

//Metodo flatMap()
/*
El método flatMap() primero mapea cada elemento usando una función de mapeo,
y luego aplana el resultado en un nuevo array.
*/
let numeros = [1, 2, 3, 4];
let numerosDobladosAplanados = numeros.flatMap((num) => [num * 2]);
console.log(numerosDobladosAplanados); // Devuelve: [2, 4, 6, 8]

/*
con este metodo lo que logramos es aplanar los resultados del map a un solo arreglo porque tenemos [num*2]
esto deja los resultados en arreglos pequeños con el flatMap los aplanamos, para que queden en un solo arreglo.
*/

//Metodo forEach()
/*
El método forEach() ejecuta una función proporcionada una vez por cada elemento del array.
Este método no devuelve un nuevo array, sino que simplemente ejecuta la función para cada elemento.
*/
let frutas = ['manzana', 'banana', 'cereza'];

frutas.forEach((fruta) => {
    console.log(fruta);
});
/*
devuelve:
manzana
banana
cereza
*/

//Metodo includes()
/*
El método includes() determina si un array incluye un determinado elemento,
devuelve true o false según corresponda.
*/
let frutas = ['manzana', 'banana', 'cereza'];
console.log(frutas.includes('banana')); // Devuelve: true
console.log(frutas.includes('pera')); // Devuelve: false

//Metodo indexOf()
/*
El método indexOf() devuelve el primer índice en el que se encuentra un elemento dado en el array,
o -1 si no se encuentra.
*/
let frutas = ['manzana', 'banana', 'cereza'];
console.log(frutas.indexOf('banana')); // Devuelve: 1
console.log(frutas.indexOf('pera')); // Devuelve: -1

//Metodo join()
/*
El método join() une todos los elementos de un array en una cadena y devuelve esta cadena.
Se puede especificar un separador entre los elementos.
*/
let frutas = ['manzana', 'banana', 'cereza'];
console.log(frutas.join(', ')); // Devuelve: "manzana, banana, cereza"
console.log(frutas.join(' - ')); // Devuelve: "manzana - banana - cereza"

//Metodo keys()
/*
El método keys() devuelve un nuevo objeto Array Iterator que contiene las claves de índice de cada elemento del array.
*/
let frutas = ['manzana', 'banana', 'cereza'];
let keys = frutas.keys();
for (let key of keys) {
    console.log(key);
}
/*
Devuelve:
0
1
2
*/

//Metodo lastIndexOf()
/*
El método lastIndexOf() devuelve el último índice en el que se encuentra un elemento dado en el array,
o -1 si no se encuentra.
*/
let numeros = [10, 20, 10, 30, 10];
console.log(numeros.lastIndexOf(10));// 4

/*
Aqui podemos ver que en el arreglo tenemos dos numeros con el valor de 10 pero el metodo
lastIndexOf nos devuelve el ultimo indice en el que se encuentra el numero 10, que es el indice 4.
*/

//Metodo length
/*
La propiedad length de un array devuelve el número de elementos en el array.
*/
let numeros = [1, 2, 3, 4, 5];
console.log(numeros.length); // Devuelve: 5

/*
Este metodo cuenta la cantidad de elementos que hay en el arreglo y nos devuelve esa cantidad, en este caso 5.
*/

//Metodo map()
/*
El método map() crea un nuevo array con los resultados de la llamada a una función proporcionada
aplicada a cada elemento del array.
*/
let numeros = [1, 2, 3, 4];
let numerosDoblados = numeros.map((num) => num * 2);
console.log(numerosDoblados); // Devuelve: [2, 4, 6, 8]

//Metodo pop()
/*
El método pop() elimina el último elemento de un array y lo devuelve.
Este método cambia la longitud del array.
*/
let numeros = [1, 2, 3, 4];
let ultimoElemento = numeros.pop();
console.log(ultimoElemento); // Devuelve: 4
console.log(numeros); // Devuelve: [1, 2, 3]

//Metodo push()
/*
El método push() agrega uno o más elementos al final de un array y devuelve la nueva longitud del array.
*/
let numeros = [1, 2, 3];
let nuevaLongitud = numeros.push(4, 5);
console.log(nuevaLongitud); // Devuelve: 5
console.log(numeros); // Devuelve: [1, 2, 3, 4, 5]

//Metodo reduce()
/*
El método reduce() aplica una función a un acumulador y a cada valor del array (de izquierda a derecha)
para reducirlo a un único valor.
*/
let numeros = [10, 20, 30];

let suma = numeros.reduce(
    (total, numero) => total + numero,
    0
);

console.log(suma);// 60

/*
Este metodo nos permite reducir el tamaño del arreglo a un solo valor en
este caso sumando los elementos del array y devolviendo la suma total de los elementos del arreglo.
*/

//Metodo reduceRight()
/*
El método reduceRight() aplica una función a un acumulador y a cada valor del array (de derecha a izquierda)
para reducirlo a un único valor.
*/
let numeros = [1, 2, 3];

let suma = numeros.reduceRight(
    (total, numero) => total + numero,
    0
);

console.log(suma);// 6

/*
Aqui se realiza lo mismo que en el metodo reduce() pero en este caso se recorre el arreglo de derecha a izquierda
*/

//Metodo reverse()
/*
El método reverse() invierte el orden de los elementos de un array.
Este método cambia el array original y devuelve el array invertido.
*/
let numeros = [1, 2, 3, 4];
numeros.reverse();
console.log(numeros); // Devuelve: [4, 3, 2, 1]

//Metodo shift()
/*
El método shift() elimina el primer elemento de un array y lo devuelve.
Este método cambia la longitud del array.
*/
let numeros = [1, 2, 3, 4];
let primerElemento = numeros.shift();
console.log(primerElemento); // Devuelve: 1
console.log(numeros); // Devuelve: [2, 3, 4]

//Metodo slice()
/*
El método slice() devuelve una copia superficial de una porción del array dentro de un nuevo array.
Este método no modifica el array original.
*/
let numeros = [1, 2, 3, 4, 5];
let subArray = numeros.slice(1, 4);
console.log(subArray); // Devuelve: [2, 3, 4]
console.log(numeros); // Devuelve: [1, 2, 3, 4, 5]

/*
Se crea una copia del arreglo original desde el indice 1 hasta el indice 4, 
pero sin incluir el elemento en el indice 4.
*/

//Metodo some()
/*
El método some() comprueba si al menos un elemento del array cumple con la condición implementada por la función proporcionada.
Devuelve true si al menos un elemento cumple con la condición, de lo contrario devuelve false.
*/
let numeros = [1, 2, 3, 4];
let algunPar = numeros.some((num) => num % 2 === 0);
console.log(algunPar); // Devuelve: true

//Metodo sort()
/*
El método sort() ordena los elementos de un array in situ y devuelve el array.
*/
let numeros = [4, 2, 5, 1, 3];
numeros.sort((a, b) => a - b);
console.log(numeros); // Devuelve: [1, 2, 3, 4, 5]

//Metodo splice()
/*
El método splice() cambia el contenido de un array eliminando elementos existentes y/o agregando nuevos elementos.
*/
let frutas = ['manzana', 'banana', 'cereza'];

frutas.splice(1, 1, "Mango");
console.log(frutas); // Devuelve: ['manzana', 'Mango', 'cereza']

//Método toLocaleString()

/*
El método toLocaleString() devuelve una cadena de texto representando los elementos del array. Además, puede adaptar el
formato de los elementos según la configuración regional especificada.
*/

let numeros = [1, 2, 3, 4];

console.log(numeros.toLocaleString());
// Devuelve: "1,2,3,4"

/*
Aquí convierte los elementos del arreglo en una cadena de texto y los separa por comas. Si se especifica una región,
el método puede utilizar el formato correspondiente a esa región.
*/

let precios = [1000, 2000, 3000];

console.log(precios.toLocaleString("es-CO"));
// Devuelve: "1.000,2.000,3.000"

//Metodo toString()
/*
El método toString() devuelve una cadena de texto representando los elementos del array.
*/
let numeros = [1, 2, 3, 4];
console.log(numeros.toString()); // Devuelve: "1,2,3,4"

//Metodo unshift()
/*
El método unshift() agrega uno o más elementos al inicio de un array y devuelve la nueva longitud del array.
*/
let numeros = [20, 30];

numeros.unshift(10);
console.log(numeros);// [10, 20, 30]

//Metodo values()
/*
El método values() devuelve un nuevo objeto Array Iterator que contiene los valores de cada índice del array.
*/
let frutas = ["Manzana", "Pera", "Uva"];

let valores = frutas.values();
console.log(valores);//devuelve: Array Iterator {}

//sirve para recorrer los valores del array de manera seceuencial

console.log(valores.next());
console.log(valores.next());
console.log(valores.next());
console.log(valores.next());

//el done significa que ya no hay mas valores en el array