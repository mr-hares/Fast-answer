// ==UserScript==
// @name         R-RP | Быстрый ответ
// @namespace    http://tampermonkey.net/
// @version      2025-07-14
// @description  try to take over the world!
// @author       Louis Moretti | R-RP 07
// @match        https://forum.radmir.games/threads/*
// @icon         http://radmir.games/favicon.ico
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    const ANSWER = 23, GROUP = 24
    let buttons = [
        {
            "title": "Название", // Название группы/разделителя
            type: GROUP
        },
        {
            "title": "Название",
            "content": "Содержимое ответа, которое нужно вставить", // Текст, который будет вставлен в поле ввода. Примечание: для переноса на новую сроку используйте код "<br>", там где нужно начать новую строку.
            send: true/false, // Если true - то авто-отправка включена и наоборот
            type: ANSWER
        },
    ]

    function addButton(name, id) {
        $('.button.primary').before(
            `<button type="button" class="button" id="${id}" style="background-color: rgb(103, 103, 103); margin-right: 5px; font-family: 'Verdana'">${name}</button>`,
        );
    }

    document.querySelector('.button.primary').id = "send-button-answer"

    addButton("Быстрые ответы", "answers")

    function alert(buttons, title) {
        if (document.querySelector('.FastAnswer')) {
            document.querySelector('.FastAnswer').remove()
        }
        let container = document.createElement('div')
        let main = document.createElement('div')
        let title_main = document.createElement('h2')
        let primaryContent = document.createElement('div')
        let sectionFooter = document.createElement('div')
        let CloseButton = document.createElement('button')

        container.classList.add("FastAnswer")
        container.style = `display: none; top: 0; left: 0; position: absolute; z-index: 10000; box-sizing: border-box; width: ${document.documentElement.scrollWidth}px; height: ${document.documentElement.scrollHeight}px; background: rgba(0, 0, 0, 0.4);`

        main.style = "display: block; top: 100px; left: 763px; position: sticky; width: 90%; box-sizing: border-box; max-width: 690px; height: 200px"

        title_main.classList.add("heading")
        title_main.classList.add("overlayOnly")
        title_main.innerHTML = `<div style="display: flex; align-items: center;"><img src="https://forum.radmir.games/styles/rrp_summer/logo.png" style="width: 30px; height: 30px;"></img><span style="margin-left: 5px; font-family: 'Verdana'">${title}</span></div>`
        title_main.style = "font-size: 14px; color: #ffffff; background: rgb(255, 108, 0) url(styles/brivium/krypton/extra/cog-up-white.png) repeat-x 0 bottom; padding: 5px 10px; border: 0.5px solid rgba(255, 255, 255, 0.12); border-top-left-radius: 3px; border-top-right-radius: 3px; display: block!important;"

        primaryContent.classList.add("primaryContent")
        primaryContent.classList.add("messageContainer")
        primaryContent.classList.add("fastcontent")
        primaryContent.style = "background-color: rgb(255, 255, 255)!important;"

        CloseButton.id = "closefast"
        CloseButton.innerText = "Закрыть"
        CloseButton.classList.add("button")
        CloseButton.style = "background: #ffffff; margin-top: 5px; margin-right: 5px; color: #000000; width: 100%; border-raduis: 0px;!important; font-family: 'Verdana'"

        sectionFooter.classList.add("sectionFooter")
        sectionFooter.style = "border: 0.5px solid rgba(255, 255, 255, 0.12); padding: 5px; padding-top: 0; background: rgb(255, 108, 0) url(styles/brivium/krypton/extra/cog-up-white.png) repeat-x 0 bottom;"

        sectionFooter.appendChild(CloseButton)
        main.appendChild(title_main)
        main.appendChild(primaryContent)
        main.appendChild(sectionFooter)
        container.appendChild(main)
        document.body.appendChild(container)

        if (container.style.display == "none") {
            primaryContent.innerHTML = buttons
            container.style.display = "block"
        }

        $('button#closefast').click(() => {
            let div = document.querySelector('.FastAnswer')
            div.style.display = "none"
        })
    }

    $('button#answers').click(() => {
        alert(buttonMurkaps(buttons), "R-RP 07 | Быстрые ответы by Louis Moretti")
        buttons.forEach((btn, id) => {
            if(btn.type == 23) {
                $(`button#answers-${id}`).click(() => pasteContent(id));
            }
        });
    })

    function pasteContent(id) {
        $('button#closefast').trigger('click')
        $('.redactor_MessageEditor')[0].contentDocument.firstChild.lastChild.lastElementChild.innerHTML = buttons[id].content;
        if (buttons[id].send == true) {
            $('input#send-button-answer').trigger('click')
        }
    }

    function buttonMurkaps(buttons) {
        return buttons.map((btn, i) => {
            if (btn.type == 23) {
                return `<button type="button" class="button" id="answers-${i}" style="background-color: #ff6c00; margin-top: 5px; margin-right: 5px; color: #ffffff; border: 1px solid rgb(255, 108, 0); border-radius: 0px; font-family: 'Verdana';">${btn.title}</button>`
            } else {
                return `<button type="button" class="button" id="answers-${i}" style="width: 100%; display: flex; justify-content: space-between; background-color: #ff6c00; margin-top: 5px; margin-right: 5px; color: #ffffff; border: 1px solid rgb(255, 108, 0); border-radius: 0px; font-family: 'Verdana'"><span class="button-text">📌</span><span class="button-text">${btn.title}</span><span class="button-text">📌</span></button>`
            }
        }).join('')
    }


})();
