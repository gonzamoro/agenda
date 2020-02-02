
var provsearch=""
//const boddy = document.body


function sortList() {
    var list, i, switching, b, shouldSwitch;
    list = document.querySelector("table");
    switching = true;
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // start by saying: no switching is done:
      switching = false;
      b = list.getElementsByTagName("TR");
      // Loop through all list-items:
      for (i = 0; i < (b.length - 1); i++) {
        // start by saying there should be no switching:
        shouldSwitch = false;
        /* check if the next item should
        switch place with the current item: */
        if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
          /* if next item is alphabetically
          lower than current item, mark as a switch
          and break the loop: */
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark the switch as done: */
        b[i].parentNode.insertBefore(b[i + 1], b[i]);
        switching = true;
      }
    }
    //window.removeEventListener('load', eliminar)
    //eliminar()
}

function buscar()
  {
    const buscar = document.getElementById('buscar');
     //divadd = document.getElementById('divadd');
    
    buscar.addEventListener('keyup', (value)=>{
      preload()
     
      const table = document.getElementById('table');
 
      var words = buscar.value
      table.innerHTML =''

    const criterio = {data:words, whatsearch:provsearch}
  

    //const busqueda = criterio
    //console.log(value)
    //alert(buscar.value)
    fetch('/buscar', {
      method: 'POST',
      body:JSON.stringify(criterio),
      headers:{
         'Content-Type':'application/json'
      }
    }
    )
    .then(data=> data.json())
    .then(data=> {
      deletePreloader()
      console.log(data)
      data.forEach(data => {
        
        
        const tr = document.createElement('tr')
        if(data.direccion){
        tr.innerHTML =`
          <td class="nom"><p>${data.nombre}<p></td>
          <td class="dir"><p>${data.direccion}<p></td>
          <td class="tel"><p>${data.telefono}<p></td>
          <td class="editelim">
            <div class="dots">
              <svg>
                <g>
                  <circle cx="5" cy="5" r="2"></circle>
                  <circle cx="5" cy="12" r="2"></circle>
                  <circle cx="5" cy="19" r="2"></circle>
                </g>
              </svg>
              <div class="options">
                <form method="GET" action="/editar/${data.nombre}">
                  <input class="edit" type="submit" value="Editar">
                </form>
                <input class="delet" type="button" id="eliminar" value="Eliminar"  data-contacto="${data.nombre}">
              </div>
            </div>
          </td>
        `
        }
        else{
          tr.innerHTML =`
          <td class="pnom"><p>${data.nombre}<p></td>
          <td class="ptel"><p>${data.telefono}<p></td>
          <td class="editelim">
            <div class="dots">
              <svg>
                <g>
                  <circle cx="5" cy="5" r="2"></circle>
                  <circle cx="5" cy="12" r="2"></circle>
                  <circle cx="5" cy="19" r="2"></circle>
                </g>
              </svg>
              <div class="options">
                <form method="GET" action="/editar/prov/${data.nombre}">
                  <input class="edit" type="submit" value="Editar">
                </form>
                <input class="delet" type="button" id="eliminar" value="Eliminar"  data-contacto="${data.nombre}">
              </div>
            </div>
          </td>
        `
        }
        
        table.appendChild(tr)
        sortList() 
        const buttonalertelim = document.getElementsByClassName('delet')
        var i
        for (i = 0; i < buttonalertelim.length; i++) {
         
          buttonalertelim[i].removeEventListener("click",alert)
        }
        var o
        for (o = 0; o < buttonalertelim.length; o++) {
         
          buttonalertelim[o].addEventListener("click",alert)
        }
        
      })
    
    
    })
    .catch((err)=> console.log(err))
    
    })
}


function proveedores(){
  const prov = document.getElementById('prov');
  
  
  prov.addEventListener("click", ()=> {
    preload()

      prov.style.borderBottom= "4px solid rgb(190, 190, 190"
      clien.style.borderBottom= "none"
      prov.style.backgroundColor = "rgb(215, 215, 215)"
      clien.style.backgroundColor = "rgb(247, 247, 247)"
      const divadd = document.getElementById('divadd');
      const contenedor = document.getElementById('cont');
      //const table = document.getElementById('table');
      divadd.innerHTML = `
      <form method="GET" action="/addprov">
        <input type="submit" value="+" class="add"></input>
      </form>
      `
     
      provsearch = true
      fetch('/proveedores')
      .then(res =>res.json())
      .then(data=>{


        if(document.getElementById('table'))
        {
          deletePreloader()
          const table = document.getElementById('table')
          table.innerHTML =''
    
          data.forEach(proveedor => {
            const tr = document.createElement('tr')
            tr.innerHTML =`
              <td class="pnom"><p>${proveedor.nombre}<p></td>
              <td class="ptel"><p>${proveedor.telefono}<p></td>
              <td class="editelim">
                <div class="dots">
                  <svg>
                    <g>
                      <circle cx="5" cy="5" r="2"></circle>
                      <circle cx="5" cy="12" r="2"></circle>
                      <circle cx="5" cy="19" r="2"></circle>
                    </g>
                  </svg>
                  <div class="options">
                    <form method="GET" action="/editar/prov/${proveedor.nombre}">
                      <input class="edit" type="submit" value="Editar">
                    </form>
                    <input class="delet" type="button" id="eliminar" value="Eliminar"  data-contacto="${proveedor.nombre}">
                  </div>
                </div>
              </td>
            `
            table.appendChild(tr)
    
    /*           divadd.innerHTML = `
              <form method="GET" action="/addprov">
                <input type="submit" value="+" class="add"></input>
              </form>
              ` */
            sortList()
            const buttonalertelim = document.getElementsByClassName('delet')
            var i
            for (i = 0; i < buttonalertelim.length; i++) {
             
              buttonalertelim[i].removeEventListener("click",alert)
            }
            var o
            for (o = 0; o < buttonalertelim.length; o++) {
             
              buttonalertelim[o].addEventListener("click",alert)
            }
            
          })

        }
        else
        {
          const table=document.createElement('table')
          table.id="table"
          table.classList.add("table")
          const tbody=document.createElement('tbody')
          table.appendChild(tbody)
          contenedor.innerHTML=''
          contenedor.appendChild(table)


          data.forEach(proveedor => {
          //contenedor.innerHTML=table        
            const tr = document.createElement('tr')
            tr.innerHTML =`
              <td class="pnom"><p>${proveedor.nombre}<p></td>
              <td class="ptel"><p>${proveedor.telefono}<p></td>
              <td class="editelim">
                <div class="dots">
                  <svg>
                    <g>
                      <circle cx="5" cy="5" r="2"></circle>
                      <circle cx="5" cy="12" r="2"></circle>
                      <circle cx="5" cy="19" r="2"></circle>
                    </g>
                  </svg>
                  <div class="options">
                    <form method="GET" action="/editar/${proveedor.nombre}">
                      <input class="edit" type="submit" value="Editar">
                    </form>
                    <input class="delet" type="button" id="eliminar" value="Eliminar"  data-contacto="${proveedor.nombre}">
                  </div>
                </div>
              </td>
            `
            tbody.appendChild(tr)
            //contenedor.innerHTML=table
    
    /*           divadd.innerHTML = `
              <form method="GET" action="/addprov">
                <input type="submit" value="+" class="add"></input>
              </form>
              ` */
            sortList()
            const buttonalertelim = document.getElementsByClassName('delet')
            var i
            for (i = 0; i < buttonalertelim.length; i++) {
             
              buttonalertelim[i].removeEventListener("click",alert)
            }
            var o
            for (o = 0; o < buttonalertelim.length; o++) {
             
              buttonalertelim[o].addEventListener("click",alert)
            } 
            
          })
        }


        
      })
      
    })
}

function clientes(){
   // window.removeEventListener("load",eliminar);
    const clien = document.getElementById('clien');
    clien.style.backgroundColor = "rgb(215, 215, 215)"
    clien.style.borderBottom= "4px solid rgb(190, 190, 190)"
    
    clien.addEventListener("click", ()=> {
      preload()

      clien.style.borderBottom= "4px solid rgb(190, 190, 190"
      prov.style.borderBottom= "none"
      prov.style.backgroundColor = "rgb(247, 247, 247)"
      clien.style.backgroundColor = "rgb(215, 215, 215)"
      const divadd = document.getElementById('divadd');
      const contenedor = document.getElementById('cont');
      divadd.innerHTML = `
      <form method="GET" action="/agregar">
        <input type="submit" value="+" class="add"></input>
      </form>
      `

      provsearch = false
      fetch('/clients')
      .then(res=> res.json())
      .then(data=>{

      table.innerHTML =''

      if(document.getElementById('table'))
      {
        deletePreloader()
        const table = document.getElementById('table')
        table.innerHTML =''

        data.forEach(cliente => {
          const tr = document.createElement('tr')
          tr.innerHTML =`
            <td class="nom"><p>${cliente.nombre}<p></td>
            <td class="dir"><p>${cliente.direccion}<p></td>
            <td class="tel"><p>${cliente.telefono}<p></td>
            <td class="editelim">
              <div class="dots">
                <svg>
                  <g>
                    <circle cx="5" cy="5" r="2"></circle>
                    <circle cx="5" cy="12" r="2"></circle>
                    <circle cx="5" cy="19" r="2"></circle>
                  </g>
                </svg>
                <div class="options">
                  <form method="GET" action="/editar/${cliente.nombre}">
                    <input class="edit" type="submit" value="Editar">
                  </form>
                  <input class="delet" type="button" id="eliminar" value="Eliminar"  data-contacto="${cliente.nombre}">
                </div>
              </div>
            </td>
          `
          table.appendChild(tr)
  
      //const boddy = document.body
  /*           divadd.innerHTML = `
            <form method="GET" action="/addprov">
              <input type="submit" value="+" class="add"></input>
            </form>
            ` */
          sortList()
          //eliminar()
          const buttonalertelim = document.getElementsByClassName('delet')
          var i
          for (i = 0; i < buttonalertelim.length; i++) {
           
            buttonalertelim[i].removeEventListener("click",alert)
          }
          var o
          for (o = 0; o < buttonalertelim.length; o++) {
           
            buttonalertelim[o].addEventListener("click",alert)
          }
          
        })

      }
      else
      {
        const table=document.createElement('table')
        table.id="table"
        table.classList.add("table")
        const tbody=document.createElement('tbody')
        table.appendChild(tbody)
        contenedor.innerHTML=''
        contenedor.appendChild(table)


        data.forEach(cliente => {
          const tr = document.createElement('tr')
          tr.innerHTML =`
            <td class="nom"><p>${cliente.nombre}<p></td>
            <td class="dir"><p>${cliente.direccion}<p></td>
            <td class="tel"><p>${cliente.telefono}<p></td>
            <td class="editelim">
              <div class="dots">
                <svg>
                  <g>
                    <circle cx="5" cy="5" r="2"></circle>
                    <circle cx="5" cy="12" r="2"></circle>
                    <circle cx="5" cy="19" r="2"></circle>
                  </g>
                </svg>
                <div class="options">
                  <form method="GET" action="/editar/${cliente.nombre}">
                    <input class="edit" type="submit" value="Editar">
                  </form>
                  <input class="delet" type="button" id="eliminar" value="Eliminar"  data-contacto="${cliente.nombre}">
                </div>
              </div>
            </td>
          `
          table.appendChild(tr)
  
      //const boddy = document.body
  /*           divadd.innerHTML = `
            <form method="GET" action="/addprov">
              <input type="submit" value="+" class="add"></input>
            </form>
            ` */
          sortList()
          //eliminar()
          const buttonalertelim = document.getElementsByClassName('delet')
          var i
          for (i = 0; i < buttonalertelim.length; i++) {
           
            buttonalertelim[i].removeEventListener("click",alert)
          }
          var o
          for (o = 0; o < buttonalertelim.length; o++) {
           
            buttonalertelim[o].addEventListener("click",alert)
          }
          
        })
      }

      })
      
    })

}

function eliminar(e)
  {
    const buttonalertelim = document.getElementsByClassName('delet')
    //const boddy = document.body
    var i
    for (i = 0; i < buttonalertelim.length; i++) {
     
      buttonalertelim[i].addEventListener("click",alert)
    }
    //return
    
}

function alert(e)
{
  const boddy = document.body
      console.log(e.target)
      
      
      const cliente=e.target.dataset.contacto
      //const proveedor=e.target.dataset.contacto
      //const div = document.getElementById('divformalert');
      //contenedor.innerHTML=""
      //alert("hola")
      const divcontentalert= document.createElement('div')
      const divalert = document.createElement('div')
      //divcontentalert.appendChild(divalert)
      divcontentalert.classList.add("contentalert")
      divcontentalert.id="backdelete"
      divalert.id = "deletewindow" 
      divalert.classList.add("alertelim")
      if(!provsearch)
      {
/*         divalert.innerHTML= `
        <h3>Eliminar ${cliente}?</h3>
        <form class="formokcancel" method="POST" action="/eliminar/${cliente}">
          <input class="bluebut" type="submit" value="OK" class="okalert">
          <input type="hidden" name="_method" value="DELETE">
          <input class="bluebut" type="button" value="CANCELAR" id="cancelalert">
        </form>
        ` */
        divalert.innerHTML= `
        <h3>Eliminar ${cliente}?</h3>
        <input class="bluebutelim" type="button" value="OK" class="okalert" id="deleteclient">
        <input class="bluebutelim" type="button" value="CANCELAR" id="cancelalert">
        `
             
      }
      else
      {
/*         divalert.innerHTML= `
        <h3>Eliminar ${cliente}?</h3>
        <form class="formokcancel" method="POST" action="/eliminar/prov/${cliente}">
          <input class="bluebut" type="submit" value="OK" class="okalert">
          <input type="hidden" name="_method" value="DELETE">
          <input class="bluebut" type="button" value="CANCELAR" id="cancelalert">
        </form>
        ` */
        divalert.innerHTML= `
        <h3>Eliminar ${cliente}?</h3>
        <input class="bluebutelim" type="button" value="OK" class="okalert" id="deleteprov">
        <input class="bluebutelim" type="button" value="CANCELAR" id="cancelalert">
        `
      }

      boddy.appendChild(divalert)
      boddy.appendChild(divcontentalert)

      setTimeout(deletealert,100)

      if(document.getElementById('deleteclient'))
      {
        const okclient=document.getElementById('deleteclient')
        const clien=document.getElementById('clien')

        okclient.addEventListener("click", ()=>{
         fetch(`/eliminar/${cliente}`, {
           method: 'DELETE'
         })
         .then( res =>{ console.log(res.json)
         clien.click()} )
         //return
         //.then(clien.click())
         //clien.click()
       })

      }
      else
      {
        const prov=document.getElementById('prov')
        const okprov=document.getElementById('deleteprov')
        
        okprov.addEventListener("click", ()=>{
          fetch(`/eliminar/prov/${cliente}`, {
            method: 'DELETE'
          })
          .then( res =>{ console.log(res.json)
          prov.click()} )
          //return
          //.then(clien.click())
          //clien.click()
        })
      }


      
      
      //deletealert()
      //div.style.visibility = "visible"
      //setTimeout(boddy.appendChild(divalert),100)
     
  
         //const boddy = document.body
         
        
}
/* function fetchdelete(cliente)
{
  fetch(`/eliminar/${cliente}`, {
    method: 'DELETE'
  })
      .then(()=>{
        removechild()
        clientes()
      })

} */

function deletealert()
{
         

    const backdelete = document.getElementById('backdelete')
    const cancel = document.getElementById('cancelalert')

    if(document.getElementById('deleteclient'))
    {
      const okclient=document.getElementById('deleteclient')
      okclient.addEventListener("click",removechild)
    }
    else{
      const okprov=document.getElementById('deleteprov')
      okprov.addEventListener("click",removechild)
    }
    


      backdelete.addEventListener("click",removechild)
      cancel.addEventListener("click",removechild)
    
}

function removechild()
{
  //const boddy = document.body
  const itemtodelete=document.getElementById('deletewindow')
  const backdelete = document.getElementById('backdelete')
  
  //itemtodelete.parentNode.removeChild(itemtodelete)
  itemtodelete.parentNode.removeChild(itemtodelete)
  backdelete.parentNode.removeChild(backdelete)
  //backdelete.removeEventListener("click",removechild)
}

function preload()
{
  //const contenedor = document.getElementById('cont')
  //const header = document.getElementById('header')
  const preload= document.createElement('div')
  preload.id = "load" 
  body=document.body
  preload.classList.add("loader")
  //const preload = document.getElementById('load')

  body.appendChild(preload)
 //setTimeout(carga,2000)
  //carga()
}

  function deletePreloader()
  {
    const preload = document.getElementById('load')
    body=document.body
    body.removeChild(preload)
    //preload.style.visibility = "hidden"
  }
  


  
window.addEventListener("load",clientes);
window.addEventListener("load",sortList);
window.addEventListener("load",buscar);
window.addEventListener("load",proveedores);
window.addEventListener("load",eliminar);
//window.addEventListener("load",preload);

//window.addEventListener("fetch",function(){alert('hola')});
//window.addEventListener("load",deletealert);
