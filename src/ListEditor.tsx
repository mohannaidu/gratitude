import React, {Component, KeyboardEvent } from 'react';
import './ListEditor.css';


interface Props {
    entry: string;
    handleCallback: (arg: string) => void
}

interface State {
    counter: number;
    text: string;
}

export class ListEditor extends Component<Props, State> {
    private textInput: React.RefObject<HTMLTextAreaElement>;
    private prop;
    constructor(props :any) {
        super(props);
        this.prop  = this.props;

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
    static getDerivedStateFromProps(props) {
        if (props.entry){
            let formattedText=props.entry+ '\r\n';

            return { text: formattedText };
        }
        //props.handleCallback("Data from child");
        return props.errors ? {errors: props.errors} : null;
    }

    getTextAreaLineCounter(str: String){
        var ks = str.split(/\r?\n/);
        return ks.length+1;
    }

    handleKeyDown(e: KeyboardEvent) {
        if (e.key ==="Enter") {
            const lineCount = this.getTextAreaLineCounter(this.state.text);


            // checking if linecount is 1
            // if (lineCount == 1)
            //     db
            this.prop.handleCallback(this.state.text);
            this.setState({
                    counter : lineCount + 1
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

