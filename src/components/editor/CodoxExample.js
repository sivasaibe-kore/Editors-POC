import React, { Component } from 'react';

import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/plugins.pkgd.min.js';

import FroalaEditor from 'react-froala-wysiwyg';

const codox = window.Codox;
class CodoxExample extends Component {


    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            model: ''//'Example text'
        };
        this.editor = React.createRef();
    }
    // componentDidMount() {
    //     const script = document.createElement("script");
    //     script.src = "src/assets/js/customPlugin.js";
    //     document.body.appendChild(script);
    //   }
    componentWillUnmount() {
        //leave the session
        if (this.codox) {
            this.codox.stop();
        }
    }
    initializeCodox = () => {

    }
    setEditorConfig = () => {
        var _self = this;
        if (_self.codox) {
            _self.codox.stop();
        }
        _self.codox = new codox();
    }
    handleModelChange = (model) => {
        this.setState({
            model: model
        });
    }
    clickHandler = () => {
        // console.log(this.editor.current.POPUP_TEMPLATES);
    } 
    render() {
        var _self = this;
        _self.setEditorConfig();

        const editorConfig = {
            placeholderText: 'Edit Your Content Here',
            attribution: false,
            // theme: 'dark',
            // pluginsEnabled: ['customPlugin'],
            // direction: 'rtl',
            toolbarInline: true,
            events: {
                'initialized': function () {
                    var config = {
                        "app": "froala",
                        "docId": "mydoc",
                        "username": _self.props.name,
                        "editor": this,
                        "apiKey": "58e429b0-be4a-4cd8-8c8d-9a37fb0adec0",
                    };
                    setTimeout(() => {
                        _self.codox.init(config);
                    }, 100);
                }
            }
        };
        return (
            <>
                {/* <button onClick={this.clickHandler}>Click</button> */}
                <FroalaEditor
                    ref={this.editor}
                    config={editorConfig}
                    model={this.state.model}
                    // onModelChange={this.handleModelChange} causes error in co-editing
                />
            </>
        )
    }
}

export default CodoxExample
