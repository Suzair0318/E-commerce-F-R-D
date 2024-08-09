

const Apidata = async() => {
        try {
            const a = await fetch(`https://fakestoreapi.com/products`)
            const b = await a.json();
            return b;
        } catch (error) {
            console.log(error)
        }
 
}

const All_Cart = [];

const carddata = (cart) => {
    All_Cart.push(cart);
    localStorage.setItem("Cart_Data", JSON.stringify(All_Cart));
    let a = document.querySelector(".num_cart");  
    a.textContent = All_Cart.length;
}

const image = () => {
  let a = document.querySelector("#log_in_modal");
    a.addEventListener("submit", (e) => {
      
      e.preventDefault();

      let form_data = new FormData(a);
        let email  = form_data.get("email");
        let pass = form_data.get("password");
        let img = form_data.get("img_file");
        
       let url_img = URL.createObjectURL(img);
        localStorage.setItem("img" , JSON.stringify(url_img));
       let local_img =  localStorage.getItem("img");
       let div = document.querySelector(".log_In");
       div.innerHTML = `<img src="${JSON.parse(local_img)}" width="50px" height="50px" class="log_in_img"  />`;
       
    })
}

 let apidata = Apidata();

apidata.then((data) => {
  
  let local_img =  localStorage.getItem("img");
  if(local_img){
    let div = document.querySelector(".log_In");
    div.innerHTML = `<img src="${JSON.parse(local_img)}" class="log_in_img" width="50px" height="50px" alt="image"  />`;
  }

  document.querySelector(".cart-icon").addEventListener( "click" , () => {
          window.location.pathname = "../CartDetails/CartDetails.html";
  })
  
        data.map((el) => {
         let a = document.querySelector(".card-container");
            let CardHTML = `
            <div class="card border-0" >
  <img src="${el.image}" class="card-img-top" alt="imahe hy">
  <div class="card-body">
    <h5 class="card-title ">${el.title}</h5>
    <p class="card-text mb-0"><b>Rating : </b> ${el.rating.rate}</p>
    <p class="card-text mb-0"><b>Price : </b> ${el.price}$</p> 
    <button  class=" add_to_cart btn px-4 btn-sm btn-dark mt-2 ">Add to Cart</button>
  </div>
    
</div>
            `
            a.insertAdjacentHTML("afterbegin" , CardHTML);


            let b = document.querySelector(".add_to_cart");
        b.addEventListener("click", (e) => {
             carddata(el)
        })
        })
        
image()
        
  
});



apidata.then((data) => {
      
      const category_filter = data.map((e) => {
           return e.category
      })
      const unique_category = [...new Set(category_filter)];
        unique_category.map((e) => {
          let a =  document.querySelector("#category-select");
                 let option = document.createElement("option");
                 option.value = e;
                 option.innerText = e;
                 a.appendChild(option);

                 a.addEventListener( "change" , (e) => {
                  let all = document.querySelector(".card-container");
                         all.innerHTML = ``;
                      let v =  data.filter((filter) => {
                          return filter.category.includes(e.target.value)
                       }).map((el) => {
                             let a = document.querySelector(".card-container");
                        let CardHTML = `
                        <div class="card border-0" >
                  
              <img src="${el.image}" class="card-img-top" alt="imahe hy">
              <div class="card-body">
                <h5 class="card-title ">${el.title}</h5>
                <p class="card-text mb-0"><b>Rating : </b> ${el.rating.rate}</p>
                <p class="card-text mb-0"><b>Price : </b> ${el.price}$</p>
               
                <button class=" add_to_cart btn px-4 btn-sm btn-dark mt-2 ">Add to Cart</button>
              </div>
                
            </div>
                        `
                        all.insertAdjacentHTML("afterbegin" , CardHTML);


                        let b = document.querySelector(".add_to_cart");
        b.addEventListener("click", (e) => {
             carddata(el)
        })
                       })

                 })
        })
 
    

});

apidata.then((data) => {
          
      let serarch_div = document.querySelector(".search-input");
         serarch_div.addEventListener("input" , (e) => {
                  let all = document.querySelector(".card-container");
                   let v =   data.filter((filter) => {
                        return filter.category.includes(e.target.value.toLowerCase())
                   }).map((el) => {
                    let all = document.querySelector(".card-container");
                    let CardHTML = `
                    <div class="card border-0" >
               
          <img src="${el.image}" class="card-img-top" alt="imahe hy">
          <div class="card-body">
            <h5 class="card-title ">${el.title}</h5>
            <p class="card-text mb-0"><b>Rating : </b> ${el.rating.rate}</p>
            <p class="card-text mb-0"><b>Price : </b> ${el.price}$</p> 
           
            <button class=" add_to_cart btn px-4 btn-sm btn-dark mt-2 ">Add to Cart</button>
          </div>
        </div>
                    `
                    all.insertAdjacentHTML("afterbegin" , CardHTML);


                    let b = document.querySelector(".add_to_cart");
        b.addEventListener("click", (e) => {
             carddata(el)
        })
                   })
                   
         })
}) 



