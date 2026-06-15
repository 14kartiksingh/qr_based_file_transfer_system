const statusText = document.getElementById("status");
const startBtn = document.getElementById("startScanBtn");

startBtn.addEventListener("click", async () => {

    const html5QrCode = new Html5Qrcode("reader");

    try {

        await html5QrCode.start(
            { facingMode: "environment" },
            {
                fps: 10,
                qrbox: 250
            },
            (decodedText) => {
                statusText.innerText =
                    "Scanned: " + decodedText;

                console.log(decodedText);
            }
        );

    } catch (err) {

        console.error(err);
        statusText.innerText =
            "Camera Error";

    }

});