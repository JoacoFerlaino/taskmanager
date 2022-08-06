//primero creamos las constantes
//seleccionamos cada uno de los divs del html para ir asignandoles el contenido que 
//tomen estas constantes 
const dateNumber = document.getElementById('dateNumber');
const dateText = document.getElementById('dateText');
const dateMonth = document.getElementById('dateMonth');
const dateYear = document.getElementById('dateYear');

//Task Container (donde meteremos las tareas)
const tasksContainer = document.getElementById('tasksContainer');

//creamos primer funcion para crear determinar la fecha
//obtenemos la fecha actual y la guardamos en la const
//ahora a cada una de las constantes de arriba les pasaremos el dato.
//con textContent indcamos que vamos a modificar. 
//Con date accedemos a la fecha 
//con toLocalString, convertimos la fecha numerica en un texto ("english") en los corchetes dia mes, etc (short abrevia y long largo)
const setDate = () => {
    const date = new Date();
    dateNumber.textContent = date.toLocaleString('en', { day: 'numeric' });
    dateText.textContent = date.toLocaleString('en', { weekday: 'long' });
    dateMonth.textContent = date.toLocaleString('en', { month: 'short' });
    dateYear.textContent = date.toLocaleString('en', { year: 'numeric' });
};

//ahora ira el evento de agregar una nueva tarea
//Esto se ejecutara cuando el usuario ingrese una nueva tarea (esta en el html)
//declaramos la funcion y con el event.preventDefault evitamos que con el submit te lleve a otra pagina.
//luego en value vamos a guardar el valor de lo que puso el usuario en elo  input (taskText en html)
//Con el if chequeamos si se agrego algo o no, si no se agrego no hace nada (ya que el return corta la ejecucion de la funcion) sino si.
//Luego creamos un documento div en el html y lo guardamos en la const task
//Luego a task le damos dos clases (para que afecte el css luego)
//Luego con el addEventListener se le agrega una orden de cuando haga click llama a la funcion changeTaskState
//luego agregamos el valor indicado por el usuario al contenedor
//agregamos la task a taskscontainer. Con el prepend agregamos la tarea al ppio de la lista 
//por ultimo se resetea todo para que pueda agregar mas 
const addNewTask = event => {
    event.preventDefault();
    const { value } = event.target.taskText;
    if(!value) return;
    const task = document.createElement('div');
    task.classList.add('task', 'roundBorder');
    task.addEventListener('click', changeTaskState)
    task.textContent = value;
    tasksContainer.prepend(task);
    event.target.reset();
};

//proxima funcion, cuando hacemos click en un evento se ejecuta
//lo que hara es al hacerle click entrara a la lista de clase del elemento
//y le agrega la clase DONE
const changeTaskState = event => {
    event.target.classList.toggle('done');
};

//Esta funcion ordenara las tareas 
//Creamos dos arrays donde pondremos las tareas hechas 
//Segundo las tareas por hacer 
//Luego vamos al elemento taskContainer y accedemos a cada uno de los hijos
//lo iteramos con el forEach
//luego se pone un if, en el cual se consulta si los elementos estan DONE los agrega a done
//si no tienen done y estan en todo las suma al array de toDo (luego daremos estilo en css en base a esas clases) 
//Con el return lo que hacemos es ordenar primero las tareas toDo y luego las done
const order = () => {
    const done = [];
    const toDo = [];
    tasksContainer.childNodes.forEach( el => {
        el.classList.contains('done') ? done.push(el) : toDo.push(el)
    })
    return [...toDo, ...done];
}


//esta funcion ordena las tareas y es llamada desde el html
// Lo primero que hacemos es llamar a order que es la funcion de arriba
//iteramos el array y se lo agrega al task container.
const renderOrderedTasks = () => {
    order().forEach(el => tasksContainer.appendChild(el))
}

//llamamos a la funcion
setDate()