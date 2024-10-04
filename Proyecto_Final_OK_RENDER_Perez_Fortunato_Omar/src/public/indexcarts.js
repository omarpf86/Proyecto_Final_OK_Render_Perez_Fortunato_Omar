const socket = io()

const formListProducts = document.getElementById('displayList')

const formCreateCart = document.getElementById('createCart')
const listProducts = document.getElementById('listProducts')

const boxIdCart = document.getElementById('cartIdentification')

const formGetProduct = document.getElementById('form1')
const inputIdProduct = document.getElementById('idP')
const listProductsInCart = document.getElementById('listAddProducts')

const formProductDelete = document.getElementById('form2')
const inputIdProductDelete = document.getElementById('idProductDelete')

const formClearCart = document.getElementById('cleanCart')

const formComprar = document.getElementById('formComprar')

const deleteCart = document.getElementById('deleteCart')




//OBTENCION DE LISTA DE PRODUCTOS----------------------------------------------------
formListProducts.onsubmit = (e)=>{
    e.preventDefault();
    socket.emit('getListproducts')
}



socket.on('listProducts1', (products) => {
    let infoProducts = '';
    products.map((products) => {
        infoProducts += `${products._id} - ${products.name} - ${products.description} - ${products.code}  - $${products.price} - ${products.status} - ${products.stock} - ${products.category}  </br>`
    })
    
    listProducts.innerHTML = infoProducts
})


//AGREGAR PRODUCTO A CARRITO---------------------------------------------------------
console.log("el box es ", boxIdCart)
formGetProduct.onsubmit = async (e) => {
    e.preventDefault();
    const idProduct = inputIdProduct.value
    const cartId = boxIdCart.textContent
    const response = await fetch(`/api/carts/${cartId}/products/${idProduct}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        socket.emit('addProduct1',  cartId);
        form.reset()
    } else {
        console.error('Error al eliminar el producto');
    }
    
}
  

socket.on('addProduct2', (productCart) => {
    let infoProducts = '';
    productCart.map((x) => {
        infoProducts += `${x.product._id} - ${x.product.name} - ${x.product.description} - ${x.product.price} - ${x.quantity} </br>`
    })
    listProductsInCart.innerHTML = infoProducts
})

//BORRAR PRODUCTO DEL CARRITO-------------------------------------------------------

formProductDelete.onsubmit = (e) => {
    e.preventDefault();
    const idProductDelete = inputIdProductDelete.value
    const idCart = boxIdCart.textContent
    const productDelete = { 
        idC: idCart,
        idP: idProductDelete
    }
    socket.emit('deleteProduct', productDelete);
    formDelete.reset()
}

socket.on('deleteProduct2', (products) => {
    let infoProducts = '';
    products.map((x) => {
        infoProducts += `${x.product._id} - ${x.product.name} - ${x.product.description} - ${x.product.price} - ${x.quantity} </br>`
    })
    listProductsInCart.innerHTML = infoProducts
})

//lIMPIAR CARRITO--------------------------------------------------------------------
formClearCart.onsubmit = (e) => {
    e.preventDefault();
    const idCart = boxIdCart.textContent
    console.log("el id para borrar es", idCart)
    socket.emit('clearCart', idCart);
}

socket.on('emptyCart', (cart) => {
    let infoCart = cart
    listProductsInCart.innerHTML = infoCart
})



//COMPRAR----------------------------------------------------------------------------
formComprar.onsubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/tickets/purchase`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });


}


