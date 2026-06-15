const statusText = document.getElementById("status");
const startBtn = document.getElementById("startScanBtn");

const receivedChunks = {};

startBtn.addEventListener("click", () => {

    const qrScanner = new Html5Qrcode("reader");

    qrScanner.start(
        { facingMode: "environment" },
        {
            fps: 10,
            qrbox: 250
        },

        (decodedText) => {

            try {

                const data = JSON.parse(decodedText);

                receivedChunks[data.index] = data.data;

                statusText.innerText =
                    `Received Chunk ${data.index} / ${data.total}`;

                console.log(
                    `Chunk ${data.index} received`
                );

            } catch (err) {

                console.log("Invalid QR");

            }

        },

        (errorMessage) => {
            // ignore
        }

    );

});