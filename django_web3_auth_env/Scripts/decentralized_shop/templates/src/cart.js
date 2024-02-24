let label = document.getElementById("label")
let shoppingcart = document.getElementById("shoppingcart")

let basket = JSON.parse(localStorage.getItem("data")) || [];
// function calculation() {
//     let carticon = document.getElementById("cartamount");
//     let value = (basket.map((x) => x.item).reduce((x, y) => x + y, 0));
//     carticon.innerHTML = value;
// }
// calculation();
let generatecartitems = () => {
    if (basket.length !== 0) {

        // console.log("basket is filling")
        return (shoppingcart.innerHTML = basket.map((b) => {
            let { id, item } = b;
            let search = shopitemdata.find((y) => y.id === id) || []
            return `
            <img src=${search.img1}/>
            `
        }).join(""));
    }
    else {
        shoppingcart.innerHTML = ``;
        label.innerHTML = `
        <h2 class="pt-10 text-3xl font-bold"> cart is empty</h2>
        <a href="index.html">
        <button class="mt-3 bg-black rounded-md text-white p-3">Back To Home</button>
        </a>
        `
        console.log("totally empty")
    }

}
generatecartitems();