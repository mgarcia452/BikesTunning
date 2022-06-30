const contenedorModal = document.getElementsByClassName('modal-container')[0]
const botonAbrir = document.getElementById('cart-button')
const botonCerrar = document.getElementById('closeCart')
const modalCarrito = document.getElementsByClassName('cart-modal')[0]

botonAbrir.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})
botonCerrar.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})

contenedorModal.addEventListener('click', ()=>{
    botonCerrar.click()
})

modalCarrito.addEventListener('click', (event)=>{
    event.stopPropagation()
})
