import React, {Component, KeyboardEvent } from 'react';
import './ListEditor.css';

interface Props {
    entry: string;
}

interface State {
    counter: number;
    text: string;
}

export class ListEditor extends Component<Props, State> {
    private textInput: React.RefObject<HTMLTextAreaElement>;
    constructor(props :any) {
        super(props);

        this.state = {
            counter: 2,
            text : "1. "
        }
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

    // right now it makes it ready only, which seems to be for current use case
    static getDerivedStateFromProps(props, state) {
        if (props.entry){
            let formattedText='';
            for (let i = 0; i < props.entry.length; i++) {
                formattedText = formattedText + (i+1) + '. ' + props.entry[i] + '\r\n';
            }

            return { text: formattedText };
        }
        return props.errors ? {errors: props.errors} : null;
    }


    getCounter(str: String){
        var ks = str.split(/\r?\n/);
        var lastLine = ks[ks.length-1].split(".");
        return +lastLine[0];
    }

    handleKeyDown(e: KeyboardEvent) {
        if (e.key ==="Enter") {

            this.setState({
                    counter : this.state.counter + 1
                }
            )
            this.setState({
                text: this.state.text + "\n" + this.state.counter + ". "
            })
            e.preventDefault();
            e.stopPropagation();
        }
    }

    handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
       // console.log(e.target.value);
        if (e.target.value === ""){
            this.setState({text: "1. ", counter: 2});
        }else
            this.setState({text: e.target.value});
    }

    render() {
        const text = this.state.text;

        return(
            <textarea
                ref={this.textInput}
                value={text}
                onKeyDown={this.handleKeyDown}
                onChange={this.handleChange}
                spellCheck="false"
            />
        )
    }

}

