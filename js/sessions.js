
// Call to function with anonymous callback
loadJSON(function (response) {
    const rows = massageData(JSON.parse(response).feed.entry)
    const saturday = rows.filter(row => row.day === "Saturday");
    const sunday = rows.filter(row => row.day === "Sunday");
    createSessionList("Saturday", saturday);
    createSessionList("Sunday", sunday);

});

// see https://stackoverflow.com/a/34908037/5855010
function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'https://spreadsheets.google.com/feeds/cells/17EDt6Pu6xefcwT2C1UsYB7m0Ek-Vb1Us8Azfn3a_eso/1/public/full?alt=json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // .open will NOT return a value but simply returns undefined in async mode so use a callback
            callback(xobj.responseText);
        }
    }
    xobj.send(null);
}

function massageData(array) {
    const keys = array
        .filter(element => element.gs$cell.row === "1")
        .map(element => ({ keyName: element.content.$t, columnNumber: element.gs$cell.col }));

    const rows = array
        .filter(element => element.gs$cell.row !== "1")
        .reduce((acc, curr) => {
            if (typeof acc[curr.gs$cell.row] === 'undefined') {
                acc[curr.gs$cell.row] = {};
            }
            const key = keys.filter(el => el.columnNumber === curr.gs$cell.col).map(el => el.keyName);
            acc[curr.gs$cell.row][key] = curr.content.$t
            return acc
        }, [])
        .filter(row => row); // because we're using index numbers to fill the array, and we start at 2, the empty elements need to be filtered.

    return rows;
}

function createSessionList(dayId, sessions) {
    const dayElement = document.querySelector(`#${dayId}`);
    sessions.forEach(session => {
        let sessionElement = document.createElement('div');
        sessionElement.className = 'session';
        sessionElement.innerHTML = sessionTemplate(session);

        dayElement.appendChild(sessionElement);
    })

    function sessionTemplate(session) {
        const speakerLink = session.speakerLink ? `<a href="${session.speakerLink}" class="speaker-link">About this speaker</a>` : null;
        const slideLink = session.slideLink ? `<a href="${session.slideLink}" class="slides-link">Link to slides</a>` : null;
        const seperator = session.slideLink && session.speakerLink ? `<span> | </span>` : null;
        return sanitize`
        <div class="top" id="${session.id}">
            <div class="top-content">
                <div class="title"><h4 class="name">${session.name}</h4></div>
                <div class="time">${session.start} - ${session.end}</div>
                <div class="room">Room: ${session.room}</div>
            </div>
            <div class="top-control">
                <span class="plus">+</span><span class="minus">-</span>
            </div>
        </div>
        <div class="info">
            <p class="speaker">${session.speaker}</p>
            <p class="tags">Track: ${session.type}</p>
            ${speakerLink}
            ${seperator}
            ${slideLink}
            <p>${session.description}</p>
        </div>
        `;
    }

    function sanitize(strings, ...values) {
        const dirty = strings.reduce((prev, next, i) => {
            return `${prev}${next}${DOMPurify.sanitize(values[i])}`
        }, '');
        return dirty;
    }
}