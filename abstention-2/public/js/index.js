"use strict";

const templateTest = fetch('templates/folder-absention.ejs').then(value => {
    console.log(value.text().then(value => {
        const rendered = ejs.render(value, { votingHab: 100000, pcVotingHab: 35, pcMean: 30 });
        document.getElementById('container').innerHTML = rendered;
    }));
});
// const container = document.getElementById("container");

// const test = {
//     data: "hello"
// };
// loadTemplate('templates/sms.ejs', test).then(value => { container.innerHTML = value ;
// date();
// })

// async function loadTemplate(path, data) {
//     const fileExplorerTemplate = await fetch(path);
//     const fileExplorerHtml = await fileExplorerTemplate.text();
//     return ejs.render(fileExplorerHtml, data);
// }
