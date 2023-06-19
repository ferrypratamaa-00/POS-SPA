import { Header } from "../../component/header.js";
import { Sidebar } from "../../component/sidebar.js";
import { CreateComponent } from "../../component/createcomponent.js";
import { editProduct } from "../../component/processhandlers.js";
import { state } from "../../component/state.js";

function Content() {
    let product = state.products.filter(function (data) {
        return data.id == state.productid;
    });

    const id = (product && product[0])?.id || "";
    const name = (product && product[0])?.name || "";
    const price = (product && product[0])?.price || "";
    const stock = (product && product[0])?.stock || "";
    const description = (product && product[0])?.description || "";
    const photo = (product && product[0])?.photo || "";
    const create_at = (product && product[0])?.create_at || "";

    const form = CreateComponent("form", {
        className: "pt-3",
    });

    const inputName = CreateComponent("input", {
        type: "text",
        placeholder: "Product Name",
        required: true,
        className: "form-control mb-3",
        id: "productName",
        value: name,
    });

    const labelName = CreateComponent("label", {
        htmlFor: "productName",
        textContent: "Product Name:",
        className: "form-label",
    });

    const inputPrice = CreateComponent("input", {
        type: "number",
        placeholder: "Price",
        required: true,
        min: 0,
        className: "form-control mb-3",
        id: "productPrice",
        value: price,
    });

    const labelPrice = CreateComponent("label", {
        htmlFor: "productPrice",
        textContent: "Price:",
        className: "form-label",
    });

    const inputStock = CreateComponent("input", {
        type: "number",
        placeholder: "Stock",
        required: true,
        min: 0,
        className: "form-control mb-3",
        id: "productStock",
        value: stock,
    });

    const labelStock = CreateComponent("label", {
        htmlFor: "productStock",
        textContent: "Stock:",
        className: "form-label",
    });

    const inputDescription = CreateComponent("textarea", {
        placeholder: "Description",
        className: "form-control mb-3",
        id: "productDescription",
        rows: 4,
        textContent: description,
    });

    const labelDescription = CreateComponent("label", {
        htmlFor: "productDescription",
        textContent: "Description:",
        className: "form-label",
    });

    const inputPhoto = CreateComponent("input", {
        type: "text",
        placeholder: "Photo URL",
        className: "form-control mb-3",
        id: "productPhoto",
        value: photo,
    });

    const labelPhoto = CreateComponent("label", {
        htmlFor: "productPhoto",
        textContent: "Photo URL:",
        className: "form-label",
    });

    const btnSimpan = CreateComponent("button", {
        className: "btn btn-success",
        type: "submit",
        textContent: "Edit",
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const productId = id;
        const productName = inputName.value;
        const productPrice = inputPrice.value;
        const productStock = inputStock.value;
        const productDescription = inputDescription.value;
        const productPhoto = inputPhoto.value;
        const productCreate_At = create_at;

        if (productName.trim() === "") {
            alert("Please enter product name");
            return;
        }

        if (isNaN(productPrice) || productPrice <= 0) {
            alert("Please enter a valid price");
            return;
        }

        if (isNaN(productStock) || productStock < 0) {
            alert("Please enter a valid stock");
            return;
        }

        const isEdited = editProduct({
            productId: productId,
            productName: productName,
            productPrice: productPrice,
            productStock: parseInt(productStock),
            productPhoto: productPhoto,
            productDescription: productDescription,
            productCreate_At: productCreate_At,
        });

        if (isEdited) {
            alert("Product successfully edited");
        } else {
            alert("Failed to edit the product");
        }

        form.remove();
    });

    form.append(
        labelName,
        inputName,
        labelPrice,
        inputPrice,
        labelStock,
        inputStock,
        labelDescription,
        inputDescription,
        labelPhoto,
        inputPhoto,
        btnSimpan
    );
    setTimeout(() => {
        inputName.focus();
    }, 0);

    return form;
}

function Container() {
    const content = Content();

    const container = CreateComponent("div", {
        className: "container-fluid",
    });
    const row = CreateComponent("div", {
        className: "row",
    });
    const sidebar = Sidebar();
    const main = CreateComponent("main", {
        className: "col-md-9 ms-sm-auto col-lg-10 px-md-4",
    });

    container.append(row);
    row.append(sidebar, main);
    main.append(content);

    return container;
}

export function EditProductScreen() {
    const header = Header();
    const container = Container();

    const screen = CreateComponent("div", {
        className: "",
    });
    screen.append(header, container);

    return [screen];
}
