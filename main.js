(function() {
    'use strict';
    let draggedEl,
        onDragStart,
        onDrag,
        onDragEnd,
        grabPointY,
        grabPointX,
        createNote,
        addNoteButton;

    onDragStart = function(e) {
        let boundingClientRect;
        if (e.target.className.indexOf("bar") === -1) {
            return false;
        }

        draggedEl = this;
        boundingClientRect = draggedEl.getBoundingClientRect();
        grabPointX = boundingClientRect.left - e.clientX;
        grabPointY = boundingClientRect.top - e.clientY;
    };

    onDrag = function(e) {
        if(!draggedEl) {
            return false;
        }
        let posX = e.clientX + grabPointX,
            posY = e.clientY + grabPointY;

        if (posX < 0) {
            posX = 0;
        }

        if (posY < 0) {
            posY = 0;
        }

        draggedEl.style.transform = "translate(" + posX + "px, " + posY + "px)";
    };

    onDragEnd = function() {
        draggedEl = null,
        grabPointX = null,
        grabPointY = null;
    };

    createNote = function() {
        let stickerEl = document.createElement("div"),
            barEl = document.createElement("div"),
            textareaEl = document.createElement("textarea"),
            transformCSSValue = "translate(" + Math.random() * 400 + "px, " + Math.random() * 400 + "px)";

        barEl.classList.add("bar");
        stickerEl.classList.add("sticker");
        stickerEl.style.transform = transformCSSValue;
        stickerEl.appendChild(barEl);
        stickerEl.appendChild(textareaEl);
        stickerEl.addEventListener("mousedown", onDragStart, false);
        document.body.appendChild(stickerEl);
    };

    addNoteButton = document.querySelector(".addNoteButton");
    addNoteButton.addEventListener("click", createNote, false);
    document.addEventListener("mousemove", onDrag, false);
    document.addEventListener("mouseup", onDragEnd, false);
})();