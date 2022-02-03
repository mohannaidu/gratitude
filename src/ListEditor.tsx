import React, {Component, KeyboardEvent} from 'react';
import './ListEditor.css';


interface Props {
    entry: string;
    handleCallback: (arg: string) => void;
    onEntryChange: (arg: string) => void
}

interface State {
    counter: number;
}

export class ListEditor extends Component<Props, State> {
    private textInput: React.RefObject<HTMLTextAreaElement>;
    constructor(props :any) {
        super(props);

        this.textInput = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }


    focus = () => {
         let editor = this.textInput.current;
         if (editor) {
             let val = editor.value;
             editor.focus();
             editor.value = "";
             editor.value= val;
         }
    };

    componentDidMount() {
        this.focus();
    }

    getTextAreaLineCounter(str: String){
        var ks = str.split(/\r?\n/);
        return ks.length;
    }

    handleKeyDown = (e: KeyboardEvent) => {
        if (e.key ==="Enter") {
            const lineCount = this.getTextAreaLineCounter(this.props.entry);

            this.props.handleCallback(this.props.entry);
            this.setState({
                    counter : lineCount +1
                }, () => {
                    this.props.onEntryChange(this.props.entry + "\n" + this.state.counter + ". ");
            });


            e.preventDefault();
            e.stopPropagation();
        }
    }

    handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
       // console.log(e.target.value);
        this.props.onEntryChange(e.target.value);
    }

    render() {
        return(
            <textarea
                ref={this.textInput}
                value={this.props.entry}
                onKeyDown={this.handleKeyDown}
                onChange={this.handleChange}
                spellCheck="false"
            />
        )
    }

}

