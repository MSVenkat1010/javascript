const modal = document.querySelector(".modal")
const overlay = document.querySelector(".overlay")
const btnCloseModal = document.querySelector(".close-modal")
0
const openModal = ()=>{
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}
const closeModal= ()=>{
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}
btnCloseModal.addEventListener('click',()=>{
  closeModal()
})
document.addEventListener('keydown', function (e) {
  

  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
let btnShowList = document.querySelectorAll(".show-modal")
for(let i =0 ; i< btnShowList.length ;i++){
   btnShowList[i].addEventListener("click",()=>{
    openModal()
    }) 
}

