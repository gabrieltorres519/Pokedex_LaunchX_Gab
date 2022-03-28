
// Programación asíncrona " fetch y then"

const fetchPokemon = () => {
    // const url = ` https://pokeapi.co/api/v2/pokemon/pikachu`; // Dirección copiada de la api en https://pokeapi.co/
    // fetch(url); Le pregunta al servidor, oye servidor, me puedes dar el resultado de accesar al recurso en la url que te doy?
    //Tomar en cuenta que la poke api no tiene autenticación y por eso es tan sencillo  

    // fetch devuelve una promesa, una promes tiene sentido en programacióln asíncrona
    /*La programación asíncrona es como trabajar con múltiples hilos de proceso tra
    bajanco en paralelo, es decir, el código no se ejecuta de arriba a abajo del archivo
    sino que hay varios scripts corriendo al mismo tiempo, */

    /* Ya que no se sabe cuádo va a devolver información el servidor, lo que éste hace es mandarle inmediatamente 
    una promesa al cliente, dicha promesa es como decirle al cliente "dame tiempo"*/

    // Asíncrono es también para que la página se siga renderizando y los procesos se sigan dando mientras un procesos espera resppuesta, 
    // que lo demás no se detenga 

   // console.log("Respuesta tipo promise\n");

  //  fetch(url).then( (res) => {
  //      console.log(res); // Mostrando la respuesta del servidor (aún es una promesa)
  //      return res.json(); // Retornando la respuesta en formato Json
  //  }); 
    /** fetch devuelve la respuesta del servidor que será en principio una promesa, y then() significa lo que se hará con dicha respuesta o promesa
     * que simplemente se escribe (res) porque es el nombre de la variable que devuelve fetch y se procesa en la 
     * función then() porque está preparada para manejar las respuetas y promesas específicamente de los servidores que
     * consultemos
     */


    // Lo anterior es aún una respuesta de tipo promesa, así que para obtener los datos de la respuesta
    // es decir la "data" no la "res" se agrega otro then() que procesará ahora sí la promesa y devolverá la data.


    // Nivel 3: Agregamos tres lineas siguiendo la lógica de la función "imprimir" construída más abajo en el código para conseguir el contenido 
    // del input identificado con el id pokename y se agrega a la url para acceder a la info del pokemón específico
    const pokeName = document.getElementById("pokename");
    let pokeInput1 = pokeName.value;
    let pokeInput = pokeInput1.toLowerCase(); // Que no importe si está en mayúsculas o minúsculas, ya que en el objeto los nombres de los 
                                                // pokenmon están en minúsculas
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeInput}`; // comillas invertidas para usar ${variable}


    fetch(url).then( (res) => {
       // console.log("Respuesta promesa es:\n");
       // console.log(res); // Mostrando la respuesta del servidor (aún es una promesa)

       // Nivel 5: Manejo de errores accediendo a la propiedad "status" del objeto "res" devuelto por el servidor, si es correcto será 200
       if(res.status != "200"){ //nótese que el 200 es un string, entrará aquí si escribe mal el nombre del pokemón
            console.log(res);
            pokeImage("./assets/noPoke.png"); // Si se encuentra el error en la respuesta se cambia la imagen por la guardada en esta máquina y no en el servidor
            document.getElementById("screenJS").innerHTML = "<div class='column1'>.</div> <div class='column2'> </div>";
        }else{
            return res.json(); // Retornando la respuesta en formato Json
       }
    }).then( (data) => {
        console.log("Data obtenida de resolución es:\n")
        console.log(data); // La data es recibida por nosotros (el cliente) en forma de un objeto

        /* Al revisar el objeto obtenido en la consola nos damos cuenta de que la imagen que queremos se ncuentra en el atributo 
        llamadp "sprites" que a su ves es un objeto y la imagen se encuentra dentro de ese objeto en el atributo llamado "front_default" */ 
        let pokeImagePaso1 = data.sprites;
      //  console.log(pokeImagePaso1); // Es un objeto
        let pokeImgen = data.sprites.front_default;
      //  console.log(pokeImgen); // La url ahora sí de la imagen
        // Y así como se mostró podemos irnos metiendo a los diferentes niveles que tiene un JSON que obtenemos de los datos
        // de la respuesta de un servidor remoto a traves de la API designada para acceder a los contenidos de su base de datos.


        //Nivel 2: Añadido después de haber visto cómo cambiar la imagen, al obtener el pokemon podemos poner su imagen llamando a la función construída

        pokeImage(pokeImgen);

        
        // let pokeTipo = data.types[0].type.name;

        // Obteniendo los datos del arreglo de tipo de pokemon
        var pokeTipo = [];
        
        for(var i= 0; i < data.types.length; i++){
            let handler = data.types[i].type.name;
            pokeTipo.push(handler);
        }

        //Obteniendo sus stats
        var pokeStats = [];
        for(var i= 0; i < data.stats.length; i++){
            
            let handler = data.stats[i].stat.name + ": ";
            pokeStats.push(handler);
            handler = data.stats[i].base_stat;
            pokeStats.push(handler);
        }

        //Obteniendo sus habilidades (ya que tiene muchos movimientos mejor se mostrarán las habilidades)
        var pokeMovements = [];
        for(var i= 0; i < data.abilities.length; i++){
            
            let handler = data.abilities[i].ability.name;
            pokeMovements.push(handler);
        }




        // Para mostrar los resultados en pantalla para:

        //Nombre
        document.getElementById("screenJS").innerHTML = "<div class='column1'>.</div> <div class='column2'> <h1> Nombre: " + pokeInput + " </h1><br> <p>Tipo: " + pokeTipo + "</p><br/> <p>Estadísticas: " + pokeStats + " </p><br> <p>Movimientos: " + pokeMovements + " </p> </div>";
    }) 

}

//fetchPokemon(); Nivel 4: se comenta porque se llamará  con el evento onClick






// Función para cambiar la imágen de la etiqueta input identificada con id pokeImg por la guardada en la url que se desee  

const pokeImage = (url) => {
    const pokeImg = document.getElementById("pokeImg");
    pokeImg.src = url; // se accede al atributo src de la etiqueta img identificada con el id "pokeimg"
}

// pokeImage("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png");









// Función para obtener y manipular el input del usuario en el campo inpud identificafdo como id pokename

// const imprimir = () => {
//     const pokeName = document.getElementById("pokename");
//     let pokeInput = pokeName.value;

//     console.log("Hola " + pokeInput);
// }

