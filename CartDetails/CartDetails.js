
 
const data = localStorage.getItem("Cart_Data");
const CART = JSON.parse(data);


let total = CART.reduce((acc , e) => {
     return acc = acc + e.price;
}, 0)

let t = document.querySelector(".total");
t.textContent = `Total :     ${total}$`


const removecard = (id) => {
     
  let a = document.querySelector(`#remove${id}`);
   let cards =  CART.filter((e) => {
      return e.id !== id;
  })

   localStorage.setItem("Cart_Data", JSON.stringify(cards));
   location.reload();
}


const add = (id , price) => {

        let sd = document.getElementById(`card${id}`);
        sd.value =  ++sd.value;
        let a = document.getElementById(`price${id}`);
        a.textContent = `${sd.value*price}$`;

}

const sub = (id , price) => {

      let sd = document.getElementById(`card${id}`);
      sd.value = --sd.value;

      let a = document.getElementById(`price${id}`);
      a.textContent = `${sd.value*price}$`;
    
}

const totalamount = () => {
  
         let price  = document.querySelectorAll(`.price_div`);
          let tr = 0;
          price.forEach((p) => {
            let pr = parseInt(p.textContent);
             tr = tr + pr;
          })
             let t = document.querySelector(".total");
            t.textContent = `Total :     ${ tr }$`
 
}

const reduceamount = () => {
  let price  = document.querySelectorAll(`.price_div`);
          let tr = 0;
          price.forEach((p) => {
            let pr = parseInt(p.textContent);
             tr = tr - pr;
          })
           console.log(tr)
             let t = document.querySelector(".total");
            t.textContent = `Total :     ${ Math.abs(tr) }$`
}

CART.map((data , index) => {
      
    let a = document.querySelector(".Products_Details");
    const Table_HTML = `
    <tr  >
                  <th scope="row" class="py-4">${index}</th>
                  <td >
                    <img src="${data.image}" class="img-table my-3"  alt="" ></td>
                  <td class="py-5">
                    <div class="btn-group" role="group" aria-label="Basic outlined example">
                      <button type="button" class="btn btn-dark plus "><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-lg icon" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                      </svg></button>
                      <input type="number" id=card${data.id}  value=${1} class="input-count " />
                      <button type="button" class="btn btn-dark minus "><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-dash-lg icon" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8"/>
                      </svg></button>
                    </div>
                  </td>
                  <td id="price${data.id}" class=" price_div py-5 fs-5"><p>${data?.price}$</p</td>
                  <td  class=" py-5 fs-5"><button id="remove${data.id}"  class=" remove btn btn-danger btn-sm">Remve</button</td>
    </tr>
    `


    a.insertAdjacentHTML("afterbegin" , Table_HTML);

    

    let p = document.querySelector(".plus");
    p.addEventListener("click" , () => {
  
        add(data.id , data.price);

        totalamount();
    })
    let m = document.querySelector(".minus");
    m.addEventListener("click" , () => {
        sub(data.id , data.price);
        reduceamount();
    })
    let r = document.querySelector(`.remove`);
    r.addEventListener("click" , () => {
       removecard(data.id)
    })

    const submit  = document.querySelector(".submit");
    submit.addEventListener("click" , () => {
       alldata(data , data.id);
    })

});

function alldata(data , id){
     
     
  let order = [data].map((e) => {
        return e.id
  })
   
   let d = order.concat();
  
   let c = order.join("    ||    ");
   console.log(c)
   let form = document.querySelector("#submitform");

      const a = new FormData(form);
      let b = a.get("name");
      let e = a.get("address");
     
      console.log(b , e)
 
    console.log(form);


}


   









