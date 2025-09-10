const btn = document.querySelector('.add-btn');
const list = document.querySelector('#list-container');
const box = document.querySelector('#input-box');


btn.addEventListener('click', function(){
    if(box.value === '')
    {
        alert('You must write something!')
        return;
    }
    // CREATING A NEW LIST AND ADDING THE NEW ITEMS WHEN WE CLICK ON THE ADD BTN
    const newItem = document.createElement('li');
    newItem.innerHTML = `${box.value} <span class="delete-btn">X</span>`;
    list.prepend(newItem); // THE PREPEND METHOD ADDS ANY NEW ELEMENT AT THE TOP WHEREAS APPENDCHILD ADDS AT THE BOTTOM
    saveData(); // SAVE WHENEVER NEW ITEM IS ADDED
    box.value = '';
})


list.addEventListener('click', function(e){
    // DELETES A LIST ITEM
    if(e.target.tagName === 'SPAN' && e.target.parentElement.classList.contains('checked'))
        // console.log(e.target.tagName);
        e.target.parentElement.remove();

    // ADDS OR REMOVES THE CHECK ICON --> BEST METHOD
    else
        e.target.classList.toggle('checked');   

    saveData(); // SAVE WHENEVER SOMETHING CHANGES

    // SAME WORK
    // if(e.target.id === 'checked')
    // {
    //     e.target.classList.toggle('checked');
    // }
    // else
    // {
    //     e.target.classList.toggle('checked');
    // }
    
    // SAME WORK
    // if(e.target.classList.contains('checked'))
    // {
    //     e.target.classList.remove('checked');
    // }
    // else
    // {
    //     e.target.classList.add('checked');
    // }
})

function saveData() {
    localStorage.setItem("todos", list.innerHTML);
}

function loadData() {
   list.innerHTML = localStorage.getItem("todos") || "";
}


loadData();


