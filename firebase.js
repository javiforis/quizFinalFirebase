let preguntaActual = 0;         // declaramos la variable con valor 0 para indicar de donde partimos
let aciertos = 0;               // declaramos un contador para los aciertos



function initDataBase() {
    const firebaseConfig = {
        apiKey: "AIzaSyCOrMZXNGxKcI9D06PyiaTkuYWTj2Drjww",
        authDomain: "apiquizlotr.firebaseapp.com",
        databaseURL: "https://apiquizlotr.firebaseio.com",
        projectId: "apiquizlotr",
        storageBucket: "apiquizlotr.appspot.com",
        messagingSenderId: "139656565467",
        appId: "1:139656565467:web:d2e0bb82cbe4ce698032fe"
        // measurementId: "G-YHML7PXFYP"
    };
    firebase.initializeApp(firebaseConfig);
}

function getElements() {
    return new Promise(resolve => {
    let dataBase = firebase.database()
        dataBase
        .ref('questions/')
        .on('value', function(snapshot) {
              resolve(snapshot.val());

        });
    })
  }


/////////////////////////////////////////////////////////////
// Primero necesitamos una funcion que pinte en el html... //
/////////////////////////////////////////////////////////////

function pintar(preguntas) {
    borrarPregunta();
    let cuestionario = document.querySelector("#onBoard");       // cogemos del html el div
    let form = document.createElement("form");                   // creamos un formulario y lo asignamos a una variable
    form.id = "formulario";                                      // le asignamos una id
    let pregunta = document.createElement("h2");                 // creamos la pregunta
    pregunta.id = "pregunta";                                    // asignamos un id al h2
    form.appendChild(pregunta);                                  // le decimos que pregunta es hijo de form
    cuestionario.appendChild(form);                              // y que form es hijo de cuestionario
    pregunta.innerText = preguntas.question;                // aqui le decimos que pinte dentro del h2 el parametro question de nuestro array de jsons
    let imagen = document.createElement("img");                  // creamos una imagen y
    imagen.id = "imagen";                                        // le asignamos un id
    form.appendChild(imagen);                                    // decimos que esa imagen es hija del form
    imagen.src = preguntas.image;                           // pintamos la imagen en el html
    
    for(let i = 0; i < preguntas.answers.length; i++) {     // para pintar las respuestas se necesita un bucle para recorrer el array del mismo y decir que para cada iteracion haga ciertas cosas
        let labelRespuesta = document.createElement("label");    // que te cree un label
        labelRespuesta.addEventListener("click", seleccion);     // que ese label "escuche" al click para cambiar de pregunta
        let inputRespuesta = document.createElement("input");    // que te cree un input
        inputRespuesta.type = "radio";                           // que el input sea de tipo radio
        labelRespuesta.innerText = preguntas.answers[i];    // (aqui pinta en el html las respuestas)
        inputRespuesta.value = i;                                // y le decimos que el value de la respuesta sea igual al indice de la respuesta
        inputRespuesta.name = "respuesta";                       // tambien le damos al input un name
        inputRespuesta.id = `respuesta_${i}`;                    // y un id, que coincidirá con el indice de la respuesta que toque
        labelRespuesta.htmlFor = inputRespuesta.id;              // y con esto le decimos que el atributo id sea igual al atributo for
        form.appendChild(labelRespuesta);                        // y asignamos padres e hijos
        form.appendChild(inputRespuesta);
    }


}                                           // llamar a la funcion para ejecutar

/////////////////////////////////////////////////////////////////////////////////////////////
// A continuacion necesitamos una funcion que borre el formulario para pintar la siguiente //
/////////////////////////////////////////////////////////////////////////////////////////////

function borrarPregunta() {
    let form = document.querySelector("#formulario");            // declaramos el formulario con una variable
    if (form) {                                                  // y le decimos que si existe, 
        form.remove();                                           // lo borre
    }
}                                                                // esta funcion la llamamos dentro de la funcion pintar, para que esta misma, sea lo primero que haga

/////////////////////////////////////////////////////////////////////////////////
// Despues necesitamos una funcion que detecte cual pregunta esta seleccionada //
/////////////////////////////////////////////////////////////////////////////////

function seleccion(event) {
    let respuesta = event.target;
    let respuestaSeleccionada = document.querySelector(`#${respuesta.htmlFor}`).value;
    console.log(respuestaSeleccionada);
    if (respuestaSeleccionada == preguntas[preguntaActual].expected) {
        aciertos++;
        // let form = document.querySelector("#formulario");
        // form.remove();
        // pintar();
    }
    pasarSiguiente(preguntas);
}

//////////////////////////////////////////////////////////////////////////////////////
// Creamos la funcion que pintará la siguiente pregunta al hacer click en la actual //
//////////////////////////////////////////////////////////////////////////////////////
let preguntas;
preguntaActual = 11;
async function pasarSiguiente() {
    if (!preguntas) {
        preguntas = await getElements()
    }
    if (preguntaActual < preguntas.length -1) {
        preguntaActual++;
        pintar(preguntas[preguntaActual]);
    }
    else {
        borrarPregunta();
        pintarResultados();
    }
}

function pintarResultados() {
    let body = document.querySelector("body");
    let paginaResultados = document.createElement("div");
    let divResultado = document.createElement("div");
    let textoAcierto = document.createElement("p");
    paginaResultados.id = "#finalResults";
    textoAcierto.id = "aciertos";
    divResultado.id = "resultado";
    body.appendChild(paginaResultados);
    paginaResultados.appendChild(divResultado);
    divResultado.appendChild(textoAcierto)

    textoAcierto.innerText = `Has acertado ${aciertos} preguntas`;


}

///////////////////////////////////////////////////////////
// A PARTIR DE AQUI ES CUANDO SE EMPIEZA A USAR FIREBASE //
///////////////////////////////////////////////////////////
initDataBase();
pasarSiguiente();

