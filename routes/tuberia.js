
/**
 * Clase que representa los enlaces entre nodos (Tanque)
 * @param {*} name referencia a tag de la tuberia
 * @param {*} capacidad referencia a la capacidad de transporte de la tuberia
 * @param {*} destino referencia al nodo destino de la tuberia
 * @param {*} tagInicio tag del nodo inicio de la tuberia
 * @param {*} tagDestino tag del nodo destino de la tuberia
 */
let Tuberia  = class {
    constructor(name, capacidad, destino, tagInicio, tagDestino) {
      this.name = name;
      this.capacidad = capacidad;
      this.destino = destino;

      this.tagInicio = tagInicio;
      this.tagDestino = tagDestino;
      this.estado = 0;
    }
  
    // estado de la tuberia
    getEstado() {
      return this.estado;
    }

    // Obtiene tag de tanque inicio de la tuberia
    getTagInicio() {
      return this.tagInicio;
    }

    // Obtiene tag del tanque destino de la tubereia
    getTagDestino() {
      return this.tagDestino;
    }
  
    // Obtiene tanque destino de la tubereia
    getDestino() {
      return this.destino;
    }

    // settea el tanque destino de la tuberia
    setDestino(destino) {
      this.destino = destino;
    }
  
    // obtiene capacidad de transporte de la tuberia
    getCapacidad() {
      return this.capacidad;
    }
  };

module.exports = {
    Tuberia,
}