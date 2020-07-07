//comando para establecer la comunicacion con el servidor

var socket = io();
var label = $('#lblNuevoTicket');

socket.on("connect", function () {
  console.log("conectado al servidor");

  socket.on('estadoActual',(data)=>{
    label.text(data.actual);
  })
});

socket.on("disconnect", function () {
  console.log("se perdio conexion al servidor");
});




//jquery se usa inicializandolo con $
$('button').on('click',function(){
    socket.emit('siguienteTicket',null,function(siguienteTicket){
        label.text(siguienteTicket);
    });
});

