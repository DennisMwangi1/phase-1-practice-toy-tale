let addToy = false;

document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault()

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", (e) => {
    e.preventDefault()
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  fetch('http://localhost:3000/toys')
  .then((res)=>res.json())
  .then((data)=>{
    data.forEach(element => {
      let toysContainer = document.getElementById('toy-collection')
      let card = document.createElement('div')
      toysContainer.appendChild(card)
      card.classList.add('card')

      let toyName = document.createElement('h2')
      toyName.innerText = element.name
      card.appendChild(toyName)

      let toy = document.createElement('img')
      toy.classList.add('toy-avatar')
      toy.src = element.image
      card.appendChild(toy)

      let likes = document.createElement('p')
      likes.innerText = `${element.likes} likes`
      card.appendChild(likes)

      let likeButton = document.createElement('button')
      likeButton.classList.add('button')
      likeButton.style.width = '100px'
      likeButton.innerText = 'LIKE'
      likeButton.id = element.id
      card.appendChild(likeButton)

      likeButton.addEventListener('click',(e)=>{
        e.preventDefault()
        fetch("http://localhost:3000/toys/10",{
          method:'PATCH',
          headers:{
            'content-Type':'application/json',
            Accept:'application/json'
          },
          body:JSON.stringify({
            'likes':element.likes+=1
          })
        })
      })
    });
  })

  // get the input value of the toys name,and toys image url
  // add an event listener to the submit button
  // upon clicking submit,a fetch of method post will be run
  let newToyName = document.getElementById('toy-name')
  let newToyImage = document.getElementById('toy-image')
  let submitBtn = document.querySelector('.submit')
  submitBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    if (newToyName.value == '') {
      alert('Please add Toy Name')
    }else if (newToyImage.value == '') {
      alert('Please add image URL')
    }else{
    fetch("http://localhost:3000/toys",{
      method:'POST',
      headers:{
        'content-Type':'application/json',
        Accept:'application/json'
      },
      body:JSON.stringify({
        'name':newToyName.value,
        'image':newToyImage.value,
        'likes':0
      })
    })
    .then(()=>{
      alert('Congrats!!You Have a new toy')
    })
    .catch(()=>{
      alert('server Error')
    })
  }
    
  })

  
 

});
