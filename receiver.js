const statusText = document.getElementById("status");
const startBtn = document.getElementById("startScanBtn");

let qrScanner = null;
const receivedChunks = {};

startBtn.addEventListener("click", async () => {

    statusText.innerText = "Starting camera...";

    try {

        qrScanner = new Html5Qrcode("reader");

        await qrScanner.start(
            {
                facingMode: "environment"
            },
            {
                fps: 10,
                qrbox: {
                    width: 250,
                    height: 250
                }
            },
            (decodedText) => {

                try {

                    const data = JSON.parse(decodedText);

                    receivedChunks[data.index] = data.data;

                    statusText.innerText =
                        `Received Chunk ${data.index} / ${data.total}`;

                    console.log(
                        `Chunk ${data.index}/${data.total} received`
                    );

                } catch {

                    statusText.innerText =
                        `Scanned: ${decodedText}`;

                    console.log(decodedText);
                }

            },
            (errorMessage) => {
                // ignore scan failures
            }
        );

    } catch (err) {

        console.error(err);

        statusText.innerText =
            "Camera Error: " + err;

    }

});