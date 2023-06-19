import { CreateComponent } from "../../component/createcomponent.js";
import { setState, state } from "../../component/state.js";
import { link } from "../../component/link.js";
import { removeProduct } from "../../component/processhandlers.js";

function TableOfProduct() {
    const tableBox = CreateComponent("div", {
        className: "table-responsive",
    });
    const table = CreateComponent("table", {
        className: "table table-striped table-sm",
    });
    const thead = CreateComponent("thead", {
        className: "",
    });

    const trInThead = CreateComponent("tr", {
        className: "",
    });

    const thNo = CreateComponent("th", {
        className: "col",
        scope: "col",
        textContent: "No",
    });
    const thPhoto = CreateComponent("th", {
        className: "col",
        scope: "col",
        textContent: "Photo",
    });
    const thName = CreateComponent("th", {
        className: "col",
        scope: "col",
        textContent: "Name",
    });
    const thPrice = CreateComponent("th", {
        className: "col",
        scope: "col",
        textContent: "Price",
    });
    const thStock = CreateComponent("th", {
        className: "col",
        scope: "col",
        textContent: "Stock",
    });
    const thMenu = CreateComponent("th", {
        className: "col",
        scope: "col",
        textContent: "Menu",
    });

    const tbody = CreateComponent("tbody", {
        className: "",
    });

    state.products.forEach((product, index) => {
        const trInTbody = CreateComponent("tr", {
            className: "",
        });

        const tdNo = CreateComponent("td", {
            className: "col",
            textContent: index + 1,
        });

        const tdPhoto = CreateComponent("td", {
            className: "col",
        });
        const imgPhoto = CreateComponent("img", {
            src: product.photo,
            alt: "Product Photo",
            className: "img-fluid",
            style: "max-width:100px",
        });
        tdPhoto.append(imgPhoto);

        const tdName = CreateComponent("td", {
            className: "col",
            textContent: product.name,
        });

        const tdPrice = CreateComponent("td", {
            className: "col",
            textContent: product.price,
        });

        const tdStock = CreateComponent("td", {
            className: "col",
            textContent: product.stock,
        });

        const tdMenu = CreateComponent("td", {
            className: "col",
        });

        const btnEdit = link({
            id: "",
            className: "btn btn-primary btn-sm me-2",
            href: "#editproduct",
            textContent: "Edit",
        });

        btnEdit.addEventListener("click", () => {
            setState({ productid: product.id });
        });

        const btnDelete = CreateComponent("button", {
            className: "btn btn-danger btn-sm",
            textContent: "Delete",
        });
        btnDelete.addEventListener("click", () => {
            const isDeleted = removeProduct({ id: product.id });

            if (isDeleted) {
                alert("Product successfully deleted");
            } else {
                alert("Failed to delete the product");
            }
        });

        tdMenu.append(btnEdit, btnDelete);

        trInTbody.append(tdNo, tdPhoto, tdName, tdPrice, tdStock, tdMenu);
        tbody.append(trInTbody);
    });

    tableBox.append(table);

    table.append(thead, tbody);

    thead.append(trInThead);
    trInThead.append(thNo, thPhoto, thName, thStock, thPrice, thMenu);

    return tableBox;
}

export function Content() {
    const sectionbox = CreateComponent("section", {
        className: "row d-flex mb-2 pt-3 px-2 px-md-0",
    });
    const btnTambah = link({
        id: "addproduct",
        className: "btn btn-primary col-lg-2 col-md-4 col-6",
        href: "#addproduct",
        textContent: "Add Product",
    });

    // btnTambah.addEventListener("click", () => {
    //     window.location.href = "#tambahproduct";
    // });

    const table = TableOfProduct();

    sectionbox.append(btnTambah, table);

    return sectionbox;
}
