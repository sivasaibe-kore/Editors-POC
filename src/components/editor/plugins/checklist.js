const FroalaEditor = require("froala-editor");
(function (FroalaEditor) {

    FroalaEditor.SVG['checklist'] = 'M7.5 15a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15zm0-2.394a5.106 5.106 0 1 0 0-10.212 5.106 5.106 0 0 0 0 10.212zm-.675-4.665l2.708-2.708 1.392 1.392-2.708 2.708-1.392 1.391-2.971-2.971L5.245 6.36l1.58 1.58z';
    // The custom popup is defined inside a plugin (new or existing).
    FroalaEditor.PLUGINS.checklist = function (editor) {

        function c(e) {
            for (; e.parentNode && e.parentNode != editor.el;) e = e.parentNode;
            return e
        }

        function insertChecklist() {
            var i, selectedBlocks = editor.selection.blocks();
            for (i = 0; i < selectedBlocks.length; i++) {
                selectedBlocks[i] = c(selectedBlocks[i]);
            }
            var div = editor.$(document.createElement("div"));
            div.addClass('fr-checklist');
            for (div.insertBefore(selectedBlocks[0]), i = 0; i < selectedBlocks.length; i++) {
                // div = editor.$(document.createElement("div"));
                div.append(checkbox());
                div.append(selectedBlocks[i]);
            }
        }

        function checkbox() {
            var span = editor.$(document.createElement("span"));
            span.addClass('fr-checkbox');
            console.log(span);
            return span[0];
        }

        // Methods visible outside the plugin.
        return {
            insertChecklist: insertChecklist
        }
    }

    // Define an icon and command for the button that opens the custom popup.
    FroalaEditor.DefineIcon('checklist', { NAME: 'check-square', SVG_KEY: 'checklist'})
    FroalaEditor.RegisterCommand('checklist', {
        title: 'Checklist',
        icon: 'checklist',
        undo: true,
        focus: true,
        // Buttons which are included in the editor toolbar should have the plugin property set.
        plugin: 'checklist',
        callback: function () {
            this.checklist.insertChecklist();
        }
    });

})(FroalaEditor);