// Franco Alejandro Paiz González

//Asíncrona
//Esperar a que se ejecute por completo una instrucción, sin obstruir
//el hilo de procesos.

//Formas de manejar la asincronía:

/**
 *1. Callbacks -> Están en desuso.
 *2. Promesas
 *3. Async / Await -> La mejor opción.
 *   */

//CALLBACKS
/*  function getUsersWithCallback(callback){
    // Realiza una solicitud a un Endpoint utilizando la función fetch
    fetch('https://randomuser.me/api/')
        // Parsea o interpreta la respuesta en un formato JSON
        .then(response => response.json())
        // Procesa los datos obtenidos de la API
        .then(data => {
            // Descompone el objeto para extraer los resultados específicos
            const { results } = data;
            // Invoca al callback con nulo en caso de error y los resultados
            callback(null, results);
        })
        // Maneja cualquier inconveniente que pueda ocurrir durante la solicitud o procesamiento de datos
        .catch(error => {
            console.error(error);
            // Invoca al callback con el error y nulo como resultados
            callback(error, null);
        })
 }

 // Invoca la función getUsersWithCallback con un callback que maneja los resultados o errores
 getUsersWithCallback((error, results)=>{
    // Verifica si hay un error e imprime en la consola si es el caso
    if(error) console.error(error)
    
    // Obtiene referencias a elementos HTML
    const name = document.getElementById('name')
    const surname = document.getElementById('surname')
    const phone = document.getElementById('phone')

    // Actualiza los elementos HTML con la información del primer usuario en los resultados
    for (const user of results) {
        name.innerText = user.name.first
        surname.innerText = user.name.last
        phone.innerText = user.phone
    }
 }) */



// PROMISES
/* const getUsersWithPromise = ()=>{
    // Crea una nueva Promise que maneja la lógica de la solicitud y el procesamiento de datos
    return new Promise((resolve, reject)=>{
        // Realiza una solicitud a un Endpoint utilizando la función fetch
        fetch('https://randomuser.me/api/')
        // Parsea o interpreta la respuesta en formato JSON
        .then(response => response.json())
        // Procesa los datos obtenidos de la API
        .then(data => {
            // Descompone el objeto para extraer los resultados específicos
            const { results } = data;
            // Resuelve la Promise con los resultados obtenidos
            resolve(results);
        })
        // Rechaza la Promise si hay algún problema durante la solicitud o procesamiento de datos
        .catch(error => reject(error))
    })
 }

 // Llama a la función getUsersWithPromise utilizando then() y catch() para manejar resultados o errores
 getUsersWithPromise()
    .then(results => {
        // Obtiene referencias a elementos HTML
        const name = document.getElementById('name')
        const surname = document.getElementById('surname')
        const phone = document.getElementById('phone')

        // Actualiza los elementos HTML con la información del primer usuario en los resultados
        for (const user of results) {
            name.innerText = user.name.first
            surname.innerText = user.name.last
            phone.innerText = user.phone
        }
    })
    // Captura y maneja cualquier problema que pueda ocurrir durante la ejecución de la Promise
    .catch(error => console.error(error))*/


    //EJERCICIO 2

//ASYNC / AWAIT

const getUserWithAsync = async () => {
    try {
        // Realiza una solicitud a la API para obtener información de 10 usuarios aleatorios
        const response = await fetch('https://randomuser.me/api/?results=10') // Se guarda la respuesta.
        
        // Desestructura y parsea la respuesta JSON obtenida de la API
        const { results } = await response.json() // Desestructura para obtener results.

        // Obtiene el elemento HTML con el id 'users'
        const users = document.getElementById('users')

        // Itera sobre cada usuario en los resultados y actualiza el contenido del elemento 'users'
        for (const user of results) {
            users.innerHTML += `
                <tr>
                    <td>${user.name.first}</td>
                    <td>${user.name.last}</td>
                    <td>${user.phone}</td>
                </tr>
            `
        }
    } catch (error) {
        console.error(error)
    }
}

// Llama a la función getUserWithAsync para ejecutarla
getUserWithAsync()