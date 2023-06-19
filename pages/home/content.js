import { CreateComponent } from "../../component/createcomponent.js";
import { state } from "../../component/state.js";
import {
    transactionIsExist,
    addtoCart,
    removeItemFromCart,
    setPaid,
    processTransaction,
    cancelTransaction,
} from "../../component/processhandlers.js";
import { numberFormat } from "../../component/widget.js";

function CardProduct(props) {
    const dflex = CreateComponent("div", {
        className: "d-flex justify-content-between",
    });

    const cardColumn = CreateComponent("div", {
        className: "col-lg-4 col-md-12 col-12",
    });

    const card = CreateComponent("div", {
        className: "card rounded-top",
    });

    const cardHeader = CreateComponent("div", {
        className: "card-header p-0 bg-white",
    });

    const thumbnail = CreateComponent("img", {
        className: "img-fluid rounded-top",
        src: `${props.photo}`,
        alt: "product-photo",
    });

    const cardBody = CreateComponent("div", {
        className: "card-body",
    });

    const title = CreateComponent("p", {
        className: "fw-bold d-block mb-1",
        textContent: `${props.name}`,
    });

    const stock = CreateComponent("span", {
        className: "small",
        textContent: `Stock : ${props.stock}`,
    });

    const price = CreateComponent("span", {
        className: "",
        textContent: `Rp. ${numberFormat(props.price)}`,
    });

    const inputGroup = CreateComponent("div", {
        className: "input-group mt-2",
    });

    const buttonMin = CreateComponent("button", {
        className: "btn btn-warning fw-bold btnmin disabled",
        textContent: "-",
    });

    const buttonPlus = CreateComponent("button", {
        className: "btn btn-warning fw-bold btnplus",
        textContent: "+",
    });

    const inputQty = CreateComponent("input", {
        type: "text",
        value: "1",
        min: "1",
        className: "form-control text-center product-qty",
    });

    const buttonAddToCart = CreateComponent("button", {
        className: "btn btn-warning fw-bold mt-3 w-100 btnaddtocart",
        textContent: "add to cart",
        data_id: `${props.id}`,
    });

    dflex.append(stock, price);
    inputGroup.append(buttonMin, inputQty, buttonPlus);

    card.append(cardHeader, cardBody);
    cardHeader.append(thumbnail);
    cardBody.append(title, dflex, inputGroup, buttonAddToCart);

    cardColumn.append(card);

    // Start Event Listener

    buttonMin.addEventListener("click", (event) => {
        const cardElement = event.target.closest(".card");
        const inputElement = cardElement.querySelector(".product-qty");
        let inputValue = parseFloat(inputElement.value);
        if (inputValue > 1) {
            inputValue -= 1;
            inputElement.value = inputValue;
        }
        if (inputValue == 1) {
            buttonMin.classList.add("disabled");
        }
    });

    buttonPlus.addEventListener("click", (event) => {
        const cardElement = event.target.closest(".card");
        const inputElement = cardElement.querySelector(".product-qty");
        let inputValue = parseFloat(inputElement.value);
        inputValue += 1;
        inputElement.value = inputValue;
        buttonPlus.previousSibling.previousSibling.classList.remove("disabled");
    });

    buttonAddToCart.addEventListener("click", (event) => {
        const qty = parseInt(
            buttonAddToCart.previousSibling.querySelector(".product-qty").value
        );
        const productId = event.target.dataset.id;
        const product = state.products.find(
            (item) => item.id.toString() === productId.toString()
        );
        addtoCart({
            transaction_id: transactionIsExist() ?? null,
            quantity: qty,
            total: qty * product.price,
            product_id: product.id,
            product_name: product.name,
            product_price: product.price,
        });
    });

    // End Event Listener

    return cardColumn;
}

function cartItem(props) {
    const card = CreateComponent("div", {
        className: "card mb-2",
    });
    const cardBody = CreateComponent("div", {
        className: "card-body",
    });
    const row = CreateComponent("div", {
        className: "row d-flex align-items-start justify-content-between",
    });
    const colNo = CreateComponent("div", {
        className: "col-md-1 col-1",
        textContent: props.no + 1,
    });
    const colName = CreateComponent("div", {
        className: "col-md-6 col-6",
        textContent: `${props.product_name}`,
    });
    const colQty = CreateComponent("div", {
        className: "col-md-3 col-3",
    });
    const qty = CreateComponent("input", {
        className: "form-control form-control-sm text-center",
        name: "qty",
        type: "number",
        value: parseInt(props.quantity),
        min: 1,
    });
    const colBtnDelete = CreateComponent("div", {
        className: "col-md-2 col-2",
    });
    const btnDelete = CreateComponent("button", {
        className: "btn btn-sm btn-danger rounded",
        type: "button",
        textContent: "x",
    });
    const colShadow = CreateComponent("div", {
        className: "col-md-1 col-1",
    });
    const colDescription = CreateComponent("div", {
        className: "col-md-11 col-11 small text-muted fst-italic",
    });
    colDescription.innerHTML = `
    <span class="fw-bold">Rp. ${numberFormat(props.total)}</span>
    <span class="d-block small">
    Desc : 
        <span class="btn-detail badge small bg-warning" style="cursor: pointer">+</span>
    </span>
    <div class="detail-desc d-none">
        <span class="d-block small">Normal Price : Rp. ${numberFormat(
            props.product_price
        )}</span>
        <span class="d-block small">Total Price / <sub>item</sub> : Rp. ${numberFormat(
            props.total
        )} (${props.quantity} x Rp. ${numberFormat(props.product_price)})</span>
    </div>
    `;

    card.append(cardBody);
    cardBody.append(row);
    row.append(colNo, colName, colQty, colBtnDelete, colShadow, colDescription);
    colQty.append(qty);
    colBtnDelete.append(btnDelete);

    // Start Event Listener
    const btnDetail = colDescription.querySelector(".btn-detail");
    btnDetail.addEventListener("click", (event) => {
        btnDetail.textContent = "-";
        const detail = event.target.parentElement.nextElementSibling;
        btnDetail.classList.toggle("bg-warning");
        btnDetail.classList.toggle("bg-secondary");
        detail.classList.toggle("d-none");
    });

    btnDelete.addEventListener("click", (event) => {
        removeItemFromCart({
            transaction_id: props.transaction_id,
            total: props.total,
            product_id: props.product_id,
        });
    });
    // End Event Listener

    return card;
}

export function Content() {
    const sectionbox = CreateComponent("section", {
        className: "row d-flex mb-2",
    });

    const boxListProduct = CreateComponent("div", {
        className: "col-lg-8 col-md-6 col-12 pt-3 order-md-1 order-2",
    });

    const listProduct = CreateComponent("div", {
        className: "row gy-3",
        id: "listproduct",
    });

    const boxListCart = CreateComponent("div", {
        className: "col-lg-4 col-md-6 col-12 order-md-2 order-1",
    });

    const rowCart = CreateComponent("div", {
        className: "row bg-white flex-column mt-3 rounded",
        style: "height:90vh; background-color: transparent;",
    });

    const listCartItem = CreateComponent("div", {
        className: "col rounded-top py-3 px-3 flex-grow-1 shado-sm",
        style: "background-color:whitesmoke; overflow-y:auto",
    });

    const cartCalculation = CreateComponent("div", {
        className:
            "col bg-warning rounded-bottom py-2 mt-3 flex-grow-0 shadow-sm",
    });

    const subTotal = CreateComponent("div", {
        className: "row d-flex align-items-center mb-1",
    });

    const amount = CreateComponent("div", {
        className: "row d-flex align-items-center mb-1",
    });

    const paid = CreateComponent("div", {
        className: "row d-flex align-items-center mb-1",
    });

    const tools = CreateComponent("div", {
        className: "row d-flex align-items-center justify-content-evenly mt-4",
    });

    const btnProcess = CreateComponent("button", {
        className: "btn btn-primary col-5",
        id: "btn-process",
        textContent: "Process",
    });

    const btnCancel = CreateComponent("button", {
        className: "btn btn-danger col-5",
        id: "btn-cancel",
        textContent: "Cancel",
    });

    const paidLeft = CreateComponent("div", {
        className: "col-5",
    });

    const paidRight = CreateComponent("div", {
        className: "col-7",
    });

    const spanPaidLeft = CreateComponent("span", {
        className: "fw-bold",
        textContent: "Paid",
    });
    const spanPaidRight = CreateComponent("input", {
        className: "form-control text-end border-0 fw-bold",
        id: "paid",
        type: "text",
        min: 0,
        value: state.paid,
        placeholder: "0",
    });

    const subTotalLeft = CreateComponent("div", {
        className: "col-5",
    });

    const subTotalRight = CreateComponent("div", {
        className: "col-7 text-end",
    });

    const spanSubTotalLeft = CreateComponent("span", {
        className: "fw-bold",
        textContent: "Subtotal",
    });

    const spanSubTotalRight = CreateComponent("span", {
        className: "fw-bold fs-5",
    });

    const amountLeft = CreateComponent("div", {
        className: "col-5",
    });

    const amountRight = CreateComponent("div", {
        className: "col-7 text-end",
    });

    const spanAmountLeft = CreateComponent("span", {
        className: "fw-bold",
        textContent: "Amount",
    });

    const spanAmountRight = CreateComponent("span", {
        className: "fw-bold fs-5",
    });

    boxListProduct.append(listProduct);

    boxListCart.append(rowCart);

    rowCart.append(listCartItem, cartCalculation);

    cartCalculation.append(subTotal, amount, paid, tools);

    subTotal.append(subTotalLeft, subTotalRight);
    subTotalLeft.append(spanSubTotalLeft);
    subTotalRight.append(spanSubTotalRight);

    amount.append(amountLeft, amountRight);
    amountLeft.append(spanAmountLeft);
    amountRight.append(spanAmountRight);

    paid.append(paidLeft, paidRight);
    paidLeft.append(spanPaidLeft);
    paidRight.append(spanPaidRight);

    tools.append(btnCancel, btnProcess);

    sectionbox.append(boxListProduct, boxListCart);

    if (state.products) {
        state.products.forEach((data) => {
            const product = CardProduct({
                id: data.id,
                name: data.name,
                stock: data.stock,
                price: data.price,
                description: data.description,
                photo: data.photo,
            });
            listProduct.append(product);
        });
    }

    let totalTransaction = 0;
    let amountTransaction = "Rp." + numberFormat(0);
    if (state.transactions) {
        let existingTransaction = state.transactions.findIndex(function (item) {
            return (
                item.status === "process" &&
                item.admin.username === state.sessionUser.username
            );
        });

        if (existingTransaction >= 0) {
            totalTransaction = state.transactions[existingTransaction].total;
            amountTransaction = totalTransaction - state.paid;
            if (amountTransaction < 0) {
                amountTransaction =
                    "+ Rp." + numberFormat(-1 * amountTransaction);
            } else {
                amountTransaction = "Rp. " + numberFormat(amountTransaction);
            }

            if (state.carts) {
                state.carts.forEach((data, iteration) => {
                    if (
                        data.transaction_id ===
                        state.transactions[existingTransaction].id
                    ) {
                        const item = cartItem({
                            no: iteration,
                            transaction_id: data.transaction_id,
                            quantity: data.quantity,
                            total: data.total,
                            product_id: data.product.id,
                            product_name: data.product.name,
                            product_price: data.product.price,
                        });
                        listCartItem.append(item);
                    }
                });
            }
        }
        spanSubTotalRight.textContent = "Rp." + numberFormat(totalTransaction);
        spanAmountRight.textContent = amountTransaction;
    }
    // Start Event Listener

    const getPaidInput = paid.querySelector("input#paid");
    getPaidInput.addEventListener("input", () => {
        let paid = 0;
        if (getPaidInput.value != "") {
            paid = getPaidInput.value;
        }
        setPaid(paid);
    });

    btnProcess.addEventListener("click", (event) => {
        if (state.paid < totalTransaction) {
            alert("Paid not enough");
            getPaidInput.focus();
        } else {
            const konfirmasi = confirm("finishing transaction ?");
            if (konfirmasi) {
                processTransaction();
            }
        }
    });

    btnCancel.addEventListener("click", (event) => {
        cancelTransaction();
    });

    // End Event Listener

    return sectionbox;
}
