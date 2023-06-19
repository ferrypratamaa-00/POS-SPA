import { CreateComponent } from "../../component/createcomponent.js";
import { setState, state } from "../../component/state.js";
import { link } from "../../component/link.js";
import { removeProduct } from "../../component/processhandlers.js";
import { numberFormat } from "../../component/widget.js";

function TableInModal() {
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
    const thName = CreateComponent("th", {
        className: "col",
        scope: "col",
        textContent: "Name",
    });
    const thQuantity = CreateComponent("th", {
        className: "col",
        scope: "col",
        textContent: "Quantity",
    });
    const thTotal = CreateComponent("th", {
        className: "col",
        scope: "col",
        textContent: "Total (quantity x price product)",
    });
    const tbody = CreateComponent("tbody", {
        className: "",
    });

    let listItemCartInTransaction = state.carts.filter((item) => {
        return item.transaction_id == state.transactionid;
    });

    listItemCartInTransaction.forEach((data, index) => {
        const trInTbody = CreateComponent("tr", {
            className: "",
        });

        const tdNo = CreateComponent("td", {
            className: "col",
            textContent: index + 1,
        });
        const tdName = CreateComponent("td", {
            className: "col",
            textContent: data.product.name,
        });

        const tdQuantity = CreateComponent("td", {
            className: "col",
            textContent: data.quantity,
        });

        const tdTotal = CreateComponent("td", {
            className: "col",
        });
        tdTotal.innerHTML = `<span class="fw-bold">Rp. ${numberFormat(
            data.total
        )}</span> <span class="small fst-italic">(${
            data.quantity
        } x Rp. ${numberFormat(data.product.price)})</span>`;

        trInTbody.append(tdNo, tdName, tdQuantity, tdTotal);
        tbody.append(trInTbody);
    });

    tableBox.append(table);

    table.append(thead, tbody);

    thead.append(trInThead);
    trInThead.append(thNo, thName, thQuantity, thTotal);

    return tableBox;
}

function modal() {
    const modal = CreateComponent("div", {
        className: "modal fade",
        id: "Modaldetail",
        data_bs_backdrop: "static",
        data_bs_keyboard: "false",
        tabindex: "_1",
        aria_labelledby: "staticBackdropLabel",
        aria_hidden: "true",
    });

    const modalDialog = CreateComponent("div", {
        className: "modal-dialog modal-lg modal-dialog-centered",
    });

    const modalContent = CreateComponent("div", {
        className: "modal-content",
    });

    const modalHeader = CreateComponent("div", {
        className: "modal-header",
    });

    const buttonClose = CreateComponent("button", {
        type: "button",
        class: "btn-close",
        data_bs_dismiss: "modal",
        aria_label: "Close",
    });
    buttonClose.addEventListener("click", () => {
        setState({ transactionid: 0 });
    });

    const modalBody = CreateComponent("div", {
        className: "modal-body",
    });

    modal.append(modalDialog);
    modalDialog.append(modalContent);
    modalContent.append(modalHeader, modalBody);
    modalHeader.append(buttonClose);
    modalBody.append(TableInModal());
    return modal;
}

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
    const thTransactionNumber = CreateComponent("th", {
        className: "col",
        scope: "col",
        textContent: "Transaction Number",
    });
    const thAdmin = CreateComponent("th", {
        className: "col",
        scope: "col",
        textContent: "Admin",
    });
    const thStatus = CreateComponent("th", {
        className: "col",
        scope: "col",
        textContent: "Status",
    });
    const thTotal = CreateComponent("th", {
        className: "col",
        scope: "col",
        textContent: "Total",
    });
    const thCreated = CreateComponent("th", {
        className: "col",
        scope: "col",
        textContent: "Created",
    });
    const thMenu = CreateComponent("th", {
        className: "col",
        scope: "col",
        textContent: "Menu",
    });

    const tbody = CreateComponent("tbody", {
        className: "",
    });

    state.transactions.forEach((transaction, index) => {
        const trInTbody = CreateComponent("tr", {
            className: "",
        });

        const tdNo = CreateComponent("td", {
            className: "col",
            textContent: index + 1,
        });

        const tdTransactionNumber = CreateComponent("td", {
            className: "col text-success fw-bold fst-italic",
            textContent: "#" + transaction.id,
        });

        const tdAdmin = CreateComponent("td", {
            className: "col",
            textContent: transaction.admin.name,
        });

        const tdStatus = CreateComponent("td", {
            className: "col",
        });
        tdStatus.innerHTML =
            '<span class="badge bg-success rounded-pill px-2">transaction.status</span>';

        const tdTotal = CreateComponent("td", {
            className: "col fw-bold",
            textContent: "Rp. " + numberFormat(transaction.total),
        });

        const tdCreated = CreateComponent("td", {
            className: "col",
            textContent: transaction.timestamp,
        });

        const tdMenu = CreateComponent("td", {
            className: "col",
        });

        const btnDetail = CreateComponent("button", {
            className: "btn btn-warning btn-sm rounded-pill",
            textContent: "Detail",
        });

        btnDetail.addEventListener("click", () => {
            setState({ transactionid: transaction.id });
            var myModal = new bootstrap.Modal(
                document.getElementById("Modaldetail"),
                {
                    keyboard: false,
                }
            );
            myModal.show();
        });

        tdMenu.append(btnDetail);

        trInTbody.append(
            tdNo,
            tdTransactionNumber,
            tdAdmin,
            tdStatus,
            tdTotal,
            tdCreated,
            tdMenu
        );
        tbody.append(trInTbody);
    });

    tableBox.append(table);

    table.append(thead, tbody);

    thead.append(trInThead);
    trInThead.append(
        thNo,
        thTransactionNumber,
        thAdmin,
        thStatus,
        thTotal,
        thCreated,
        thMenu
    );

    return tableBox;
}

export function Content() {
    const sectionbox = CreateComponent("section", {
        className: "row d-flex mb-2 pt-3 px-2 px-md-0",
    });

    const table = TableOfProduct();

    sectionbox.append(modal(), table);

    return sectionbox;
}
