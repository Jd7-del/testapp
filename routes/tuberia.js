let Tuberia  = class {
    constructor(name, capacidad, destino, tagInicio, tagDestino) {
      this.name = name;
      this.capacidad = capacidad;
      this.destino = destino;

      this.tagInicio = tagInicio;
      this.tagDestino = tagDestino;
      this.estado = 0;
    }
  
    getEstado() {
      return this.estado;
    }

    getTagInicio() {
      return this.tagInicio;
    }

    getTagDestino() {
      return this.tagDestino;
    }
  
    getDestino() {
      return this.destino;
    }

    setDestino(destino) {
      this.destino = destino;
    }
  
    getCapacidad() {
      return this.capacidad;
    }
  };

module.exports = {
    Tuberia,
}