import { Header } from "../../component/header.js";
import { Sidebar } from "../../component/sidebar.js";
import { CreateComponent } from "../../component/createcomponent.js";
import { addProduct } from "../../component/processhandlers.js";

function Content() {
    const form = CreateComponent("form", {
        className: "pt-3",
    });

    const inputName = CreateComponent("input", {
        type: "text",
        placeholder: "Product Name",
        required: true,
        className: "form-control mb-3",
        id: "productName",
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
        value: "https://picsum.photos/800/600",
        readonly: "readonly",
    });

    const labelPhoto = CreateComponent("label", {
        htmlFor: "productPhoto",
        textContent: "Photo URL:",
        className: "form-label",
    });

    const btnSimpan = CreateComponent("button", {
        className: "btn btn-success",
        type: "submit",
        textContent: "Simpan",
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const productName = inputName.value;
        const productPrice = inputPrice.value;
        const productStock = inputStock.value;
        const productDescription = inputDescription.value;
        const productPhoto = inputPhoto.value;

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
        const isAdded = addProduct({
            productName: productName,
            productPrice: parseFloat(productPrice),
            productStock: parseInt(productStock),
            productPhoto: productPhoto,
            productDescription: productDescription,
        });

        if (isAdded) {
            alert("Product successfully added");
        } else {
            alert("Failed to add the product");
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

export function TambahProductScreen() {
    const header = Header();
    const container = Container();

    const screen = CreateComponent("div", {
        className: "",
    });
    screen.append(header, container);

    return [screen];
}
