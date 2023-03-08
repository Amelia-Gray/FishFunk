


// ---------- ADD TO CART----------

let carts = document.querySelectorAll('.add-cart');
let Product = [
    {
        name: 'Product 1',
        tag: 'Product1',
        price: 40,
        InCart: 0
    },
    {
        name: 'Product 2',
        tag: 'Product2',
        price: 40,
        InCart: 0
    },
    {
        name: 'Product 3',
        tag: 'Product3',
        price: 40,
        InCart: 0
    },
    {
        name: 'Product 4',
        tag: 'Product4',
        price: 40,
        InCart: 0
    }
];

function CartNumbers(Product) {
    console.log("added product:", Product)
    let ProductNumbers = localStorage.getItem('CartNumbers');
    ProductNumbers = parseInt(ProductNumbers);
    if(ProductNumbers){
        localStorage.setItem('CartNumbers', ProductNumbers + 1);
        document.querySelector('.cart span').textContent = ProductNumbers + 1;
    } else{
        localStorage.setItem('CartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }
    
}

for(let i = 0; i < carts.length; i++){
    carts[i].addEventListener('click', () => {
        CartNumbers(Product[i])
        console.log("added to cart")
        TotalCost(Product[i])
        setItems(Product[i])
    })
}

function OnLoadCartNumbers(){
    let ProductNumbers = localStorage.getItem('CartNumbers');
    if(ProductNumbers){
        document.querySelector('.cart span').textContent = ProductNumbers}
    setItems(Product)
}

function setItems(Product){
    let CartItems = localStorage.getItem('ProductsInCart')
    CartItems = JSON.parse(CartItems)
    console.log("CartItems", CartItems)
    if (CartItems != null) {
        if(CartItems[Product.tag] == undefined){
            CartItems = {
                ...CartItems,
                [Product.tag]: Product
            }
        }
        console.log("CartItems", CartItems[Product.tag].InCart)
        CartItems[Product.tag].InCart += 1
    }else{
        Product.InCart = 1
    CartItems = {
        [Product.tag] : Product
        }
    }
    
    localStorage.setItem("ProductsInCart", JSON.stringify(CartItems))
}


function TotalCost(Product){
    let CartCost = localStorage.getItem('TotalCost')
    console.log("my cartcost is", CartCost)
    if(CartCost != null){
        CartCost = parseInt(CartCost)
        localStorage.setItem("TotalCost", CartCost + Product.price)
    }else{
        localStorage.setItem("TotalCost", Product.price)
    }
}

OnLoadCartNumbers()




// ------------- CART --------------

function DisplayCart(){
    let CartItems = localStorage.getItem("ProductsInCart")
    CartItems = JSON.parse(CartItems)
    let ProductsContainer = document.querySelector(".Product")
    console.log("pc",ProductsContainer)
    let CartCost = localStorage.getItem('TotalCost')
    let CartTax = CartCost * 0.1
    let CartTotal = document.querySelector(".Cart-Total")
    let totalcost = CartCost * 1.1
    if(CartItems && ProductsContainer){
        ProductsContainer.innerHTML = ''
        Object.values(CartItems).map(item =>{
            let MyTable = document.getElementById("tableboy")
            console.log("tb",MyTable)
            if(item.InCart > 0){
                let r = MyTable.insertRow()

                let c = r.insertCell()
                c.innerHTML =`<div class = "Productincart cart-infoimg">
                <img src="./images/${item.tag}.jpg">
                </div>`
                c = r.insertCell()
                c.innerHTML = `<div class ="productb"> <span>${item.name}</span> 
                <h6 class= "price">$${item.price}.00</h6>
                <div class = "rmvbtn"><button>REMOVE</button></div></div>`
                c.classList.add("productb")
                c = r.insertCell()
                c.innerHTML = `<div class="quantityb">${item.InCart}</div>`
                c.classList.add("quantity")
                c = r.insertCell()
                c.innerHTML = `<div class = "cost">$${item.InCart * item.price}.00</div>`
                c.classList.add("cost")
            }
        })
        CartTotal.innerHTML += `
            <div class="CartTotalContainer total">
                <table>
                    <tr>
                       <td>SUBTOTAL:</td>
                       <td class="subtotal">$${CartCost}.00</td>
                    </tr>
                    <tr>
                        <td>TAX:</td>
                        <td class="tax">$${CartTax}.00</td>
                    </tr>
                    <tr>
                        <td>TOTAL:</td>
                        <td class="total">$${totalcost}.00</td>
                    </tr>
                </table>
            </div>
        `
    }
}
let removebtn = document.querySelectorAll(".rmvbtn")
function rmvone(Product) {
    let crnncrt = localStorage.getItem(InCart)
    removebtn.addEventListener('click', () => {
        crnncrt -= 1
    })
}
// removebtn.addEventListener('click', () => {

// })


DisplayCart()