let Tanque  = class {

    constructor(nombre, capacidad) {
      this.name = nombre;
      this.capacidad = capacidad;
      this.litrosOcupados = 0;
      this.tuberias = [];
      this.capacidadCompletada = false;
    }
  
    // Obtiene tag del tanque
    getName() {
      return this.name;
    }
  
    // agrega una tuberia al tanque
    agregarTuberia(tuberia){
      this.tuberias.push(tuberia);
    }
  
    // valida que el tanque esté lleno
    estaLleno() {
      return this.capacidadCompletada;
    }
  
    // cuanto le falta al tanque para llenarse
    cantidadRestante() {
      return (this.capacidad - this.litrosOcupados);
    }
  
    // llena los litros que se le envia
    bombear(litros) {
      
      // Refactorizar validar litros inconsistentes
      const auxAgregar = (this.litrosOcupados + Number(litros));
      const residuo = (auxAgregar - this.capacidad);
  
      if(residuo > 0) {
        this.litrosOcupados = this.capacidad;
      } else {
        this.litrosOcupados = this.litrosOcupados + Number(litros);
      }
  
      if (this.litrosOcupados >= this.capacidad) {
        this.capacidadCompletada = true;
      }
  
      // retorna residuo o 0 si no hay residuo
      return residuo > 0 ? residuo : 0;
    }
  
    // retorna estado en listros del tanque
    getEstado() {
      return this.litrosOcupados;
    }
  
    // retorna tuberias
    getTuberias(){
      return this.tuberias;
    }
  
    // bandera que retorna si el tanque tiene todas las tuberias llenas
    tuberiasLlenas () {
      const banderaEstado = false;
      let cantidadLlenas = 0;
  
      this.tuberias.forEach(tuberia => {
        if(tuberia.getDestino().estaLleno()) {
          cantidadLlenas = cantidadLlenas + 1;
        }  
      });
  
      return (cantidadLlenas == this.tuberias.length);
    }
  
  };


module.exports = {
    Tanque,
}