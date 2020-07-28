import React, { Component } from 'react';

import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/plugins.pkgd.min.js';

import FroalaEditor from 'react-froala-wysiwyg';

import 'froala-editor/js/third_party/embedly.min.js';
import 'froala-editor/css/third_party/embedly.min.css';

import 'froala-editor/js/third_party/font_awesome.min.js';
import 'froala-editor/css/third_party/font_awesome.min.css';

import 'froala-editor/js/third_party/spell_checker.min.js';
import 'froala-editor/css/third_party/spell_checker.min.css';

import './plugins/customPlugin.js';
import './plugins/insert_html.js'
import './plugins/checklist.js'
import './plugins/checklist.scss'

import '../../scss/FroalaExample.scss';

class FroalaExample extends Component {


    constructor(props) {
        super(props);
        this.state = {
            model: '',//'Example text'
            editMode: false,
        };
        this.editorRef = React.createRef();
        this.savedText = '<h2><span style="white-space:pre-wrap;">Life : A Cosmic Project</span>&nbsp;</h2><p><span style="white-space:pre-wrap;"><strong><span style="font-size: 18px;">How much do we know about life?</span></strong></span><strong><span style="font-size: 18px;">&nbsp;</span></strong></p><p style="text-align: justify;"><span style="font-size: 14px;"><span style="white-space: pre-wrap;">Well, before we can answer this question. We need to understand how quickly we percieve the life which happen through our 5 primary senses. The chart below Information transmission rates of the senses shows how much information is processed by each of the five senses. </span> </span></p>'
    }
    componentDidMount() {
        
    }
    handleModelChange = (model) => {
        this.setState({
            model: model
        });
    }
    onSelect = () => {
        console.log('selected');
    }
    editText = () => {
        // this.editMode = true;
        this.setState({
            editMode: true
        });
        this.editorRef.current.editor.edit.on();
    }
    saveEditorText = () => {
        console.log("save");
        console.log(this.editorRef);
        this.setState({
            editMode: false
        });
        this.editorRef.current.editor.edit.off();
        this.editorRef.current.editor.save.save();
    }
    render() {
        const _self = this;
        const editorConfig = {
            placeholderText: 'Untitled Page',
            attribution: false,
            saveInterval: 0, // To disable auto save
            // indentMargin: 30,
            // theme: 'dark',
            // direction: 'rtl',
            // iconsTemplate: 'font_awesome_5',
            // pluginsEnabled: ['customPlugin'],
            quickInsertButtons: ['insertHtml', 'image', 'video', 'embedly', 'table', 'ul', 'ol', 'hr'],
            toolbarInline: true,
            toolbarButtons: {
                // [['embedly','html']],
                'moreText': {
                    'buttons': ['checklist','insertHtml','bold', 'italic', 'underline',
                                // 'strikeThrough', 'subscript', 'superscript', 
                                'fontFamily', 'fontSize', 'textColor', 'backgroundColor',
                                'inlineClass', 'inlineStyle', 'clearFormatting'],
                    'buttonsVisible': 2
                },
                'moreParagraph': {
                    'buttons': ['alignLeft', 'alignCenter', 'formatOLSimple', 
                                'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 
                                'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote'],
                    'buttonsVisible': 2
                },
                'moreRich': {
                    'buttons': ['insertLink', 'insertImage', 'insertVideo', 
                                'insertTable', 'emoticons', 'fontAwesome', 'specialCharacters', 
                                'embedly', 'insertFile', 'insertHR'],
                    'buttonsVisible': 2
                },
                'moreMisc': {
                    'buttons': ['undo', 'redo', 'fullscreen', 'print', 'getPDF', 'spellChecker', 
                                'selectAll', 'html', 'help'],
                    'align': 'right',
                    'buttonsVisible': 2
                }
            },
            events: {
                'initialized': function () {
                    // setTimeout(() => {
                    //     this.edit.off();
                    // }, 100);
                    console.log(this);
                    window.WEBSPELLCHECKER_CONFIG = {
                        autoSearch: true,
                        autoDestroy: true,
                        serviceId: "mfss5DUtocfEkwj"
                    };
                    window.WEBSPELLCHECKER.init({
                        container: this.el
                    });
                },
                'save.before': function (text) {
                    // Before save request is made.
                    console.log(text);
                    console.log(_self);

                },
            }
        };
        let button;
        if(_self.state.editMode) {
            button = <button onClick={_self.saveEditorText} type="button" className="btn btn-primary float-right">Save</button>;
        } else {
            button = <button onClick={_self.editText} type="button" className="btn btn-outline-primary float-right">Edit</button>;
        }
        return (
            <div>
                <div className="buttonsDiv">
                    {button}
                </div>
                <FroalaEditor
                    ref={_self.editorRef}
                    config={editorConfig}
                    model={_self.savedText}
                    onSelect={_self.onSelect}
                //   onModelChange={this.handleModelChange}
                />
            </div>
        )
    }
}

export default FroalaExample
