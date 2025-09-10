const btn = document.querySelector('.add-btn');
const list = document.querySelector('#list-container');
const box = document.querySelector('#input-box');

let draggedItem = null;


btn.addEventListener('click', function(){
    if(box.value === '')
    {
        alert('You must write something!')
        return;
    }
    // CREATING A NEW LIST AND ADDING THE NEW ITEMS WHEN WE CLICK ON THE ADD BTN
    const newItem = document.createElement('li');
    newItem.innerHTML = `${box.value} <span class="delete-btn">X</span>`;
    newItem.draggable = true; // MADE IT DRAGGABLE
    list.prepend(newItem); // THE PREPEND METHOD ADDS ANY NEW ELEMENT AT THE TOP WHEREAS APPENDCHILD ADDS AT THE BOTTOM
    saveData(); // SAVE WHENEVER NEW ITEM IS ADDED
    box.value = '';

    newItem.addEventListener('dragstart', e => {
    draggedItem = newItem;
    });

    newItem.addEventListener('dragover', e => {
        e.preventDefault()
    })

    newItem.addEventListener('drop', e => {
    if (draggedItem === newItem) return;

    const children = Array.from(list.children);
    if (children.indexOf(draggedItem) < children.indexOf(newItem)) {
        // dragged item is above the target → move after
        list.insertBefore(draggedItem, newItem.nextSibling);
    } else {
        // dragged item is below the target → move before
        list.insertBefore(draggedItem, newItem);
    }
    saveData();
    });
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
    // STORE THE ENTIRE LIST'S HTML
    localStorage.setItem("todos", list.innerHTML);
}

function loadData() {
    // RESTORE LIST ITEMS FROM localStorage
    list.innerHTML = localStorage.getItem("todos") || "";
}

// CALL loadData ONCE WHEN PAGE LOADS   
loadData();

// AFTER LOADING MAKE EXISTING TASKS DRAGGABLE
Array.from(list.children).forEach(li => {
    li.draggable = true;
    li.addEventListener('dragstart', e => draggedItem = li);
    li.addEventListener('dragover', e => e.preventDefault());
    li.addEventListener('drop', e => {
        if (draggedItem === li) return;

        const children = Array.from(list.children);
        if (children.indexOf(draggedItem) < children.indexOf(li)) {
            list.insertBefore(draggedItem, li.nextSibling);
        } else {
            list.insertBefore(draggedItem, li);
        }
        saveData();
    });
});

