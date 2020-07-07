const fs = require("fs");



class Ticket{


  constructor(numero,escritorio){
   this.numero=numero;
   this.escritorio=escritorio;

  }

}



class TicketControl {
  constructor() {

    //variables
    this.ultimo = 0;
    this.hoy = new Date().getDate();
    this.tickets = []
    this.ultimos4=[];
    //llamando directamente el archivo json
    let data = require("../data/data.json");

    if (data.hoy === this.hoy) {
      //se mantiene el ultimo registro
      this.ultimo = data.ultimo;
      this.tickets=data.tickets;
      this.ultimos4=data.ultimos4;
    } else {
      this.reiniciarConteo();
    }
  }
  reiniciarConteo() {
   this.ultimo=0;
   this.tickets=[];
   this.ultimos4=[];
   console.log("se ha inicializado el sistema");
   this.grabarArchivo();

   //vaciar arreglo
   this.tickets=[];
  }

 getUltimoTicket(){
  return `Ticket ${this.ultimo}`;
 }

 getUltimos4(){
  return this.ultimos4
 }


 antenderTicket(escritorio){
   
  if(this.tickets.length===0){
    return 'No hay tickets'
  }
  let numeroTicket = this.tickets[0].numero;
//eliminar el primer elemento
this.tickets.shift();


let atenderTicket = new Ticket(numeroTicket,escritorio);


console.log(atenderTicket);
//se agrega en el principio del arreglo
this.ultimos4.unshift(atenderTicket);

if (this.ultimos4.length>4) {
  this.ultimos4.pop();
}
console.log('ultimos 4');
console.log(this.ultimos4);

this.grabarArchivo()
return atenderTicket;

 }

  siguiente() {
    this.ultimo += 1;
    let ticket = new Ticket(this.ultimo,null);
    this.tickets.push(ticket);
    this.grabarArchivo();
    return `Ticket ${this.ultimo}`;
  }

  grabarArchivo(){
 //set values
 let jsonData = {
    ultimo: this.ultimo,
    hoy: this.hoy,
    tickets:this.tickets,
    ultimos4:this.ultimos4
  };

  //convert to string
  let jsonDataString = JSON.stringify(jsonData);
  fs.writeFileSync("./server/data/data.json", jsonDataString);

 

  }
}

module.exports = {
  TicketControl
};
