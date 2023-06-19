import { Header } from "../../component/header.js";
import { Sidebar } from "../../component/sidebar.js";
import { Content } from "./content.js";
import { CreateComponent } from "../../component/createcomponent.js";

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

export function ReportScreen() {
    const header = Header();
    const container = Container();

    return [header, container];
}
