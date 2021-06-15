const express = require('express');
const router = express.Router();
const { Tanque, } = require('./tanque');
const { Tuberia, } = require('./tuberia');

// caraterisca para lectura
const fs = require('fs');
const readline = require('readline');

/*
 -- luis@kommit.co
 -- https://gist.github.com

 1. recorer todo el recorrer modelo
 2. validar que todos los hermanos esten llenos
 3. si no están llenos bombear
 4. repetir
*/
let recorrerModelo = (tanque, cantidadBombeo) => {
  let auxCantidadBombeo = cantidadBombeo;
  // Recorrer tuberias, si las tiene
  if(tanque.getTuberias().length > 0) {
    tanque.getTuberias().forEach((tuberia, i) => {      
      // verificar si tiene hermanos, recorrer hermanos
      if(tuberia.getDestino().getTuberias().length > 0) {
        // metodo recursivo para reocrrer todas las tuberias
        recorrerModelo(tuberia.getDestino(), auxCantidadBombeo);
      // si no tiene hermanos
      } else {
        // si el tanque destino no está lleno
        if(!tuberia.getDestino().estaLleno()){        
          
          // lógica para ver litros para entrega dependiendo de la capacidad de la tuberia
          let litrosBombeo = 0;
          let litrosNoEnviados = 0;
          const capacidadTuberia = tuberia.getCapacidad();

          if(auxCantidadBombeo > capacidadTuberia){ 
            litrosBombeo = capacidadTuberia;
            litrosNoEnviados = (auxCantidadBombeo - capacidadTuberia);
          } else {
            litrosBombeo = auxCantidadBombeo;
          }

          // llenar tanque
          let auxResiduoBombeo = tuberia.getDestino().bombear(litrosBombeo);  

          // actualizar litros disponibles para bombeo
          auxCantidadBombeo = (litrosNoEnviados + auxResiduoBombeo);

          // si resultó residuo          
          if(auxResiduoBombeo != 0 && tanque.tuberiasLlenas()) {
            tanque.bombear(auxCantidadBombeo)
          }          

        } else if(tanque.tuberiasLlenas() && !tanque.estaLleno()) {
          auxCantidadBombeo = tanque.bombear(cantidadBombeo);
        }      
      }
    });
  } else {
    // si no está lleno, bombear
    if(!tanque.estaLleno()) {
      auxCantidadBombeo = tanque.bombear(cantidadBombeo);
    }
  }
}

/**
 * Lee archivo de texto y devuelve objeto con parametros
 */
async function leerArgumentos() {
  const fileStream = fs.createReadStream('./routes/params.txt');
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  // inicia parametros permitidos
  let flujoEntrada = '';
  let tiempo = '';
  const tanques = [];
  const tuberias = [];
  
  let cabecera = "";
  let flagCabecera = false;

  const auxResult = {
    tanques: [],
    tuberias: [],
    flujo: [],
    tiempo: []
  };

  for await (const line of rl) {
    flagCabecera = false;

    if(line != "") {
      if (line == "# tanques (capacidad en litros)") {
        cabecera = "tanques";
        flagCabecera = true;
      } else if (line == "# tuberías (litros/segundo)") {
        cabecera = "tuberias";
        flagCabecera = true;
      } else if (line == "# flujo de entrada al sistema (litros/segundo)") {
        cabecera = "flujo";
        flagCabecera = true;
      } else if (line == "# tiempo (segundos)") {
        cabecera = "tiempo";
        flagCabecera = true;
      }
  
      if(!flagCabecera){
        //console.log("cabecera", cabecera, " valor linea: ", line);
        let auxEspacios = line.replace(/ /g, "")
        auxResult[cabecera].push(auxEspacios);
      }    
    }
  }


  // leer tanques
  auxResult.tanques.forEach(linea => {
    auxTanque = linea.split('=');
    tanques.push(new Tanque(auxTanque[0], auxTanque[1]));
  });

  // listado de tanques
  //tanques.forEach(element => { console.log(element); });

  // leer tuberias
  auxResult.tuberias.forEach((linea, i) => {
    auxTuberia = linea.split('=');
    auxLlave = auxTuberia[0].split(',');
    
    auxInicio = auxLlave[0];
    auxDestino = auxLlave[1];
    auxCapacidad = auxTuberia[1];

    tuberias.push(new Tuberia('tuberia'+i, auxCapacidad, null, auxInicio, auxDestino));
  })

  // listado de tuberias
  //tuberias.forEach(element => { console.log(element); });

  // leer flujo
  auxResult.flujo.forEach(linea => {
    flujoEntrada = linea;
  })

  // leer tiempo
  auxResult.tiempo.forEach(linea => {
    tiempo = linea;
  })


  // settear tuberias inicios
  tuberias.forEach(tuberia => {
    tanques.forEach(tanque => {
      if(tanque.getName() === tuberia.getTagInicio()) {
        tanque.getTuberias().push(tuberia);
      }

      if(tanque.getName() === tuberia.getTagDestino()) {
        tuberia.setDestino(tanque);
      }

    });
  });

  console.log(tanques, flujoEntrada, tiempo);
  return tanques;
}

// test url -> supportbot/testapp/?var1=76&var2=56565
router.get('/testapp/', (req, res, next) => {
  //const { var1, var2, } = req.query;
  //const filterUser = idusuario ? idusuario.split(',') : [];
  leerArgumentos();
  /**
   * Generando tanques - v1 staticos
   * recorrer array para segunda versión
   # tanques (capacidad en litros)
   A = 10
   B = 25
   C = 30
   D = 53
   */
  const tanqueA = new Tanque('A', 10);
  const tanqueB = new Tanque('B', 25);
  const tanqueC = new Tanque('C', 30);
  const tanqueD = new Tanque('D', 53);

  /**
   * Generando tuberias - v1 staticos
   * recorrer array para segunda versión
   # tuberías (litros/segundo)
   A,B = 1
   A,C = 4
   C,D = 8
   */
   // (name, capacidad, inicio, destinto)
   const tuberiaUno = new Tuberia('tuberia uno', 1, tanqueB);
   const tuberiaDos = new Tuberia('tuberia dos', 4, tanqueC);
   const tuberiaTres = new Tuberia('tuberia tres', 8, tanqueD);

   /**
    * Settear tuberias a tanques
    * recorrer para segunda version
    */
   tanqueA.agregarTuberia(tuberiaUno);
   tanqueA.agregarTuberia(tuberiaDos);
   tanqueC.agregarTuberia(tuberiaTres);

   /**
    * Refactorizar recorrer parametro de entrada del modelo
    */
   const modelo = [];
   modelo.push(tanqueA);
   modelo.push(tanqueB);
   modelo.push(tanqueC);
   modelo.push(tanqueD);

   /**
    Iniciar modelo
    tiempo: 20 segundos
    delay: 1
    flujo: 4 litros (todo el model en litros)
    */
    const tiempo = 40; // segundos - 20 by test
    const delay = 1; // segundos
    const tDelay = (Number(delay) * 1000);
    const flujo = 4; // litros

    for (var i = 1; i <= tiempo; i++) {
      //console.log("iteracion:", i);

      // Flujo bombear
      recorrerModelo(modelo[0], flujo);
      /*
      modelo.forEach((item, i) => {
        recorrerModelo(item, flujo);
      });
      */
      /*
      modelo.forEach((item, i) => {
        console.log('Estado -> ', "Tag:", item.getName(), " Cantidad litros:", item.getEstado(), " Tanque lleno:", item.estaLleno());
      });
      */
      setTimeout(() => {  console.log(); }, tDelay);
      // mostrar estado tanques
    }

  res.send('generando modelo...');
});


module.exports = router
