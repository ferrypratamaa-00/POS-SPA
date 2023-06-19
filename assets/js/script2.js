let sessionUser = {
    username: "ferrypratama",
    name: "Ferry Agus Pratama",
};

sessionStorage.setItem("sessionUser", JSON.stringify(sessionUser));

let state = {
    transactionwithuser:
        JSON.parse(localStorage.getItem("transactionwithuser")) ?? null,
    transactions: JSON.parse(localStorage.getItem("transactions")) ?? null,
    carts: JSON.parse(localStorage.getItem("carts")) ?? null,
    products: JSON.parse(localStorage.getItem("products")) ?? null,
    categories: localStorage.getItem("categories") ?? null,
    hash: location.hash,
    sessionUser: JSON.parse(sessionStorage.getItem("sessionUser")),
};

let listCategories = state.categories || [];
let listProducts = state.products || [];
let listitemoncart = state.carts || [];
let listtransaction = state.transactions || [];

let new_transaction = [];
// if (state.transactions != null) {
//     state.transactions.forEach((e) => {
//         let new_item = [];
//         if (
//             e.admin.username == state.sessionUser.username &&
//             e.status == "process"
//         ) {
//             if (state.carts) {
//                 state.carts.forEach((item) => {
//                     if (item.transaction_id == e.id) {
//                         const newItem = {
//                             transaction_id: item.transaction_id,
//                             quantity: item.quantity,
//                             price: item.price,
//                             product: {
//                                 id: item.product.id,
//                                 name: item.product.name,
//                             },
//                         };
//                         new_item.push(newItem);
//                     }
//                 });
//             }

//             const newTrans = {
//                 id: e.id,
//                 timestamp: e.timestamp,
//                 total: e.total,
//                 status: e.status,
//                 admin: {
//                     username: e.admin.username,
//                     name: e.admin.name,
//                 },
//                 item: new_item,
//             };
//             new_transaction.push(newTrans);
//         }
//     });
// }

function setState(newState) {
    const prevState = { ...state };
    const nextState = { ...state, ...newState };
    state = nextState;
    render();
    onChangeState(prevState, nextState);
}

function onChangeState(prevState, nextState) {
    if (prevState.carts != nextState.carts) {
        localStorage.setItem("carts", nextState.carts);
    }

    if (prevState.hash !== nextState.hash) {
        history.replaceState(null, "", nextState.hash);
    }
}

function reloadPage() {
    location.reload(true);
}

function numberFormat(number) {
    let options = {
        style: "decimal",
        useGrouping: true,
        minimumFractionDigits: 2,
    };
    let formattedNumber = number.toLocaleString("id", options);

    return formattedNumber;
}

function getDateTime() {
    let today = new Date();

    let year = today.getFullYear();
    let month = String(today.getMonth() + 1).padStart(2, "0");
    let day = String(today.getDate()).padStart(2, "0");
    let hours = String(today.getHours()).padStart(2, "0");
    let minutes = String(today.getMinutes()).padStart(2, "0");
    let seconds = String(today.getSeconds()).padStart(2, "0");

    let formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return formattedDateTime;
}

function generateUniqueId() {
    var uniqueId = Date.now() + Math.random();
    return uniqueId.toString().replace(".", "");
}

function categories(id, name) {
    let category = {
        id: id,
        name: name,
    };

    listCategories.push(category);

    return listCategories;
}

function products(
    id,
    name,
    price,
    stock,
    image,
    description,
    create_at,
    update_at
) {
    let product = {
        id: id,
        name: name,
        price: price,
        stock: stock,
        image: image,
        description: description,
        create_at: create_at,
        update_at: update_at,
    };

    // listProducts.push(product);

    const newProducts = state.products.concat(product);

    console.log(newProducts);

    setState({ products: newProducts });
    // localStorage.setItem("products", JSON.stringify(listProducts));

    // return listProducts;
}

function createTransaction(
    id,
    timestamp,
    total,
    status,
    admin_username,
    admin_name
) {
    let transaction = {
        id: id,
        timestamp: timestamp,
        total: total,
        status: status,
        admin: {
            username: admin_username,
            name: admin_name,
        },
    };
    listtransaction.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(listtransaction));
    return transaction;
}

function addtoCart(transaction_id, quantity, price, product_id, product_name) {
    let cart = {};
    if (listitemoncart.length > 0) {
        cart = {
            transaction_id: transaction_id,
            quantity: quantity,
            price: price,
            product: {
                id: product_id,
                name: product_name,
            },
        };

        var transactionIndex = state.transactions.findIndex(function (item) {
            return item.status === "process";
        });

        if (transactionIndex !== -1) {
            state.transactions[transactionIndex].total =
                state.transactions[transactionIndex].total + parseFloat(price);
            localStorage.setItem(
                "transactions",
                JSON.stringify(state.transactions)
            );
        }
    } else {
        const uniqueId = generateUniqueId();
        createTransaction(
            uniqueId,
            getDateTime(),
            price,
            "process",
            state.sessionUser.username,
            state.sessionUser.name
        );
        cart = {
            transaction_id: uniqueId,
            quantity: quantity,
            price: price,
            product: {
                id: product_id,
                name: product_name,
            },
        };
    }

    listitemoncart.push(cart);
    localStorage.setItem("carts", JSON.stringify(listitemoncart));
    setState({ carts: JSON.stringify(listitemoncart) });
    return cart;
}

function removeItemFromCart(props) {
    data = state.carts.filter(
        (item) =>
            !(
                item.transaction_id === props.transactionId &&
                item.product.id === props.productId
            )
    );

    var transactionIndex = state.transactions.findIndex(function (item) {
        return item.id === props.transactionId;
    });

    if (transactionIndex !== -1) {
        state.transactions[transactionIndex].total =
            state.transactions[transactionIndex].total -
            parseFloat(props.productPrice);
        localStorage.setItem(
            "transactions",
            JSON.stringify(state.transactions)
        );
    }

    localStorage.setItem("carts", JSON.stringify(data));
}

// addtoCart(1, 2, 8000, 2, "Sosis Sapi");
// addtoCart(1, 2, 4000, 1, "Sosis Ayam");
// addtoCart(2, 2, 4000, 1, "Sosis Ayam");
// addtoCart(3, 2, 4000, 1, "Sosis Ayam");
// createTransaction(1, getDateTime(), 12000, 'process', "ferrypratama", "Ferry Agus Pratama");
// createTransaction(2, getDateTime(), 4000, 'process', "aizaa", "Endah Putri Yuniar");
// createTransaction(3, getDateTime(), 4000, 'done', "ferrypratama", "Ferry Agus Pratama");

products(
    1,
    "Sosis Ayam",
    2000,
    10,
    "https://picsum.photos/800/600",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit.Repellat nobis corporis dolore! Sapiente dolores dolore",
    getDateTime(),
    getDateTime()
);
products(
    2,
    "Sosis Sapi",
    4000,
    10,
    "https://picsum.photos/800/600",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit.Repellat nobis corporis dolore! Sapiente dolores dolore",
    getDateTime(),
    getDateTime()
);
products(
    3,
    "Sosis Babi",
    3500,
    10,
    "https://picsum.photos/800/600",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit.Repellat nobis corporis dolore! Sapiente dolores dolore",
    getDateTime(),
    getDateTime()
);
products(
    4,
    "Teh Rio",
    1000,
    10,
    "https://picsum.photos/800/600",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit.Repellat nobis corporis dolore! Sapiente dolores dolore",
    getDateTime(),
    getDateTime()
);
products(
    5,
    "Teh Gelas",
    1000,
    10,
    "https://picsum.photos/800/600",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit.Repellat nobis corporis dolore! Sapiente dolores dolore",
    getDateTime(),
    getDateTime()
);

function buttonComponent(props) {
    const button = document.createElement("button");
    button.type = props.type ?? "";
    button.id = props.id ?? "";
    button.className = props.classname ?? "";
    button.textContent = props.textcontent ?? "";

    return button;
}

function divComponent(props) {
    const div = document.createElement("div");
    div.id = props.id ?? "";
    div.className = props.classname ?? "";
    div.textContent = props.textcontent ?? "";
    return div;
}

function imageComponent(props) {
    const image = document.createElement("img");
    image.id = props.id ?? "";
    image.className = props.classname ?? "";
    image.setAttribute("src", props.src) ?? "";

    return image;
}

function inputComponent(props) {
    const input = document.createElement("input");
    input.id = props.id ?? "";
    input.className = props.classname ?? "";
    input.type = props.type ?? "";
    input.readOnly = props.readOnly ?? "";
    input.required = props.required ?? "";
    input.min = props.min ?? "";
    input.max = props.max ?? "";
    input.setAttribute("value", props.value ?? "");

    input.style.textAlign = "center";

    return input;
}

function cardProductComponent(props) {
    const colCardProduct = document.createElement("a");
    colCardProduct.style.textDecoration = "none";
    colCardProduct.style.cursor = "pointer";
    colCardProduct.style.color = "black";
    colCardProduct.style.transition = ".3s";
    colCardProduct.className = "col-lg-4 col-md-6 col-sm-6 col-12";

    colCardProduct.addEventListener("mouseenter", function (e) {
        colCardProduct.style.transform = "scale(1.01)";
        cardProduct.classList.add("shadow");
        cardProduct.classList.remove("shadow-sm");
    });

    colCardProduct.addEventListener("mouseleave", function (e) {
        colCardProduct.style.transform = "translateY(0px)";
        cardProduct.classList.add("shadow-sm");
        cardProduct.classList.remove("shadow");
    });

    const cardProduct = divComponent({ classname: "card shadow-sm p-0" });

    const cardHeaderProduct = divComponent({
        classname: 'card-header p-0 border-0"',
    });
    const imageProduct = imageComponent({
        classname: "img-fluid rounded-top",
        src: props.image,
    });

    const cardBody = divComponent({ classname: "card-body px-4" });
    const rowOnCardBody = divComponent({
        classname: "row d-flex justify-content-evenly",
    });
    const titleOnCardBody = divComponent({
        classname: "col-12 fw-bold fs-5 mb-2",
        textcontent: props.name,
    });
    const stockOnCardBody = divComponent({
        classname: "col text-start fst-italic small text-muted",
        textcontent: props.stock + " stock",
    });
    const priceOnCardBody = divComponent({
        classname: "col text-end fw-bold",
        textcontent: "IDR " + props.price,
    });

    const descOnCardBody = divComponent({
        classname: "description mt-2",
        textcontent: props.description,
    });
    descOnCardBody.style.textAlign = "justify";

    const cardFooter = divComponent({
        classname: "card-footer bg-light border-0 px-4 mb-3",
    });
    const childFirstCardFooter = divComponent({ classname: "d-flex" });

    const buttonMinOnCardFooter = buttonComponent({
        classname: "fs-5 btn btn-warning py-1 px-3 btn-minus disabled",
        textcontent: "-",
    });

    buttonMinOnCardFooter.addEventListener("click", function (e) {
        const cardElement = e.target.closest(".card");
        const inputElement = cardElement.querySelector(".qty");
        let inputValue = parseFloat(inputElement.value);
        if (inputValue > 1) {
            inputValue -= 1;
            inputElement.value = inputValue;
        }
        if (inputValue == 1) {
            buttonMinOnCardFooter.classList.add("disabled");
        }
    });

    const buttonPlusOnCardFooter = buttonComponent({
        classname: "fs-5 btn btn-warning py-1 px-3 btn-plus",
        textcontent: "+",
    });

    buttonPlusOnCardFooter.addEventListener("click", function (e) {
        const cardElement = e.target.closest(".card");
        const inputElement = cardElement.querySelector(".qty");
        let inputValue = parseFloat(inputElement.value);
        inputValue += 1;
        inputElement.value = inputValue;
        buttonMinOnCardFooter.classList.remove("disabled");
    });

    const inputQTYOnCardFooter = inputComponent({
        classname: "form-control mx-2 qty",
        type: "text",
        min: 1,
        value: 1,
        required: "required",
    });

    const childSecondCardFooter = divComponent({ classname: "d-grid mt-2" });
    const buttonAddToCart = buttonComponent({
        classname: "fs-5 btn btn-warning py-0",
        textcontent: "add to cart",
    });

    buttonAddToCart.addEventListener("click", (e) => {
        console.log(props);

        // const cardElement = e.target.closest(".card");
        // const inputElement = cardElement.querySelector(".qty");
        // let qtyValue = parseFloat(inputElement.value);
        // buttonAddToCart.setAttribute(
        //     "data-product",
        //     JSON.stringify({
        //         id: props.id,
        //         qty: qtyValue,
        //         price: props.price,
        //         name: props.name,
        //     })
        // );
        // // addtoCart(3, 2, 4000, 1, "Sosis Ayam");
        // const productData = JSON.parse(
        //     buttonAddToCart.getAttribute("data-product")
        // );
        // addtoCart(
        //     new_transaction.length > 0 ? new_transaction[0].id : null,
        //     productData.qty,
        //     productData.qty * productData.price,
        //     productData.id,
        //     productData.name
        // );

        // setState({ carts: JSON.stringify(listitemoncart) });
        // reloadPage();
    });

    // row list product

    childSecondCardFooter.append(buttonAddToCart);
    childFirstCardFooter.append(
        buttonMinOnCardFooter,
        inputQTYOnCardFooter,
        buttonPlusOnCardFooter
    );
    cardFooter.append(childFirstCardFooter, childSecondCardFooter);

    rowOnCardBody.append(
        titleOnCardBody,
        stockOnCardBody,
        priceOnCardBody,
        descOnCardBody
    );
    cardBody.append(rowOnCardBody);

    cardHeaderProduct.append(imageProduct);

    cardProduct.append(cardHeaderProduct, cardBody, cardFooter);
    colCardProduct.append(cardProduct);

    return colCardProduct;
}

function cardshoppingitem(props) {
    const item = divComponent({
        classname:
            "row w-100 mx-0 mb-3 align-items-center shadow-sm py-4 px-1 bg-light",
    });

    const colitemno = divComponent({
        classname: "col",
    });
    colitemno.style.flexGrow = "0";
    colitemno.textContent = "#" + props.no;

    const colitemqty = divComponent({
        classname: "col",
    });
    colitemqty.style.flexGrow = "1";
    colitemqty.innerHTML = `<input type="text" class="form-control form-control-sm mx-0 px-0 text-center" value="${props.qty}">`;

    const colitemname = divComponent({
        classname: "col",
    });
    colitemname.style.flexGrow = "4";
    colitemname.style.fontWeight = "bold";
    colitemname.textContent = props.name;

    const colitemprice = divComponent({
        classname: "col",
    });
    colitemprice.style.flexGrow = "2";
    colitemprice.style.fontWeight = "bold";
    colitemprice.textContent = `Rp. ${props.price}`;

    const colitemclose = divComponent({
        classname: "col",
    });
    colitemclose.style.flexGrow = "0";
    colitemclose.innerHTML =
        '<span class="badge bg-secondary px-2 rounded text-white del-item">x</span>';
    const delitembutton = colitemclose.querySelector(".del-item");
    delitembutton.style.cursor = "pointer";
    delitembutton.setAttribute(
        "data-product",
        JSON.stringify({
            transaction_id: props.transaction_id,
            id: props.id,
            price: props.price,
            name: props.name,
        })
    );
    // addtoCart(3, 2, 4000, 1, "Sosis Ayam");

    delitembutton.addEventListener("click", (e) => {
        const productData = JSON.parse(e.target.getAttribute("data-product"));
        // e.target.parentElement.parentElement.style.display = "none";
        // console.log(e.target.parentElement.parentElement);
        // console.log(productData.transaction_id);
        // console.log(productData.price);
        removeItemFromCart({
            transactionId: productData.transaction_id,
            productId: productData.id,
            productPrice: productData.price,
        });
        reloadPage();
    });

    item.append(colitemno, colitemqty, colitemname, colitemprice, colitemclose);

    return item;
}

function profilePage() {}

function adminPage() {}

function loginPage() {}

function detailTransactionPage() {}

function transactionPage() {}

function detailProductPage() {}

function manageProductPage() {
    return "a";
}


function homePage() {
    const row = document.createElement("div");
    row.className = "row d-flex justify-content-center";

    // Section List Product
    const sectionListProduct = divComponent({
        id: "section_listProduct",
        classname:
            "pt-3 pb-2 mb-3 col-lg-8 col-md-12 col-12 order-2 order-lg-1",
    });

    const rowFirst = divComponent({ classname: "row" });
    const buttonListCategories = divComponent({
        classname: "btn-toolbar mb-2 mb-md-0",
    });

    const buttonGroupListCategories = divComponent({
        classname: "btn-group me-2",
    });

    const buttonFood = buttonComponent({
        type: "button",
        classname: "btn btn-sm btn-outline-secondary px-4",
        textcontent: "Food",
    });

    const buttonDrink = buttonComponent({
        type: "button",
        classname: "btn btn-sm btn-outline-secondary px-4",
        textcontent: "Drink",
    });

    const buttonSnack = buttonComponent({
        type: "button",
        classname: "btn btn-sm btn-outline-secondary px-4",
        textcontent: "Snack",
    });

    // row group filter
    buttonGroupListCategories.append(buttonFood, buttonDrink, buttonSnack);
    buttonListCategories.append(buttonGroupListCategories);
    rowFirst.append(buttonListCategories);
    // row group filter

    const rowSecond = divComponent({
        classname: "row mt-3 gy-4",
        id: "listProduct",
    });

    state.products.forEach((e) => {
        const colCardProduct = cardProductComponent({
            id: e.id,
            name: e.name,
            stock: e.stock,
            price: e.price,
            image: e.image,
            description: e.description,
        });
        rowSecond.append(colCardProduct);
    });
    // row list product

    sectionListProduct.append(rowFirst, rowSecond);
    // Section list product

    // section transaction
    const sectionTransaction = divComponent({
        classname:
            "pt-3 pb-2 mb-3 col-lg-4 col-md-12 col-12 order-1 prder-lg-2 px-4",
    });

    const rowSectionTransaction = divComponent({
        classname: "row flex-column pt-3 shadow-sm rounded",
    });
    rowSectionTransaction.style.height = "90vh";

    const colListItem = divComponent({
        classname: "col bg-white rounded-top py-3 px-3",
        textcontent: "",
    });
    colListItem.style.flexGrow = "5";
    colListItem.style.overflow = "auto";

    const h1 = document.createElement("p");
    h1.className = "h4";
    h1.textContent = "Cart";

    colListItem.append(h1);
    // if (new_transaction[0]) {
    //     new_transaction[0].item.forEach((e, i) => {
    //         const rowItem = cardshoppingitem({
    //             no: i + 1,
    //             name: e.product.name,
    //             qty: e.quantity,
    //             price: e.price,
    //             transaction_id: e.transaction_id,
    //             id: e.product.id,
    //         });
    //         colListItem.append(rowItem);
    //     });
    // }

    if (state.transactions != null) {
        state.transactions.forEach((e) => {
            let new_item = [];
            if (
                e.admin.username == state.sessionUser.username &&
                e.status == "process"
            ) {
                if (state.carts) {
                    console.log(typeof state.carts);
                    console.log(state.carts);
                    state.carts.forEach((item, i) => {
                        if (item.transaction_id == e.id) {
                            const newItem = cardshoppingitem({
                                no: i + 1,
                                name: item.product.name,
                                qty: item.quantity,
                                price: item.price,
                                transaction_id: item.transaction_id,
                                id: item.product.id,
                            });
                            colListItem.append(newItem);
                        }
                    });
                }
            }
        });
    }

    // if(state.carts){
    //     state.carts.forEach((e, i) => {
    //         // if(e.){
    //                 const rowItem = cardshoppingitem({
    //                     no: i + 1,
    //                     name: e.product.name,
    //                     qty: e.quantity,
    //                     price: e.price,
    //                     transaction_id: e.transaction_id,
    //                     id: e.product.id,
    //                 });
    //                 colListItem.append(rowItem);
    //             // }
    //             });
    // }

    const colTotalItem = divComponent({
        classname: "col bg-light rounded-bottom py-2 mt-3",
    });
    colTotalItem.style.flexGrow = "2";
    colTotalItem.style.borderTop = "1px solid rgba(0,0,0, 0.15)";

    let subtotal = 0;
    if (state.transactions) {
        state.transactions.forEach((e) => {
            if (
                e.admin.username == state.sessionUser.username &&
                e.status == "process"
            ) {
                subtotal = e.total;
            }
        });
    }

    const rowSubTotal = divComponent({
        classname: "row d-flex justify-content-between mb-2",
        id: "rowsubtotal",
    });
    rowSubTotal.innerHTML = `<span class="col fw-bold flex-grow-0">Subtotal</span> <span class="col text-end fw-bold  flex-grow-1">Rp. ${subtotal}</span>`;

    const rowAmmount = divComponent({
        classname: "row d-flex justify-content-between align-items-end mb-2",
        id: "rowAmout",
    });
    rowAmmount.innerHTML = `<span class="col fw-bold flex-grow-0">Payable Amount</span> <span class="col text-end fw-bold h3 text-warning flex-grow-1">Rp. ${subtotal}</span>`;

    const rowPaid = divComponent({
        classname: "row d-flex justify-content-between align-items-end mb-2",
        id: "rowPaid",
    });
    rowPaid.innerHTML = `<span class="col fw-bold">Paid</span> <input type="text" class="form-control fs-4 paid col me-2 text-end fw-bold" id="payable-input" value="" placeholder="0">`;

    const rowButton = divComponent({
        classname: "row d-flex justify-content-between mx-0",
        id: "rowButton",
    });
    rowButton.innerHTML =
        '<button class="btn btn-danger col me-1" id="canceled" type="button">Canceled</button><button class="btn btn-warning col ms-1" id="process" type="button">Process</button>';

    const rowChange = divComponent({
        classname: "row d-flex justify-content-between align-items-end mb-2",
        id: "rowChange",
    });

    var textCOlor = "text-danger";
    var ismin = "-";
    if (subtotal <= 0) {
        textCOlor = "text-primary";
        ismin = "";
    }

    rowChange.innerHTML = `<span class="col fw-bold flex-grow-0">Change</span> <span class="col text-end fw-bold h3 ${textCOlor} flex-grow-1 span-change">Rp. ${subtotal}</span>`;

    colTotalItem.append(rowSubTotal, rowAmmount, rowPaid, rowChange, rowButton);
    document.addEventListener(
        "DOMContentLoaded",
        function () {
            const getRowPaid = document.getElementById("rowPaid");
            const selectInputAmount =
                getRowPaid.querySelector("#payable-input");
            const spanChange = document.querySelector(".span-change");
            const getButtonCancel = rowButton.querySelector("#canceled");
            const getButtonProcess = rowButton.querySelector("#process");

            getButtonCancel.addEventListener("click", (e) => {
                var transactionIndex = state.transactions.findIndex(function (
                    item
                ) {
                    return (
                        item.status === "process" &&
                        item.admin.username === state.sessionUser.username
                    );
                });

                if (transactionIndex !== -1) {
                    var cartIndex = state.carts.findIndex(function (e) {
                        return (
                            e.transaction_id ===
                            state.transactions[transactionIndex].id
                        );
                    });
                    if (cartIndex !== -1) {
                        state.carts[cartIndex] = [];
                        localStorage.setItem("carts", JSON.stringify([]));
                    }

                    state.transactions[transactionIndex] = [];
                    localStorage.setItem("transactions", JSON.stringify([]));
                }
                reloadPage();
            });

            getButtonProcess.addEventListener("click", (e) => {
                if (
                    selectInputAmount.value == null ||
                    selectInputAmount.value == "" ||
                    parseFloat(selectInputAmount.value) < parseFloat(subtotal)
                ) {
                    alert("Paid not enough");
                    selectInputAmount.focus();
                } else {
                    let confirm = confirm("finishing transaction ?");
                    if (confirm) {
                        var transactionIndex = state.transactions.findIndex(
                            function (item) {
                                return (
                                    item.status === "process" &&
                                    item.admin.username ===
                                        state.sessionUser.username
                                );
                            }
                        );
                        if (transactionIndex !== -1) {
                            state.transactions[transactionIndex].status =
                                "done";
                            localStorage.setItem(
                                "transactions",
                                JSON.stringify(state.transactions)
                            );
                        }
                        alert("Transaction Successed");
                        reloadPage();
                    }
                }
            });

            selectInputAmount.addEventListener("input", (e) => {
                spanChange.textContent =
                    parseFloat(subtotal) - parseFloat(selectInputAmount.value);
                if (spanChange.textContent <= 0) {
                    spanChange.classList.remove("text-danger");
                    spanChange.classList.add("text-success");
                    spanChange.textContent = spanChange.textContent * -1;
                } else {
                    spanChange.classList.remove("text-success");
                    spanChange.classList.add("text-danger");
                }
                if (selectInputAmount.value == "") {
                    spanChange.textContent = subtotal;
                }
                spanChange.textContent = "Rp. " + spanChange.textContent;
            });
        },
        false
    );

    rowSectionTransaction.append(colListItem, colTotalItem);
    sectionTransaction.append(rowSectionTransaction);

    row.append(sectionListProduct, sectionTransaction);

    return row;
}

function App() {
    const home = homePage();
    const detailProduct = detailProductPage();
    const manageProduct = manageProductPage();
    const transaction = transactionPage();
    const login = loginPage();
    const admin = adminPage();
    const profile = profilePage();

    if (state.hash == "#profile") {
        return profile;
    } else if (state.hash == "#admin") {
        return admin;
    } else if (state.hash == "#login") {
        return login;
    } else if (state.hash == "#transaction") {
        return transaction;
    } else if (state.hash == "#detailproducts") {
        return detailProduct;
    } else if (state.hash == "#manageproduct") {
        return manageProduct;
    } else {
        return home;
    }
}

function render() {
    sidebar();
    const root = document.getElementById("root");
    const app = App();

    root.innerHTML = "";
    root.append(app);
    return root;
}

render();
