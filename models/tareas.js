const Tarea = require("./tarea")

require('colors')


class Tareas {
  _listado = {}

  get listadoArr() {
    const listado = [];

    Object.keys(this._listado).forEach( key => {
      const tarea = this._listado[key];
      listado.push(tarea)
    })

    return listado
  }

  constructor() {
    this._listado = {}
  }

  borrarTarea( id = '') {
    if(this._listado[id]){
      delete this._listado[id]
    } else {

    }
  }

  cargarTareasFromArray( tareas = []) {
    tareas.forEach( element => {
      const tarea = new Tarea(element.desc)
      tarea.id = element.id
      tarea.completadoEn = element.completadoEn

      this._listado[tarea.id] = tarea
    })
  }

  crearTarea( desc = '') {
    const tarea = new Tarea(desc)
    this._listado[tarea.id] = tarea
  }

  listadoCompleto() {
    console.log()
    this.listadoArr.forEach((element, index) => {
      const idx = `${index + 1}`.green
      const {desc, completadoEn} = element
      const estado = completadoEn
                        ? 'Completada'.green
                        : 'Pendiente'.red
      
      console.log(`${idx} ${desc} :: ${estado}`)
      
    })
  }

  listarPendientesCompletadas(completadas = true){
    console.log()
    this.listadoArr
          .filter(({completadoEn}) =>  completadas ? completadoEn : completadoEn === null )
          .forEach((element, index) => {
            const idx = `${index + 1}`.green
            const {desc, completadoEn} = element
            const estado = completadoEn
                              ? completadoEn.green
                              : 'Pendiente'.red

            console.log(`${idx} ${desc} :: ${estado}`)
            
          })
  }

  toggleCompletadas( ids = []){
    ids.forEach( id => {
      const tarea = this._listado[id]

      if(!tarea.completadoEn){
        tarea.completadoEn = new Date().toISOString()
      }
    })

    this.listadoArr.forEach(tarea => {
      if (!ids.includes(tarea.id)){
        this._listado[tarea.id].completadoEn = null
      }
    })
  }
}

module.exports = Tareas