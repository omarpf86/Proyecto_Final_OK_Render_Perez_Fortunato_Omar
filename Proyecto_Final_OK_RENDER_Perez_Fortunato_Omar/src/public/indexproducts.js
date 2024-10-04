const socketClient = io()



const form = document.getElementById('display')
const formDelete = document.getElementById('formDelete')
const inputIdDelete = document.getElementById('idDelete')
const prod1 = document.getElementById('prod1')


form.onsubmit = (e) => {
    e.preventDefault();
    console.log("el evento llego al indexproduct")


    
    socketClient.emit('productList');
}

socketClient.on('productList2', (products) => {
    let infoProducts = '';
    products.map((products) => {
        infoProducts += `${products._id} - ${products.name} - ${products.description} - ${products.code}  - $${products.price} - ${products.status} - ${products.stock} - ${products.category}  </br>`
    })
    prod1.innerHTML = infoProducts
})




formDelete.onsubmit = async (e) => {
    e.preventDefault();
    const idDelete = inputIdDelete.value;
    console.log("en el indexproducts el id es", idDelete)

    const response = await fetch(`/api/products/${idDelete}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        socketClient.emit('productList'); 
    } else {
        console.error('Error al eliminar el producto');
    }
};







