const FroalaEditor = require("froala-editor");
(function (FroalaEditor) {
    // Define popup template.
    Object.assign(FroalaEditor.POPUP_TEMPLATES, {
        'insertHtml.popup': '[_BUTTONS_][_CUSTOM_LAYER_]'
    });

    // Define popup buttons.
    Object.assign(FroalaEditor.DEFAULTS, {
        insertHtmlButtons: ['hidePopup', "|"],
    });

    // The custom popup is defined inside a plugin (new or existing).
    FroalaEditor.PLUGINS.insertHtml = function (editor) {
        // Create custom popup.
        function initPopup() {
            // Load popup template.
            // var template = FroalaEditor.POPUP_TEMPLATES.customPopup;
            // if (typeof template == 'function') template = template.apply(editor);

            // Popup buttons.
            var popup_buttons = '';

            // Create the list of buttons.
            if (editor.opts.insertHtmlButtons.length > 1) {
                popup_buttons += '<div class="fr-buttons">';
                popup_buttons += editor.button.buildList(editor.opts.insertHtmlButtons);
                popup_buttons += '</div>';
            }

            console.log(editor);
            var popup_body = `<div class="fr-insert-html-layer fr-layer fr-active" id="fr-insert-html-layer${editor.id}" data-mouseenter-event-set="true"> \
                                <div class="fr-input-line"> \
                                    <textarea id="fr-insert-html-layer-text-1" type="text" placeholder="" tabindex="1" rows="5" aria-required="true" dir="auto" class=""></textarea> \
                                    <label for="fr-insert-html-layer-text-1">Enter the Html</label> \
                                </div> \
                                <div class="fr-action-buttons"> \
                                    <button type="button" class="fr-command fr-submit" data-cmd="htmlInsert" tabindex="2" role="button">Insert</button> \
                                </div> \
                            </div>`;
            // Load popup template.
            var template = {
                buttons: popup_buttons,
                custom_layer: popup_body
            };

            // Create popup.
            var $popup = editor.popups.create('insertHtml.popup', template);

            return $popup;
        }

        // Show the popup
        function showPopup(container) {
            var $popup = editor.popups.get('insertHtml.popup');

            if (!$popup) $popup = initPopup();

            $popup.find('.fr-insert-html-layer textarea[type="text"]').val('');
            var left, top, height;
            if(container == 'toolbar') {
                editor.popups.setContainer('insertHtml.popup', editor.$tb);
                var $btn = editor.$tb.find('.fr-command[data-cmd="insertHtml"]');
                left = $btn.offset().left + $btn.outerWidth() / 2;
                top = $btn.offset().top + (editor.opts.toolbarBottom ? 10 : $btn.outerHeight() - 10);
                height = $btn.outerHeight();
            } else {
                editor.popups.setContainer('insertHtml.popup', editor.$box);
                var pos = editor.position.getBoundingRect();
                console.log(pos);
                left = pos.left;
                top = pos.top - 100;
                height = pos.height;
            }
            editor.popups.show('insertHtml.popup', left, top, height);
        }

        // Hide the custom popup.
        function hidePopup() {
            editor.popups.hide('insertHtml.popup');
        }

        function htmlInsert(param) {
            console.log(editor);
            // console.log(param);
            var text = editor.popups.get("insertHtml.popup").find('.fr-insert-html-layer textarea[type="text"]').val() || "";
            console.log(text);
            editor.html.insert(text, true);
            editor.popups.hide('insertHtml.popup');
            // editor.cursor.enter(false);
            // editor.undo.saveStep();
        }

        // Methods visible outside the plugin.
        return {
            showPopup: showPopup,
            hidePopup: hidePopup,
            htmlInsert: htmlInsert
        }
    }

    // Define an icon and command for the button that opens the custom popup.
    FroalaEditor.DefineIcon('insertHtml', { NAME: 'plus', SVG_KEY: 'add'})
    FroalaEditor.RegisterCommand('insertHtml', {
        title: 'Insert Html',
        icon: 'insertHtml',
        undo: false,
        focus: false,
        popup: true,
        // Buttons which are included in the editor toolbar should have the plugin property set.
        plugin: 'insertHtml',
        callback: function () {
            if (!this.popups.isVisible('insertHtml.popup')) {
                this.insertHtml.showPopup('toolbar');
            }
            else {
                if (this.$el.find('.fr-marker')) {
                    this.events.disableBlur();
                    this.selection.restore();
                }
                this.popups.hide('insertHtml.popup');
            }
        }
    });
    // Popup close button
    FroalaEditor.DefineIcon('hidePopup', { NAME: 'arrow-left', SVG_KEY: 'back' });
    FroalaEditor.RegisterCommand('hidePopup', {
        title: 'Back',
        undo: false,
        focus: false,
        callback: function () {
            this.insertHtml.hidePopup();
        }
    });

    FroalaEditor.RegisterCommand("htmlInsert", {
        undo: true,
        focus: true,
        callback: function () {
            this.insertHtml.htmlInsert()
        }
    });

    FroalaEditor.RegisterQuickInsertButton("insertHtml", {
        icon: "insertHtml",
        requiredPlugin: "insertHtml",
        title: "Insert Html",
        callback: function () {
            this.insertHtml.showPopup('quickinsert')
        }
    });
})(FroalaEditor);