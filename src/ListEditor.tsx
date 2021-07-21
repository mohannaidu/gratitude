import React, {Component} from 'react';
import { EditorState, ContentState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import htmlToDraft from 'html-to-draftjs';

interface Props {}

interface State {
    editorState: EditorState;
}

export class ListEditor extends Component<Props, State> {
    private editorRef: React.RefObject<Editor>;
    constructor(props :any) {
        super(props);
        const starterList = '<ol><li></li></ol>';
        const contentBlock = htmlToDraft(starterList);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const outputEditorState = EditorState.createWithContent(contentState);
            this.state = {
                editorState: outputEditorState
            };
        }
        this.editorRef = React.createRef<Editor>();

    }

    focus = () => {
        let editor = this.editorRef.current;
        if (editor) {
            editor.focusEditor();
        }
    };

    componentDidMount() {
        console.log("component mounted");
        this.focus();
    }

    onEditorStateChange = (editorState: EditorState) => {
        // console.log(editorState)
        this.setState({
            editorState
        });
    };

    render() {
        const { editorState } = this.state;
        return(
           <div>
            <Editor
                editorState={editorState}
                ref={this.editorRef}
                onEditorStateChange={this.onEditorStateChange}
                toolbarHidden={true}
            />
           </div>
        )
    }

}

