export function CreateComponent(component, props) {
    const parent = document.createElement(component);

    if (props.textContent != null) {
        parent.textContent = props.textContent;
    }

    if (props.id != null) {
        parent.id = props.id;
    }

    if (props.className != null) {
        parent.className = props.className;
    }

    for (const key in props) {
        if (
            props.hasOwnProperty(key) &&
            key !== "textContent" &&
            key !== "id" &&
            key !== "className"
        ) {
            parent.setAttribute(key.replace(/_/g, "-"), props[key]);
        }
    }

    return parent;
}