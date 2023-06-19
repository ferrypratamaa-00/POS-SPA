import { HomeScreen } from "../pages/home/homescreen.js";
import { ProductScreen } from "../pages/product/productscreen.js";
import { TambahProductScreen } from "../pages/product/tambahproductscreen.js";
import { EditProductScreen } from "../pages/product/editproductscreen.js";
import { ReportScreen } from "../pages/report/reportscreen.js";
import { state } from "./state.js";

function App() {
    const screens = {
        "#product": ProductScreen(),
        "#addproduct": TambahProductScreen(),
        "#editproduct": EditProductScreen(),
        "#report": ReportScreen(),
    };

    const activeScreen = screens[state.hash] || HomeScreen();

    return activeScreen;
}

export function render() {
    const root = document.getElementById("root");
    const app = App();

    const focusedElementId = document.activeElement.id;
    const focusedElementSelectionStart = document.activeElement.selectionStart;
    const focusedElementSelectionEnd = document.activeElement.selectionEnd;
    root.innerHTML = "";
    app.forEach((component) => {
        root.append(component);
    });

    if (state.hash === "#dashboard" || state.hash === "") {
        if (focusedElementId) {
            const focusedElement = document.getElementById(focusedElementId);
            focusedElement.focus();
            focusedElement.selectionStart = focusedElementSelectionStart;
            focusedElement.selectionEnd = focusedElementSelectionEnd;
        }
    }

    return root;
}
