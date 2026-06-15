const imageInput = document.getElementById("imageInput");
const preview = document.getElementById("preview");
const info = document.getElementById("info");
const startBtn = document.getElementById("startBtn");

let imageBase64 = "";

imageInput.addEventListener("change", (e) => {

    const file = e.target.files[0];

    if (!file) return;

    preview.src = URL.createObjectURL(file);
    preview.style.display = "block";

    const reader = new FileReader();

    reader.onload = function () {

        imageBase64 = reader.result;

        const kb = (file.size / 1024).toFixed(2);

        const chunkSize = 300;

        const totalChunks =
            Math.ceil(imageBase64.length / chunkSize);

        info.innerHTML = `
            Name: ${file.name}<br>
            Size: ${kb} KB<br>
            Base64 Length: ${imageBase64.length}<br>
            Chunks Needed: ${totalChunks}
        `;

    };

    reader.readAsDataURL(file);

    startBtn.style.display = "inline-block";

});

startBtn.addEventListener("click", () => {

    preview.style.display = "none";
    info.style.display = "none";
    imageInput.style.display = "none";
    startBtn.style.display = "none";

    document
        .querySelector(".container")
        .classList.add("transfer-mode");

    const chunkSize = 300;

    const chunks = [];

    for (
        let i = 0;
        i < imageBase64.length;
        i += chunkSize
    ) {
        chunks.push(
            imageBase64.slice(i, i + chunkSize)
        );
    }

    const qrContainer =
        document.getElementById("qrcode");

    const chunkInfo =
        document.getElementById("chunkInfo");

    const qrSize =
        Math.min(window.innerWidth * 0.8, 500);

    let currentChunk = 0;

    const interval = setInterval(() => {

        if (currentChunk >= chunks.length) {

            clearInterval(interval);

            chunkInfo.innerText =
                "Transfer Complete";

            return;
        }

        const chunkData = JSON.stringify({
            index: currentChunk + 1,
            total: chunks.length,
            data: chunks[currentChunk]
        });

        qrContainer.innerHTML = "";

        // new QRCode(qrContainer, {
        //     text: chunkData,
        //     width: qrSize,
        //     height: qrSize
        // });

        const testData = JSON.stringify({
    index: 1,
    total: 1,
    data: "HELLO QR BEAM"
});

new QRCode(qrContainer,{
    text:testData,
    width:400,
    height:400
});
        chunkInfo.innerText =
            `Chunk ${currentChunk + 1} / ${chunks.length}`;

        currentChunk++;

    }, 500);

});