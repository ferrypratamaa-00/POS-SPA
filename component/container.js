import { CreateComponent } from "./createcomponent.js";
import { Sidebar } from "./sidebar.js";

export function Container() {
    const container = CreateComponent("div", {
        className: "container-fluid",
    });
    const row = CreateComponent("row", {
        className: "row",
    });
    const sidebar = Sidebar();
    const main = CreateComponent("main", {
        className: "col-md-9 ms-sm-auto col-lg-10 px-md-4",
    });
    row.append(sidebar, main);
    container.append(row);

    return container;
}