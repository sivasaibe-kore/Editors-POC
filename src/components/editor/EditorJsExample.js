import React, { Component } from 'react'

import EditorJs from 'react-editor-js';
// import { EDITOR_JS_TOOLS } from './tools'

import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import Paragraph from '@editorjs/paragraph'
import List from '@editorjs/list'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import Image from '@editorjs/image'
import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import SimpleImage from '@editorjs/simple-image'
import Underline from '@editorjs/underline'

class EditorJsExample extends Component {

    // const EDITOR_JS_TOOLS = {
    //     embed: Embed,
    //     table: Table,
    //     paragraph: Paragraph,
    //     list: List,
    //     warning: Warning,
    //     code: Code,
    //     linkTool: LinkTool,
    //     image: Image,
    //     raw: Raw,
    //     header: Header,
    //     quote: Quote,
    //     marker: Marker,
    //     checklist: CheckList,
    //     delimiter: Delimiter,
    //     inlineCode: InlineCode,
    //     simpleImage: SimpleImage,
    //     placeholder: 'Untitled Page',
    //     autoFocus: true
    // };


    render() {
        const EDITOR_JS_TOOLS = {
            embed: {
                class: Embed,
                inlineToolbar: true,
                config: {
                  services: {
                    youtube: true,
                    coub: true
                  }
                }
            },
            table: {
                class: Table,
                inlineToolbar: true,
            },
            paragraph: {
                class: Paragraph,
                inlineToolbar: true,
                config: {
                    placeholder: 'Edit here',
                }
            },
            list: {
                class: List,
                inlineToolbar: true,
            },
            warning: {
                class: Warning,
                inlineToolbar: true,
                // shortcut: 'CMD+SHIFT+W',
                config: {
                  titlePlaceholder: 'Title',
                  messagePlaceholder: 'Message',
                },
            },
            code: Code,
            linkTool: LinkTool,
            image: Image,
            raw: Raw,
            header: {
                class: Header,
                inlineToolbar: true,
            },
            quote: {
                class: Quote,
                inlineToolbar: true,
                // shortcut: 'CMD+SHIFT+O',
                config: {
                  quotePlaceholder: 'Enter a quote',
                },
            },
            marker: Marker,
            checklist: {
                class: CheckList,
                inlineToolbar: true,
            },
            delimiter: Delimiter,
            inlineCode: InlineCode,
            // simpleImage: SimpleImage,
            underline: Underline,
            placeholder: 'Untitled Page',
            autoFocus: true
        };
        // console.log(EDITOR_JS_TOOLS);
        return (
            <div>
                <EditorJs tools={EDITOR_JS_TOOLS} />
            </div>
        )
    }
}

export default EditorJsExample
