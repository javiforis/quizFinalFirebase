let preguntaActual = 0;         // declaramos la variable con valor 0 para indicar de donde partimos
let aciertos = 0;               // declaramos un contador para los aciertos



function initDataBase() {
    let firebaseConfig = {
        apiKey: "AIzaSyCOrMZXNGxKcI9D06PyiaTkuYWTj2Drjww",
        authDomain: "apiquizlotr.firebaseapp.com",
        databaseURL: "https://apiquizlotr.firebaseio.com",
        projectId: "apiquizlotr",
        storageBucket: "apiquizlotr.appspot.com",
        messagingSenderId: "139656565467",
        appId: "1:139656565467:web:d2e0bb82cbe4ce698032fe",
        measurementId: "G-YHML7PXFYP"
    }
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
}

function getElements() {

    firebase
        .database()
        .ref('questions/')
        .on('value', function(snapshot) {
              snapshot.val() .map(function(question){
                pintar(question.question)})

        });
        
  };
/////////////////////////////////////////////////////////////////////////////////////
// Tenemos primero un array de objetos JSON en el que en cada uno está la pregunta,//
// un array de respuestas, una imagen y la pregunta correcta.                      //
/////////////////////////////////////////////////////////////////////////////////////

// let questions = [
//     {
//         question: "¿Qué escenario de La Comunidad del Anillo se contruyó en una antigua base naval?",
//         answers: ["Bree", "Isengard", "La cima de los vientos"],
//         image: "/media/imagenes/Bree.png",
//         expected: 0
//     },
//     {
//         question: "¿Quién le dice a Frodo: Hasta el más pequeño puede cambiar el curso del futuro?",
//         answers: ["Elrond", "Galadriel", "Gandalf"],
//         image: "/media/imagenes/Galadriel.png",
//         expected: 1
//     },
//     {
//         question: "¿Cuántos guerreros ha matado Legolas en el Abismo de Helm mientras Gimli lleva dos?",
//         answers: ["27", "17", "21"],
//         image: "/media/imagenes/legolas.jpg",
//         expected: 1
//     },
//     {
//         question: "¿Qué hobbit es el primero en pedir una pinta entera de cerveza en la Posada del Pony Pisador?",
//         answers: ["Merry", "Sam", "Pippin"],
//         image: "/media/imagenes/Merry.png",
//         expected: 0
//     },
//     {   question: "¿La hija de qué actor en la vida real hace de Elanor, su hija en la pantalla, en El Retorno del Rey?",
//         answers: ["Hugo Weaving", "Sean Astin", "Bernard Hill"],
//         image: "/media/imagenes/Sean.png",
//         expected: 1
//     },
//     {
//         question: "¿Qué fobia tiene Peter Jackson?",
//         answers: ["Arañas", "Oscuridad", "Sitios cerrados"],
//         image: "/media/imagenes/Peter.jpg",
//         expected: 0
//     },
//     {
//         question: "¿Qué miembro de la Compañía recoge el anillo en la nieve, cerca del Paso de Caradhras?",
//         answers: ["Gandalf", "Boromir", "Sam"],
//         image: "/media/imagenes/Boromir.png",
//         expected: 1
//     },
//     {
//         question: "¿Quién dice: Esta no es nuestra guerra?",
//         answers: ["Barbol", "Theoden", "Elrond"],
//         image: "/media/imagenes/Barbol.png",
//         expected: 0
//     },
//     {
//         question: "¿Quién compuso, orquestó y dirigió la música de la trilogía?",
//         answers: ["Hans Zimmer", "John Williams", "Howard Shore"],
//         image: "/media/imagenes/Howard.png",
//         expected: 2
//     },
//     {
//         question: "¿En qué año se estrenó la película El Retorno del Rey?",
//         answers: ["2001", "2002", "2003"],
//         image: "/media/imagenes/2003.png",
//         expected: 2
//     },
//     {
//         question: "¿Cuántas nominaciones a los Oscar tuvo Las Dos Torres?",
//         answers: ["4", "9", "6"],
//         image: "/media/imagenes/Nominaciones.png",
//         expected: 2
//     },
//     {
//         question: "¿Cuántos meses se tardó en rodar las tres películas?",
//         answers: ["15", "12", "18"],
//         image: "/media/imagenes/Rodaje.jpg",
//         expected: 0
//     },
//     {
//         question: "¿Qué parentesco tiene Gimli con Balin?",
//         answers: ["Hijo", "Hermanos", "Primos"],
//         image: "/media/imagenes/gimli.jpg",
//         expected: 2
//     },
//     {
//         question: "De las 11 nominaciones que tuvo El Retorno del Rey, ¿Cuántos Oscars consiguieron?",
//         answers: ["9", "11", "7"],
//         image: "/media/imagenes/nominaciones2.png",
//         expected: 1
//     }
// ];

/////////////////////////////////////////////////////////////
// Primero necesitamos una funcion que pinte en el html... //
/////////////////////////////////////////////////////////////

function pintar(preguntaPintar) {
    borrarPregunta();
    let cuestionario = document.querySelector("#onBoard");       // cogemos del html el div
    let form = document.createElement("form");                   // creamos un formulario y lo asignamos a una variable
    form.id = "formulario";                                      // le asignamos una id
    let pregunta = document.createElement("h2");                 // creamos la pregunta
    pregunta.id = "pregunta";                                    // asignamos un id al h2
    form.appendChild(pregunta);                                  // le decimos que pregunta es hijo de form
    cuestionario.appendChild(form);                              // y que form es hijo de cuestionario
    pregunta.innerText = preguntaPintar.question;                // aqui le decimos que pinte dentro del h2 el parametro question de nuestro array de jsons
    let imagen = document.createElement("img");                  // creamos una imagen y
    imagen.id = "imagen";                                        // le asignamos un id
    form.appendChild(imagen);                                    // decimos que esa imagen es hija del form
    imagen.src = preguntaPintar.image;                           // pintamos la imagen en el html
    
    for(let i = 0; i < preguntaPintar.answers.length; i++) {     // para pintar las respuestas se necesita un bucle para recorrer el array del mismo y decir que para cada iteracion haga ciertas cosas
        let labelRespuesta = document.createElement("label");    // que te cree un label
        labelRespuesta.addEventListener("click", seleccion);     // que ese label "escuche" al click para cambiar de pregunta
        let inputRespuesta = document.createElement("input");    // que te cree un input
        inputRespuesta.type = "radio";                           // que el input sea de tipo radio
        labelRespuesta.innerText = preguntaPintar.answers[i];    // (aqui pinta en el html las respuestas)
        inputRespuesta.value = i;                                // y le decimos que el value de la respuesta sea igual al indice de la respuesta
        inputRespuesta.name = "respuesta";                       // tambien le damos al input un name
        inputRespuesta.id = `respuesta_${i}`;                    // y un id, que coincidirá con el indice de la respuesta que toque
        labelRespuesta.htmlFor = inputRespuesta.id;              // y con esto le decimos que el atributo id sea igual al atributo for
        form.appendChild(labelRespuesta);                        // y asignamos padres e hijos
        form.appendChild(inputRespuesta);
    }


}
pintar(questions[preguntaActual]);                                            // llamar a la funcion para ejecutar

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
    pasarSiguiente(questions);
    if (respuestaSeleccionada == questions[preguntaActual.expected]) {
        aciertos++;
    }
}

//////////////////////////////////////////////////////////////////////////////////////
// Creamos la funcion que pintará la siguiente pregunta al hacer click en la actual //
//////////////////////////////////////////////////////////////////////////////////////

function pasarSiguiente(preguntas) {
    if (preguntaActual < preguntas.length -1) {
        preguntaActual++;
        setTimeout(function() {pintar(preguntas[preguntaActual])}, 600);
    }
    else {
        borrarPregunta();
        pintarResultados();
    }
}

function pintarResultados() {
    let paginaResultados = document.querySelector("#finalResults");
    let divResultado = document.createElement("div");
    let textoAcierto = document.createElement("p");
    textoAcierto.id = "aciertos";
    divResultado.id = "resultado";
    paginaResultados.appendChild(divResultado);
    divResultado.appendChild(textoAcierto)

    if (!form) {
        textoAcierto.innerText = `Has acertado${aciertos} preguntas`;
    }
}

///////////////////////////////////////////////////////////
// A PARTIR DE AQUI ES CUANDO SE EMPIEZA A USAR FIREBASE //
///////////////////////////////////////////////////////////


