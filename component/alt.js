import { getDateTime } from "./widget.js";

let sessionUser = {
    username: "ferrypratama",
    name: "Ferry Agus Pratama",
};

sessionStorage.setItem("sessionUser", JSON.stringify(sessionUser));

function products(
    id,
    name,
    price,
    stock,
    photo,
    description,
    create_at,
    update_at
) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.description = description;
    this.photo = photo;
    this.create_at = create_at;
    this.update_at = update_at;
}

function saveProductsToLocalstorage(products) {
    const productsJSON = JSON.stringify(products);
    localStorage.setItem("products", productsJSON);
}

const product1 = new products(
    1,
    "Sosis Ayam",
    2000,
    10,
    "https://picsum.photos/800/600",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit.Repellat nobis corporis dolore! Sapiente dolores dolore",
    getDateTime(),
    getDateTime()
);
const product2 = new products(
    2,
    "Sosis Sapi",
    4000,
    10,
    "https://picsum.photos/800/600",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit.Repellat nobis corporis dolore! Sapiente dolores dolore",
    getDateTime(),
    getDateTime()
);
const product3 = new products(
    3,
    "Sosis Babi",
    3500,
    10,
    "https://picsum.photos/800/600",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit.Repellat nobis corporis dolore! Sapiente dolores dolore",
    getDateTime(),
    getDateTime()
);
const product4 = new products(
    4,
    "Teh Rio",
    1000,
    10,
    "https://picsum.photos/800/600",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit.Repellat nobis corporis dolore! Sapiente dolores dolore",
    getDateTime(),
    getDateTime()
);
const product5 = new products(
    5,
    "Teh Gelas",
    1000,
    10,
    "https://picsum.photos/800/600",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit.Repellat nobis corporis dolore! Sapiente dolores dolore",
    getDateTime(),
    getDateTime()
);
const product6 = new products(
    6,
    "Ceker Burung Unta",
    10000,
    10,
    "https://picsum.photos/800/600",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit.Repellat nobis corporis dolore! Sapiente dolores dolore",
    getDateTime(),
    getDateTime()
);
const product7 = new products(
    7,
    "Bakso Beranak Pinak",
    15000,
    10,
    "https://picsum.photos/800/600",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit.Repellat nobis corporis dolore! Sapiente dolores dolore",
    getDateTime(),
    getDateTime()
);

const productssavelist = [
    product1,
    product2,
    product3,
    product4,
    product5,
    product6,
    product7,
];

if (!localStorage.getItem("products")) {
    saveProductsToLocalstorage(productssavelist);
}
