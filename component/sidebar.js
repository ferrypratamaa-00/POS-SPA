import {link} from "./link.js";
import { CreateComponent } from "./createcomponent.js";

export function Sidebar() {
    const sidebar = CreateComponent("nav", {
        id: "sidebarMenu",
        className: "col-md-3 col-lg-2 d-md-block bg-light sidebar collapse",
    });

    const positionSidebar = CreateComponent("div", {
        className: "position-sticky pt-3",
    });

    const navUl = CreateComponent("ul", {
        className: "nav flex-column",
    });

    const li = CreateComponent("li", {
        className: "nav-item",
    });

    const dashboard = link({
        id: "dashboard",
        className: "nav-link",
        href: "#dashboard",
        textContent: "Dashboard",
    });

    const product = link({
        id: "product",
        className: "nav-link",
        href: "#product",
        textContent: "Product",
    });

    const report = link({
        id: "report",
        className: "nav-link",
        href: "#report",
        textContent: "Report",
    });

    li.append(dashboard, product, report);
    navUl.append(li);
    positionSidebar.append(navUl);

    sidebar.append(positionSidebar);

    return sidebar;
}
