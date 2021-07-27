import React, {Component, KeyboardEvent } from 'react';
import './ListEditor.css';

interface Props {}

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
             editor.focus();
         }
    };

    componentDidMount() {
        console.log("component mounted");
        this.focus();
    }

    handleKeyDown(e: KeyboardEvent) {
        if (e.key ==="Enter") {

            //this.refs.textInput.value = `${this.refs.textInput.value}\n${this.state.counter++}. `;
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
        console.log(e.target.value);
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

