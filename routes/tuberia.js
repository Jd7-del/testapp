let Tuberia  = class {
    constructor(name, capacidad, destino) {
      this.name = name;
      this.capacidad = capacidad;
      this.destino = destino;
      this.estado = 0;
    }
  
    getEstado() {
      return this.estado;
    }
  
    getDestino() {
      return this.destino;
    }
  
    getCapacidad() {
      return this.capacidad;
    }
  };

module.exports = {
    Tuberia,
}