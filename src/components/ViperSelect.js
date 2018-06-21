import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import convertDate from "../helpers/dateConverter";

const FilterInput = styled.input`
    margin: 0px;
    border: 0px;
    flex:1;
`;

const ViperSelectWrapper = styled.div`
    padding:2px;
    flex:1;
    min-height:20px;
`;

const Title = styled.div`
color: #4c4c4c;
font-size: 12px;
margin-bottom: 4px;
`;

const ViperSelectBoxWrapper = styled.div`
display: flex;
flex-direction: column;
border: 1px solid #e5e5e5;
border-radius: 3px;
background-color:white;
`;

const ViperSelectBox = styled.div`
display:flex;
flex-direction: row;
padding:4px;
justify-content: space-between;
flex:1;
min-height:20px;
`;

const DropdownIconContainer = styled.div`
    width: 20px;
    display:flex;
    align-items: center;
    justify-content: center;
`;

const DropdownEntriesContainer = styled.div`
border: 1px solid #e5e5e5;
border-radius: 3px;
border-top-left-radius:0px;
border-top-right-radius:0px;
max-height:200px;
overflow-y: scroll;
background-color:white;
position:absolute;
z-index: 10;
`;

const DropdownEntry = styled.div`
    padding:4px;
    &:hover{
        background-color: #e6f1f9;
    }
`;

const Value= styled.div`
flex:1;
`;



class ViperSelectContainer extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            focused: false,
            hoveredOverIndex: 0,
            filterText:"",
            entriesWidth: 0
        };
        this.onDropdownClicked = this.onDropdownClicked.bind(this);
        this.onFilterTextChanged = this.onFilterTextChanged.bind(this);
    }

    componentWillMount() {
        // add event listener for clicks
        this.componentMounted = true;
        document.addEventListener("click", this.handleClick, false);
        document.addEventListener("keydown", this.handleKeyDown, false);
    }

    componentWillUnmount() {
        this.componentMounted = false;
        // make sure you remove the listener when the component is destroyed
        document.removeEventListener("click", this.handleClick, false);
        document.removeEventListener("keydown", this.handleClick);
    }

    componentDidMount(){
        // this.width = this.viperSelectBoxWrapper.offsetWidth;
        this.setState({...this.state,entriesWidth: ReactDOM.findDOMNode(this.viperSelectBoxWrapper).getBoundingClientRect().width-3});
    
    }

    handleClick = e => {
        if (this.componentMounted) {
            if (!ReactDOM.findDOMNode(this).contains(e.target)) {
                this.setState({
                    ...this.state,
                    open: false
                });
            }
        }
    }

    handleKeyDown = e => {
        if (this.state.focused && (e.code === "ArrowDown" || e.key === "Down") && this.state.hoveredOverIndex < this.props.options.length - 1) {
            this.setState({
                ...this.state,
                hoveredOverIndex: this.state.hoveredOverIndex + 1,
                open: true
            });
        }
        else if (this.state.focused && (e.code === "ArrowDown" || e.key === "Down")) {
            this.setState({
                ...this.state,
                open: true
            });
        }

        if (this.state.focused && (e.code === "ArrowUp" || e.key === "Up") && this.state.hoveredOverIndex > 0) {
            this.setState({
                ...this.state,
                hoveredOverIndex: this.state.hoveredOverIndex - 1,
                open: true
            });
        } else if (this.state.focused && (e.code === "ArrowUp" || e.key === "Up")) {
            this.setState({
                ...this.state,
                open: true
            });
        }

        if (this.state.focused && (e.code === "Enter" || e.key === "Enter") && this.state.open) {
            this.setState({
                ...this.state,
                open: false
            });
            this.props.onChange(this.state.hoveredOverIndex);
        } else if (this.state.focused && (e.code === "Enter" || e.key === "Enter")) {
            this.setState({
                ...this.state,
                open: true
            });
        }

        if (this.state.focused && (e.code === "Escape" || e.key === "Esc")) {
            this.setState({
                ...this.state,
                open: false
            });
        }
    }

    onDropdownClicked() {
        this.setState({
            ...this.state,
            open: !this.state.open
        });
        console.log("Open: " + !this.state.open);
    }

    onFilterTextChanged({target}){
        this.setState({
            ...this.state,
            filterText: target.value
        });
    }

    render() {
        const style = this.props.style ? this.props.style : {};
        const options = this.props.options;
        const selectedIndex = this.props.selectedIndex ? this.props.selectedIndex : 0;
        const onChange = this.props.onChange;
        let className = this.props.selectedIndex ? "selected-option" : "selected-option required";

        const required = this.props.required;
        const newStyle = this.props.newStyle;
        const title = this.props.title;

        if (!required) {
            className = "selected-option ";
        }

        if (newStyle) {
            className += "new ";
        }

        if(this.props.canTakeText){
            className += "no-padding ";
        }

        const dropDownEntriesHTML = [];

        function onOptionSelect(index, event) {
            this.props.onChange(index);
            this.setState({
                ...this.state,
                open: false,
                
            });
            console.log("option selected");
        }

        function onOptionHover(index, event) {

            this.setState({
                ...this.state,
                hoveredOverIndex: index
            });
        }

        function onFocus() {
            this.setState({
                ...this.state,
                focused: true
            });
        }

        function onBlur() {
            this.setState({
                ...this.state,
                focused: false
            });
        }

        const filteredOptions = options.filter((option)=>{
            if(this.state.filterText != ""){
                const stringifiedOption = option+"";
                if(stringifiedOption.toLowerCase().includes(this.state.filterText.toLowerCase())){
                    return true;
                }else{
                    return false;
                }
            }else{
                return true;
            }
        });

        for (let i = 0; i < filteredOptions.length; i++) {
            const className = this.state.hoveredOverIndex === i ? "option hover" : "option";
            dropDownEntriesHTML.push(
                <DropdownEntry 
                    key={"DropdownEntry_" + i} 
                    id={"DropdownEntry_" + i} 
                    onMouseEnter={onOptionHover.bind(this, i)} 
                    onMouseDown={onOptionSelect.bind(this, i)} 
                    onClick={onOptionSelect.bind(this, i)} 
                    className={className} >
                    {filteredOptions[i] instanceof Date ? convertDate(filteredOptions[i]) : filteredOptions[i] || "No Value"}
                </DropdownEntry>);
            // dropDownEntriesHTML.push(<div key={filteredOptions[i] + " dropdown-option"} onMouseEnter={onOptionHover.bind(this, i)} onMouseDown={onOptionSelect.bind(this, i)} onClick={onOptionSelect.bind(this, i)} className={className} >{filteredOptions[i] || "No Value"}</div>);
        }

        return (
            <ViperSelectWrapper id="ViperSelectWrapper" style={{width:this.props.width}}>
                <Title id="ViperSelectTitle">{this.props.title}</Title>
                <ViperSelectBoxWrapper 
                    ref={viperSelectBoxWrapper => this.viperSelectBoxWrapper = viperSelectBoxWrapper} 
                    id="ViperSelectBoxWrapper" 
                    tabIndex="0" 
                    onFocus={onFocus.bind(this)} 
                    onBlur={onBlur.bind(this)}>
                    <ViperSelectBox onLayout id="ViperSelectBox" onClick={this.onDropdownClicked}>
                        {this.props.canTakeText ? <FilterInput id="FilterInput" value={this.state.filterText} onChange={this.onFilterTextChanged}/> : <Value id="Value">{this.props.selectedIndex !== undefined ? options[selectedIndex] || "No Value" : null}</Value>}
                        <DropdownIconContainer id="DropdownIconContainer">
                            <i className="fa fa-caret-down" aria-hidden="true"></i>
                        </DropdownIconContainer>
                    </ViperSelectBox>
                
                </ViperSelectBoxWrapper>
                {this.state.open ? <DropdownEntriesContainer id="DropdownEntriesContainer" style={{width:this.state.entriesWidth}}>
                    {dropDownEntriesHTML}
                </DropdownEntriesContainer> : null}
            </ViperSelectWrapper>
        );
    }
}

const ViperSelect = ({children, width,options, selectedIndex, onChange, required, newStyle, title, canTakeText}) => (
    <ViperSelectContainer 
        width={width} 
        options={options}
        selectedIndex={selectedIndex} 
        onChange={onChange}
        required={required}
        newStyle={newStyle}
        title={title}
        canTakeText={canTakeText}> 
        {children}
    </ViperSelectContainer>
);

export default ViperSelect;