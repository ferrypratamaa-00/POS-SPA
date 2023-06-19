import { render } from "./route.js";

export let state = {
    productid:
        localStorage.getItem("productid") ??
        localStorage.setItem("productid", 0),
    transactionid:
        localStorage.getItem("transactionid") ??
        localStorage.setItem("transactionid", 0),
    paid: localStorage.getItem("paid") ?? localStorage.setItem("paid", 0),
    transactions: JSON.parse(localStorage.getItem("transactions")) ?? null,
    carts: JSON.parse(localStorage.getItem("carts")) ?? null,
    products: JSON.parse(localStorage.getItem("products")) ?? null,
    categories: localStorage.getItem("categories") ?? null,
    hash: location.hash,
    sessionUser: JSON.parse(sessionStorage.getItem("sessionUser")),
};

export function setState(newState) {
    const prevState = { ...state };
    const nextState = { ...state, ...newState };
    state = nextState;
    render();
    onChangeState(prevState, nextState);
}

export function onChangeState(prevState, nextState) {
    if (prevState.carts != nextState.carts) {
        localStorage.setItem("carts", JSON.stringify(nextState.carts));
    }

    if (prevState.transactions != nextState.transactions) {
        localStorage.setItem(
            "transactions",
            JSON.stringify(nextState.transactions)
        );
    }

    if (prevState.products != nextState.products) {
        localStorage.setItem("products", JSON.stringify(nextState.products));
    }

    if (prevState.paid != nextState.paid) {
        localStorage.setItem("paid", nextState.paid);
    }

    if (prevState.productid != nextState.productid) {
        localStorage.setItem("productid", nextState.productid);
    }

    if (prevState.transactionid != nextState.transactionid) {
        localStorage.setItem("transactionid", nextState.transactionid);
    }

    if (prevState.hash !== nextState.hash) {
        history.replaceState(null, "", nextState.hash);
        setState({ productid: 0 });
    }
}
