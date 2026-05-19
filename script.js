let cart = [];

function addCustomPasta(){

    const massa =
        document.getElementById("massa").value;

    const molho =
        document.getElementById("molho").value;

    const tamanhoData =
        document.getElementById("tamanho")
        .value
        .split("|");

    const tamanho = tamanhoData[0];

    let preco =
        parseFloat(tamanhoData[1]);

    const quantidade =
        parseInt(
            document.getElementById("quantidade").value
        );

    const observacoes =
        document.getElementById("observacoes").value;

    const adicionais =
        document.querySelectorAll(
            '.checkbox-group input[type="checkbox"]:checked'
        );

    let adicionaisTexto = "";
    let adicionaisValor = 0;

    adicionais.forEach(item => {

        const dados = item.value.split("|");

        adicionaisTexto += `${dados[0]}, `;

        adicionaisValor +=
            parseFloat(dados[1]);
    });

    preco += adicionaisValor;

    const totalItem =
        preco * quantidade;

    const descricao =
`
🍝 ${massa}
Molho: ${molho}
Tamanho: ${tamanho}
Adicionais: ${adicionaisTexto || "Nenhum"}
Obs: ${observacoes || "Nenhuma"}
Qtd: ${quantidade}
`;

    cart.push({
        name: descricao,
        price: totalItem
    });

    updateCart();

    alert("Macarronada adicionada!");
}

function updateCart(){

    const cartItems =
        document.getElementById("cart-items");

    const cartTotal =
        document.getElementById("cart-total");

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(item => {

        total += item.price;

        cartItems.innerHTML += `
            <div class="cart-item">
                <strong>${item.name}</strong>
                <p>R$ ${item.price.toFixed(2)}</p>
            </div>
        `;
    });

    cartTotal.innerHTML =
        `Total: R$ ${total.toFixed(2)}`;
}

function finishOrder(){

    if(cart.length === 0){

        alert("Carrinho vazio!");
        return;
    }

    const nome =
        document.getElementById("nome").value;

    const telefone =
        document.getElementById("telefone").value;

    const rua =
        document.getElementById("rua").value;

    const numero =
        document.getElementById("numero").value;

    const bairro =
        document.getElementById("bairro").value;

    const cidade =
        document.getElementById("cidade").value;

    let mensagem =
`🍝 *NOVO PEDIDO* %0A%0A`;

    mensagem += `👤 ${nome}%0A`;
    mensagem += `📞 ${telefone}%0A%0A`;

    mensagem += `📍 ${rua}, ${numero}%0A`;
    mensagem += `${bairro} - ${cidade}%0A%0A`;

    let total = 0;

    cart.forEach(item => {

        mensagem += `${item.name}%0A`;
        mensagem += `💰 R$ ${item.price.toFixed(2)}%0A%0A`;

        total += item.price;
    });

    mensagem += `📦 TOTAL: R$ ${total.toFixed(2)}`;

    const telefoneLoja =
        "5586999999999";

    window.open(
        `https://wa.me/${telefoneLoja}?text=${mensagem}`,
        "_blank"
    );
}

/* MODAL */

let modalProduct = null;
let modalQuantity = 1;

function openModal(product){

    modalProduct = product;
    modalQuantity = 1;

    document.getElementById(
        "productModal"
    ).style.display = "flex";

    document.getElementById(
        "modalImage"
    ).src = product.image;

    document.getElementById(
        "modalTitle"
    ).innerText = product.name;

    document.getElementById(
        "modalDescription"
    ).innerText = product.description;

    document.getElementById(
        "modalPrice"
    ).innerText =
        `R$ ${product.price.toFixed(2)}`;

    document.getElementById(
        "modalQty"
    ).innerText = modalQuantity;
}

function closeModal(){

    document.getElementById(
        "productModal"
    ).style.display = "none";
}

function increaseQty(){

    modalQuantity++;

    document.getElementById(
        "modalQty"
    ).innerText = modalQuantity;
}

function decreaseQty(){

    if(modalQuantity > 1){

        modalQuantity--;

        document.getElementById(
            "modalQty"
        ).innerText = modalQuantity;
    }
}

function confirmModalProduct(){

    cart.push({
        name: `${modalProduct.name} x${modalQuantity}`,
        price: modalProduct.price * modalQuantity
    });

    updateCart();

    closeModal();
}