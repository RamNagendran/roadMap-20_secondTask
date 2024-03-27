async function generateNoise(event) {    
    try {
        event.preventDefault();
        // getting values from the form fields...
        const red = document.getElementById('red').value;
        const green = document.getElementById('green').value;
        const blue = document.getElementById('blue').value;
        const numberOfTitles = document.getElementById('numberOfTitles').value;
        const tileSize = document.getElementById('tileSize').value;
        const borderWidth = document.getElementById('borderWidth').value;
        const colorMode = document.querySelector('input[name="colorMode"]:checked').value;

        const res = await fetch(`https://php-noise.com/noise.php?r=${red || 10}&g=${green || 10}&b=${blue || 10}&tiles=${numberOfTitles || 50}&tileSize=${tileSize || 7}&borderWidth=${borderWidth || 0}&mode=${colorMode || "brightness"}&json`)
        const jsonResult = await res.json();

        // apply api's result url to container background...
        const background = document.querySelector(".container-fluid")
        background.style.background = `url(${jsonResult.uri})`
    } catch (e) {
        console.error(e)
    }
}

function formContent() {
    return (
        `<form class="w-full mt-5" onsubmit="generateNoise(event)">
            <div class="form-compo">
                <label class="w-50">Red</label>
                <input id="red" class="w-50 input-style" placeholder="Red (0-255), default: 10" />
            </div>
            <div class="form-compo">
                <label class="w-50">Green</label>
                <input id="green" class="w-50 input-style" placeholder="Green (0-255), default: 10" />
            </div>
            <div class="form-compo">
                <label class="w-50">Blue</label>
                <input id="blue" class="w-50 input-style" placeholder="Blue (0-255), default: 10" />
            </div>
            <div class="form-compo">
                <label class="w-50">Number of titles</label>
                <input id="numberOfTitles" class="w-50 input-style" placeholder="Number of titles (1-50) default: 50" />
            </div>
            <div class="form-compo">
                <label class="w-50">Tilesize in px</label>
                <input id="tileSize" class="w-50 input-style" placeholder="Tile size in px (1-20) default: 7" />
            </div>
            <div class="form-compo">
                <label class="w-50">Borderwidth in px</label>
                <input id="borderWidth" class="w-50 input-style" placeholder="Borderwidth(grid) in px (0-15), default: 0" />
            </div>
            <div class="w-100 d-flex align-items-start justify-content-between">
                <label class="w-50">Color calculation mode</label>
                <div class="w-50 d-flex align-items-start flex-column">
                    <div>
                        <input type="radio" id="brightness" name="colorMode" value="brightness" checked />
                        <label for="brightness">Brightness<b><sup>1</sup></b><sub>(more shades of your color)</sub></label>
                    </div>
                    <div>
                        <input type="radio" id="around" name="colorMode" value="around" />
                        <label for="around">Around <sub>(more colorful)</sub></label>
                    </div>
                </div>
            </div>
            <input class="w-100 mt-4 noise-style" type="submit" value="Noise"></input>
        </form>`
    );
}

(async function () {
    const containerDiv = document.createElement('div');
    containerDiv.setAttribute('class', 'container-fluid');
    containerDiv.style.display = "flex";
    containerDiv.style.alignItems = "center";
    containerDiv.style.justifyContent = "center";
    containerDiv.style.height = '100vh';
    
    const rowDiv = document.createElement('div');
    rowDiv.setAttribute('class', 'row');
    rowDiv.style.width = '50%';
    const columnDiv = document.createElement('div');
    columnDiv.setAttribute('class', 'col-sm-12');

    const card = `
        <div class="card custom-card">
            <div class="card-body w-100">
                <h5 class="card-title" style="font-size: 25px;">Noise Background Image Generator</h5>
                ${formContent()}
            </div>
        </div>
    `;

    columnDiv.innerHTML = card;
    rowDiv.appendChild(columnDiv);
    containerDiv.appendChild(rowDiv);
    document.body.appendChild(containerDiv);
})();
