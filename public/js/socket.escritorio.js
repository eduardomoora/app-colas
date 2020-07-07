//comando para establecer la conexion

var socket = io();

var searchParams = new URLSearchParams(window.location.search);



console.log();

if (!searchParams.has('escritorio')) {
   windows.location='index.html'
   throw new Error('El escritorio es necesario')
}
//si existe y por lo tanto tomo el escritorio
var escritorio = searchParams.get('escritorio');
var label =$('small');
console.log(escritorio);

$('h1').text('Escritorio '+ escritorio);
$('button').on('click',()=>{


socket.emit('atenderTicket',{escritorio:escritorio},(resp)=>{

  if(resp==='no hay mas tickets'){
      alert(resp);
      label.text(resp);
      return
  }

  label.text('Ticket ' + resp.numero)

})

})