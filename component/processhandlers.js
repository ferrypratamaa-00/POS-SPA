import { generateUniqueId, getDateTime } from "./widget.js";
import { state, setState } from "./state.js";

/*
 *
 *   start event for home screen
 *
 */
export function transactionIsExist() {
    let transactionIsExist = null;
    if (state.transactions) {
        transactionIsExist = state.transactions.find((item) => {
            return (
                item.admin.username == state.sessionUser.username &&
                item.status == "process"
            );
        });
    }
    return transactionIsExist;
}

export function createTransaction(props) {
    let transaction = {
        id: props.id,
        timestamp: props.timestamp,
        total: props.total,
        status: props.status,
        admin: {
            username: props.admin_username,
            name: props.admin_name,
        },
    };
    const listTransaction = state.transactions ? [...state.transactions] : [];
    listTransaction.push(transaction);

    setState({ transactions: listTransaction });
}

export function addtoCart(props) {
    const listProduct = state.products ? [...state.products] : [];

    const productListinCart = state.carts ? [...state.carts] : [];

    const shoppingListInTransaction = state.transactions
        ? structuredClone(state.transactions)
        : [];

    let reStrockProduct = listProduct.findIndex(function (item) {
        return item.id === props.product_id;
    });
    if (reStrockProduct >= 0) {
        listProduct[reStrockProduct].stock =
            listProduct[reStrockProduct].stock - parseFloat(props.quantity);
        setState({ products: listProduct });
    }

    if (transactionIsExist()) {
        let existingTransaction = shoppingListInTransaction.findIndex(function (
            item
        ) {
            return item.status === "process" && item.admin.username;
        });
        if (existingTransaction >= 0) {
            shoppingListInTransaction[existingTransaction].total =
                shoppingListInTransaction[existingTransaction].total +
                parseFloat(props.total);

            setState({ transactions: shoppingListInTransaction });
        }

        let existingCart = productListinCart.findIndex(function (item) {
            return (
                item.transaction_id === props.transaction_id.id &&
                item.product.id === props.product_id
            );
        });

        if (existingCart >= 0) {
            productListinCart[existingCart].quantity =
                productListinCart[existingCart].quantity +
                parseFloat(props.quantity);
            productListinCart[existingCart].total =
                productListinCart[existingCart].total + parseFloat(props.total);
        } else {
            productListinCart.push({
                transaction_id: props.transaction_id.id,
                quantity: props.quantity,
                total: props.total,
                product: {
                    id: props.product_id,
                    name: props.product_name,
                    price: props.product_price,
                },
            });
        }
    } else {
        const uniqueId = generateUniqueId();
        createTransaction({
            id: uniqueId,
            timestamp: getDateTime(),
            total: props.total,
            status: "process",
            admin_username: state.sessionUser.username,
            admin_name: state.sessionUser.name,
        });
        productListinCart.push({
            transaction_id: uniqueId,
            quantity: props.quantity,
            total: props.total,
            product: {
                id: props.product_id,
                name: props.product_name,
                price: props.product_price,
            },
        });
    }

    setState({ carts: productListinCart });
}

export function removeItemFromCart(props) {
    // get data from localstorage
    const listProduct = state.products ? [...state.products] : [];

    const productListinCart = state.carts ? [...state.carts] : [];

    const shoppingListInTransaction = state.transactions
        ? structuredClone(state.transactions)
        : [];

    // filter product in cart with transaction id and product id
    let getStockProduct = productListinCart.filter(
        (item) =>
            item.transaction_id === props.transaction_id &&
            item.product.id === props.product_id
    );

    // filter product in list product by product id
    let reStrockProduct = listProduct.findIndex(function (item) {
        return item.id === props.product_id;
    });

    // change stock product in list product
    if (reStrockProduct >= 0) {
        listProduct[reStrockProduct].stock =
            listProduct[reStrockProduct].stock +
            parseFloat(getStockProduct[0].quantity);
        setState({ products: listProduct });
    }

    // filter product in cart. then, set to localstorage without data by result
    let deleteProductFromCart = productListinCart.filter(
        (item) =>
            !(
                item.transaction_id === props.transaction_id &&
                item.product.id === props.product_id
            )
    );
    setState({ carts: deleteProductFromCart });

    // filter transaction by status (process) and  username from admin
    let existingTransaction = shoppingListInTransaction.findIndex(function (
        item
    ) {
        return item.status === "process" && item.admin.username;
    });

    // change total transaction by filter transaction
    if (existingTransaction >= 0) {
        shoppingListInTransaction[existingTransaction].total =
            shoppingListInTransaction[existingTransaction].total -
            parseFloat(props.total);
    }

    // get data product in cart by transaction id
    let existingCart = state.carts.filter(
        (item) => item.transaction_id === props.transaction_id
    );

    if (existingCart.length === 0) {
        // delete transaction if lenght cart > 0
        let deleteTransaction = state.transactions.filter(function (item) {
            return item.id !== props.transaction_id;
        });
        setState({ transactions: deleteTransaction });
    } else {
        setState({ transactions: shoppingListInTransaction });
    }
}

export function processTransaction() {
    const shoppingListInTransaction = state.transactions
        ? structuredClone(state.transactions)
        : [];

    let existingTransaction = shoppingListInTransaction.findIndex(function (
        item
    ) {
        return (
            item.status === "process" &&
            item.admin.username === state.sessionUser.username
        );
    });

    if (existingTransaction >= 0) {
        shoppingListInTransaction[existingTransaction].status = "complete";

        setState({ transactions: shoppingListInTransaction });
    }
    setState({ paid: 0 });

    alert("Transaction Successed");
}

export function cancelTransaction() {
    let transactionId = state.transactions.filter(function (item) {
        return (
            item.status === "process" &&
            item.admin.username === state.sessionUser.username
        );
    });
    transactionId = transactionId[0].id;

    const listProduct = state.products ? [...state.products] : [];
    const productListInCart = state.carts ? [...state.carts] : [];
    const shoppingListInTransaction = state.transactions
        ? [...state.transactions]
        : [];

    // Mengembalikan kuantitas produk dalam keranjang
    const productsToRestore = productListInCart.filter(
        (item) => item.transaction_id === transactionId
    );
    for (const productToRestore of productsToRestore) {
        const productId = productToRestore.product.id;
        const quantityToRestore = parseFloat(productToRestore.quantity);

        const productIndex = listProduct.findIndex(
            (item) => item.id === productId
        );
        if (productIndex !== -1) {
            listProduct[productIndex].stock += quantityToRestore;
        }
    }

    // Menghapus produk dari keranjang berdasarkan ID transaksi
    const updatedCart = productListInCart.filter(
        (item) => item.transaction_id !== transactionId
    );

    // Menghapus transaksi berdasarkan ID transaksi
    const updatedTransactions = shoppingListInTransaction.filter(
        (item) => item.id !== transactionId
    );

    setState({
        products: listProduct,
        carts: updatedCart,
        transactions: updatedTransactions,
    });
}

export function setPaid(value) {
    setState({ paid: value });
}

/*
 *
 *   end event for home screen
 *
 */

/*
 *
 *   start event for product screen
 *
 */
export function addProduct(props) {
    const listProduct = state.products ? structuredClone(state.products) : [];

    const product = {
        id: generateUniqueId(),
        name: props.productName,
        price: props.productPrice,
        stock: props.productStock,
        photo: props.productPhoto,
        description: props.productDescription,
        create_at: getDateTime(),
        update_at: getDateTime(),
    };

    listProduct.push(product);

    setState({ products: listProduct });

    const isProductAdded = listProduct.some((item) => item.id === product.id);
    if (isProductAdded) {
        return 1;
    } else {
        return 0;
    }
}

export function editProduct(props) {
    const listProduct = state.products ? structuredClone(state.products) : [];

    let getProduct = listProduct.findIndex(function (item) {
        return item.id == props.productId;
    });

    if (getProduct >= 0) {
        listProduct[getProduct].id = props.productId;
        listProduct[getProduct].name = props.productName;
        listProduct[getProduct].price = props.productPrice;
        listProduct[getProduct].stock = props.productStock;
        listProduct[getProduct].photo = props.productPhoto;
        listProduct[getProduct].description = props.productDescription;
        listProduct[getProduct].create_at = props.productCreate_At;
        listProduct[getProduct].update_at = getDateTime();
    }

    setState({ products: listProduct });

    return getProduct >= 0;
}

export function removeProduct(props) {
    // get data from localstorage
    const listProduct = state.products ? structuredClone(state.products) : [];

    const getProduct = listProduct.filter((item) => {
        return item.id !== props.id;
    });

    setState({ products: getProduct });

    const isProductAdded = listProduct.some((item) => item.id === props.id);
    if (isProductAdded) {
        return 1;
    } else {
        return 0;
    }
}
/*
 *
 *   end event for product screen
 *
 */

/*
 *
 *   start event for report screen
 *
 */

/*
 *
 *   end event for report screen
 *
 */
