const itemForm = document.getElementById('item-form')
const formButton = itemForm.querySelector('button')
const itemInput = document.getElementById('item-input')
const itemFilter = document.getElementById('filter')
const itemList = document.getElementById('item-list')
const clearAllButton = document.getElementById('clear')
let isEditMode = false

function displayItems() {
    const itemsFromStorage = getItemsFromLocalStorage()
    itemsFromStorage.forEach(item => addItemToDOM(item))

    checkUI()
}

function createIcon(classes) {
    const icon = document.createElement('i')
    icon.className = classes
    
    return icon
}

function createButton(classes) {
    const button = document.createElement('button')
    button.appendChild(createIcon('fa-solid fa-xmark'))
    button.className = classes

    return button    
}

function addItemToDOM(itemText) {
    const li = document.createElement('li')
    li.appendChild(document.createTextNode(itemText))

    const button = createButton('remove-item btn-link text-red')
    li.appendChild(button)

    itemList.appendChild(li)
}

function getItemsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('items')) || []
}

function addItemToLocalStorage(item) {
    const itemsFromStorage = getItemsFromLocalStorage()

    itemsFromStorage.push(item)
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

function removeFromLocalStorage(item) {
    let itemsFromStorage = getItemsFromLocalStorage()

    itemsFromStorage = itemsFromStorage.filter(i => i !== item)
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

function onAddItemSubmit(e) {
    e.preventDefault()

    const userInput = itemInput.value

    if (userInput === '') {
        alert('Please add an item')
        return
    }

    if (isEditMode) {
        const itemToEdit = itemList.querySelector('.edit-mode')

        removeFromLocalStorage(itemToEdit.textContent)
        itemToEdit.classList.remove('edit-mode')
        itemToEdit.remove()
        isEditMode = false
    } else {
        if (itemExists(userInput)) {
            alert(`${userInput} item already exists!`)
            return
        }
    }

    addItemToDOM(userInput)

    addItemToLocalStorage(userInput)

    checkUI()

    itemInput.value = ''
}

function removeItem(item) {
    if (confirm('Are you sure you want to delete this item?')) {
        item.remove()

        removeFromLocalStorage(item.textContent)

        checkUI()
    }
}

function setItemToEdit(item) {
    isEditMode = true

    itemList.querySelectorAll('li').forEach(li => li.classList.remove('edit-mode'))

    item.classList.add('edit-mode')
    formButton.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item'
    formButton.style.backgroundColor = '#228b22'
    itemInput.value = item.textContent
}

function onClickItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        removeItem(e.target.parentElement.parentElement)
    } else {
        setItemToEdit(e.target)
    }
}

function itemExists(item) {
    const itemsFromStorage = getItemsFromLocalStorage()
    return itemsFromStorage.includes(item)
}

function clearAllItems() {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild)
    }

    localStorage.removeItem('items')

    checkUI()
}

function filterItems(e) {
    const items = Array.from(itemList.querySelectorAll('li'))
    const userInput = e.target.value.toLowerCase()

    items.forEach(item => {
        const itemText = item.firstChild.textContent.toLocaleLowerCase()
        item.style.display = itemText.includes(userInput) ? 'flex' : 'none' 
    })

    checkUI()
}

function checkUI() {
    itemInput.value = ''

    const items = itemList.querySelectorAll('li')

    if (items.length === 0) {
        clearAllButton.style.display = 'none'
        itemFilter.style.display = 'none'
    } else {
        clearAllButton.style.display = 'block'
        itemFilter.style.display = 'block'
    }

    formButton.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item'
    formButton.style.backgroundColor = '#333'
    isEditMode = false
}

function init() {
    itemForm.addEventListener('submit', onAddItemSubmit)
    itemList.addEventListener('click', onClickItem)
    clearAllButton.addEventListener('click', clearAllItems)
    itemFilter.addEventListener('input', filterItems)
    document.addEventListener('DOMContentLoaded', displayItems)

    checkUI()
}

init()
