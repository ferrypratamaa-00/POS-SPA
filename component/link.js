import { setState } from "./state.js";
import { render } from "./route.js";
export function link(props) {
    const link = document.createElement("a");
    link.id = props.id;
    link.className = props.className;
    link.href = props.href;
    link.textContent = props.textContent;

    link.onclick = function (event) {
        event.preventDefault();
        const url = new URL(event.target.href);
        setState({ hash: url.hash });
        history.pushState(null, "", event.target.href);
        render();
    };

    return link;
}
