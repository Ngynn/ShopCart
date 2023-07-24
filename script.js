let productList = [
  {
    name: "Cà Phê Đen Đá Hộp (14 gói x 16g)",
    price: 58.0,
    imageURL:
      "https://product.hstatic.net/1000075078/product/1684482557_bg-product-1_40cb5702216b434d8bf8411fac229aa0_large.jpg",
    quantity: 10,
    idProduct: 1,
  },
  {
    name: "Cà Phê Đen Đá Túi (30 gói x 16g)",
    price: 110.0,
    imageURL:
      "https://product.hstatic.net/1000075078/product/1684482444_bg-product-22_6caf7d1330344740b30943de30fef59d_large.jpg",
    quantity: 10,
    idProduct: 2,
  },
  {
    name: "Thùng Cà Phê Sữa Espresso",
    price: 336.0,
    imageURL:
      "https://product.hstatic.net/1000075078/product/1684482557_bg-product-1_40cb5702216b434d8bf8411fac229aa0_large.jpg",
    quantity: 10,
    idProduct: 3,
  },
  {
    name: "Combo 6 Lon Cà Phê Sữa Espresso",
    price: 84.0,
    imageURL:
      "https://product.hstatic.net/1000075078/product/1684482557_bg-product-1_40cb5702216b434d8bf8411fac229aa0_large.jpg",
    quantity: 10,
    idProduct: 4,
  },
];

let header = document.getElementById("head");
header.innerHTML = `<img src="https://brademar.com/wp-content/uploads/2022/10/The-Coffee-House-Logo-PNG-2.png" alt="">
  <div id="buttonGroup"> 
          <div id="button">Cà phê</div>
      <div id="button">Trà</div>
          <div id="button">Menu</div>
          <div id="button">Chuyện nhà</div>
          <div id="button">Cảm hứng CloudFee</div>
          <div id="button">Cửa hàng</div>
          <div id="button">Tuyển dụng</div>
  </div>`

let products = document.getElementsByClassName("product");
console.log(products);

function buildProductCard(cafe) {
  let card = document.createElement("div");
  card.className = "cafe";
  Object.assign(card.style, {
    alignItem: "center",
    //   backgroundColor: "green",
  });
  card.innerHTML = `
      <img
      src="${cafe.imageURL}"
      alt=""
    />
    <div class="item">
      <div class="item-detail">
        <div class="name"><b>${cafe.name}</b></div>
        <div class="cost"><b>${cafe.price}₫</b></div>
      </div>
      <div class="item-desc" id="sp${cafe.idProduct}">${cafe.quantity}</div>
    
    </div>
      `;
  let btnBox = document.createElement("div");
  btnBox.className = "bot-card";

  let btnAdd = document.createElement("button");
  let boldText = document.createElement("b");
  boldText.innerText = "Thêm";

  btnAdd.appendChild(boldText);
  btnBox.appendChild(btnAdd);
  card.appendChild(btnBox);

  btnBox.addEventListener("click", () => {
    if (cafe.quantity > 0) {
      cafe.quantity--;
      addToCart(cafe);
      card.innerHTML = `
          <img
          src="${cafe.imageURL}"
          alt=""
        />
        <div class="item">
          <div class="item-detail">
            <div class="name"><b>${cafe.name}</b></div>
            <div class="cost"><b>${cafe.price}₫</b></div>
          </div>
          <div class="item-desc" id="sp${cafe.idProduct}">${cafe.quantity}</div>
  
        </div>
          `;
      btnAdd.appendChild(boldText);
      btnBox.appendChild(btnAdd);
      card.appendChild(btnBox);
    } else {
      alert("Hết sản phẩm rồi !!!!");
      return;
    }
  });

  return card;
}

let cartList = [];
let idCart = 0;

function addToCart(cafe) {
  let isExist = false;
  if (cartList.length == 0) {
    cartList.push({
      ...cafe,
      stock: 1,
      quantity: cafe.quantity,
    });
    console.log(cartList);
    return;
  }
  for (let i = 0; i < cartList.length; i++) {
    if (cartList[i].name == cafe.name) {
      cartList[i].quantity = cafe.quantity;
      cartList[i].stock += 1;
      console.log(cartList);
      isExist = true;
      return;
    }
  }
  if (!isExist) {
    cartList.push({
      ...cafe,
      quantity: cafe.quantity,
      stock: 1,
    });
    console.log(cartList);
  }
}

for (let j = 0; j < productList.length; j++) {
  products[0].appendChild(buildProductCard(productList[j]));
}


function opendialog() {
  var dialogElement = document.getElementById("dialogCart");
  dialogElement.open = true;
  rendercartList();
  console.log("222");
  document.getElementById("overlay").style.display = "block";
}
function rendercart(cafe) {
  let cart = document.createElement("div");
  cart.className = "itemcart";
  cart.innerHTML = `
  <div class="name">${cafe.name}</div>
  <div class="quantity">
  số lượng 
   <input id="quantityupdate${cafe.id}/>
   }" class="inputquantity" type="number" placeholder="${cafe.stock}">
  </div>
  <div class="price">price: ${cafe.price * cafe.stock}đ</div>
  </div>`;
  let containerupde = document.createElement("div");
  containerupde.className = "containerupde";
  containerupde.id = `containerupde${cafe.id}`;

  let btnudapte = document.createElement("div");
  btnudapte.className = "update";
  btnudapte.innerHTML = "update";

  let btndelete = document.createElement("div");
  btndelete.className = "delete";
  btndelete.innerHTML = "delete";

  containerupde.appendChild(btnudapte);
  containerupde.appendChild(btndelete);
  cart.appendChild(containerupde);
  console.log(cafe);
  
  btnudapte.addEventListener("click", () => {
    updateCart(cafe);
  });
  btndelete.addEventListener("click", () => {
    deleteCart(cafe);
  });
  return cart;
}

let totalPrice = 0;
function renderTotalPrice(totalPrice) {
  let totalPricediv = document.createElement("div");
  totalPricediv.className = "totalprice";
  totalPricediv.innerHTML = `
<div>total price: ${totalPrice}đ</div>`;
  return totalPricediv;
}

function rendercartList() {
  let cartdialog = document.getElementById("maindialog");
  cartList.forEach((element) => {
    cartdialog.appendChild(rendercart(element));
    totalPrice += element.price * element.stock;
  });
  cartdialog.appendChild(renderTotalPrice(totalPrice));
}
function oder() {
  var dialogElement = document.getElementById("dialogCart");
  dialogElement.open = false;
  removeItems();
  removeTotalPrice();
  totalPrice = 0;
  cartList=[];
  document.getElementById("overlay").style.display = "none";
  alert("bạn đã đặt hàng thành công");
}
function closeDialog() {
  var dialogElement = document.getElementById("dialogCart");
  dialogElement.open = false;
  removeItems();
  removeTotalPrice();
  totalPrice = 0;
  document.getElementById("overlay").style.display = "none";
}

function removeItems() {
  var dialogElement = document.getElementById("maindialog");
  var items = dialogElement.getElementsByClassName("itemcart");
  while (items.length > 0) {
    items[0].remove();
  }
}
function removeTotalPrice() {
  var dialogElement = document.getElementById("maindialog");
  var items = dialogElement.getElementsByClassName("totalprice");
  while (items.length > 0) {
    items[0].remove();
  }
}
function updateCart(cart) {
  let idquantityUpdate = "quantityupdate" + cart.id;
  console.log(idquantityUpdate);

  var newStock = parseInt(document.getElementById(idquantityUpdate).value);
  if (newStock <= cart.quantity) {
    cartList.forEach((cafe) => {
      if (cafe.id === cart.id) {
        cafe.stock = newStock;
      }
    });
    itemList.forEach((cafe) => {
      if (cafe.idProduct === cart.idProduct) { 
        cafe.quantity = cart.quantity - newStock;
      }
    });
    console.log(itemList);
    let updateItem = itemList.find((cafe) => cafe.idProduct == cart.idProduct);
    let numOfProduct = document.getElementById(`sp${cart.idProduct}`);
    numOfProduct.innerHTML = updateItem.quantity;
  } else {
    alert("Mặt hàng đã hết !!!");
  }
  totalPrice = 0;
  removeItems();
  removeTotalPrice();
  rendercartList();
}
function deleteCart(cart) {
  removeItemById(cart.idProduct);
  totalPrice = 0;
  removeItems();
  removeTotalPrice();
  rendercartList();
  console.log(cart.idProduct);
  let numOfProduct = document.getElementById(`sp${cart.idProduct}`);
  numOfProduct.innerHTML = cart.quantity;
  itemList.forEach((cafe) => {
    if (cafe.name === cart.name) {
      cafe.quantity = cart.quantity;
    }
  });
}
function removeItemById(idProduct) {
  cartList = cartList.filter((cafe) => cafe.idProduct !== idProduct);
}






console.log(header);