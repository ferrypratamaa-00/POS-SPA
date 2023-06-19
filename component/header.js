import { CreateComponent } from "./createcomponent.js";

export function Header() {
    const header = CreateComponent("header", {
        className:
            "navbar navbar-dark sticky-top bg-warning d-flex flex-md-nowrap py-2 px-0 shadow-sm",
    });

    const navBrand = CreateComponent("a", {
        className:
            "navbar-brand bg-warning text-dark col-md-3 col-lg-2 me-0 px-3",
        href: "#",
        textContent: "POS lite",
    });

    const navbarToggler = CreateComponent("button", {
        className: "navbar-toggler position-absolute d-md-none collapsed",
        type: "button",
        data_bs_toggle: "collapse",
        data_bs_target: "#sidebarMenu",
        aria_controls: "sidebarMenu",
        aria_expanded: "false",
        aria_label: "Toggle navigation",
    });

    const togglerIcon = CreateComponent("span", {
        className: "navbar-toggler-icon",
    });

    const navbarNav = CreateComponent("div", {
        className: "navbar-nav me-lg-0 me-5",
    });

    const navItem = CreateComponent("div", {
        className: "nav-item text-nowrap me-lg-3 me-4",
    });

    const navLink = CreateComponent("a", {
        className: "nav-link px-3 text-dark btn btn-sm btn-outline-dark small",
        textContent: "Sign Out",
    });

    navbarToggler.append(togglerIcon);
    navbarNav.append(navItem);
    navItem.append(navLink);

    header.append(navBrand, navbarToggler, navbarNav);

    return header;
}