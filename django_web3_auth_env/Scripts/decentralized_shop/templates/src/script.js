let button1 = document.getElementById('button');

button1.onclick = function (e) {
    e.preventDefault();

    // Replace localhost and the folder name
    // based on your setup
    location.href = 'http://127.0.0.1:8000/login.html';
}
const navLinks = document.querySelector('.nav-links')
function onToggleMenu(e) {
    e.name = e.name === 'menu' ? 'close' : 'menu'
    navLinks.classList.toggle('top-[9%]')
}

function scrollWin(x, y) {
    window.scrollBy(x, y);
}
// const close = document.querySelector(".close");
// const dropdownButton = document.querySelector("#cart");
// const dropdownList = document.querySelector(".hidden");

// dropdownButton.addEventListener("click", () => {
//     dropdownList.classList.toggle("hidden");
// })


let shop = document.getElementById('shopping');
let buttonx = document.getElementById('#btnx');
let button2 = document.getElementsByClassName('btn2');


let basket = JSON.parse(localStorage.getItem("data")) || []
let generateshop = () => {
    return (shop.innerHTML = shopitemdata.map((x) => {
        // let(id, name, img1, bt1, bt2) = x;
        let search = basket.find((a) => a.id === x.id) || [];
        return `
                    
                <div  class="shadow-md rounded-lg mb-5 hover:translate-y-2 duration-150 delay-75">
                    <a href="">
                        <img src="${x.img1}" class=""
                            alt="">
                    </a>
                    <div class="p-5 flex flex-row justify-between">
                        <h3 class="text-xl font-bold"><a href="">PS5</a></h3>
                        <h3 class="font-bold text-xl "><a href="">${x.price}</a></h3>
                    </div>
                    
                    <div class="flex flex-row justify-between ml-8 mb-4">
                        <a href=""  onclick="increment(${x.id})"
                            class=" hover:bg-red-400 button   bg-red-600 px-3 py-3 text-white rounded-lg flex flex-row gap-1 ">
                            Add To Cart
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>

                        </a>
                        <h1 id =${x.id} class="font-bold text-2xl">${search.item === undefined ? 0 : search.item}</h1>
                        <a href=""  onclick="decrement(${x.id})"
                        class=" mr-5 hover:bg-red-400 button   bg-red-600 px-3 py-3 text-white rounded-lg flex flex-row gap-1 ">
                        Remove
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>

                    </a>


                </div>
                    </div>
                 </div> 

                    `}).join(""));
};

generateshop();
let increment = (id) => {
    event.preventDefault();
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    } else {
        search.item += 1;
    }

    // console.log(basket);
    update(selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket));

};
let decrement = (id) => {
    event.preventDefault();
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) return;
    if (search.item === 0) {
        return;
    } else {
        search.item -= 1;
    }
    update(selectedItem.id);
    basket = basket.filter((x) => x.item !== 0);
    // console.log(basket);
    localStorage.setItem("data", JSON.stringify(basket));

};
function update(id) {
    event.preventDefault();
    let search = basket.find((x) => x.id === id);
    // console.log(search.item)
    document.getElementById(id).innerHTML = search.item;
    calculation()
}

function calculation() {
    let carticon = document.getElementById("cartamount");
    let value = (basket.map((x) => x.item).reduce((x, y) => x + y, 0));
    carticon.innerHTML = value;
}
calculation();