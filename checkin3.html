<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="author" content="ZXing for JS">

    <title>ZXing TypeScript | Demo &amp; Examples</title>

    <link rel="preload" as="style" onload="this.rel='stylesheet';this.onload=null" href="https://fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic">
    <link rel="preload" as="style" onload="this.rel='stylesheet';this.onload=null" href="https://unpkg.com/normalize.css@8.0.0/normalize.css">
    <link rel="preload" as="style" onload="this.rel='stylesheet';this.onload=null" href="https://unpkg.com/milligram@1.3.0/dist/milligram.min.css">
</head>

<body>

    <main class="wrapper" style="padding-top:2em">

        <section class="container" id="demo-content">
            <h1 class="title">Scan barcode from Video Camera</h1>

            <div>
                <a class="button" id="startButton">Start</a>
                <a class="button" id="resetButton">Reset</a>
            </div>

            <div>
                <video id="video" width="600" height="400" style="border: 1px solid gray"></video>
            </div>

            <div id="sourceSelectPanel" style="display:none">
                <label for="sourceSelect">Change video source:</label>
                <select id="sourceSelect" style="max-width:400px">
                </select>
            </div>

            <label>Result:</label>
            <blockquote>
                <p id="result"></p>
            </blockquote>
        </section>
    </main>

    <script type="text/javascript" src="https://unpkg.com/@zxing/library@dev"></script>
    <script type="text/javascript">
        window.addEventListener('load', function () {
            const codeReader = new ZXing.BrowserBarcodeReader()
            console.log('ZXing code reader initialized')
            codeReader.getVideoInputDevices()
                .then((videoInputDevices) => {
                    const sourceSelect = document.getElementById('sourceSelect')
                    videoInputDevices.forEach((element) => {
                      const sourceOption = document.createElement('option')
                      sourceOption.text = element.label
                      sourceOption.value = element.deviceId
                      sourceSelect.appendChild(sourceOption)
                    });
                    sourceSelect.selectedIndex = 0;

                    if (videoInputDevices.length > 1) {
                        const sourceSelectPanel = document.getElementById('sourceSelectPanel')
                        sourceSelectPanel.style.display = 'block'
                    }

                    document.getElementById('startButton').addEventListener('click', () => {
                        const sourceSelect = document.getElementById('sourceSelect')
                        const devideId = sourceSelect[sourceSelect.selectedIndex].value
                        codeReader.decodeFromInputVideoDevice(devideId, 'video').then((result) => {
                            console.log(result)
                            document.getElementById('result').textContent = result.text
                        }).catch((err) => {
                            console.error(err)
                            document.getElementById('result').textContent = err
                        })
                        console.log(`Started continous decode from camera with id ${firstDeviceId}`)
                    })

                    document.getElementById('resetButton').addEventListener('click', () => {
                        document.getElementById('result').textContent = '';
                        codeReader.reset();

                        console.log('Reset.')
                    })

                })
                .catch((err) => {
                    console.error(err)
                })
        })
    </script>

</body>

</html>