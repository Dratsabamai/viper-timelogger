import React, { Component } from 'react';
import styled from "styled-components";

const ButtonText = styled.div`
color: #187fba;
font-family: Segoe UI;
font-weight: 600;
opacity:1;
font-size: ${(props) => (props.size ? props.size : "16px")};
cursor: pointer;
user-select: none;
&:hover{
    opacity: 0.75;
}
&:active{
    opacity: 0.5
}
display:flex;
align-items: center;
justify-content: center;
`;


class ButtonComponent extends Component {
    render() {
        const {onPress, text, size} = this.props;
        return <ButtonText size={size} onClick={onPress}>{text}</ButtonText>
    }
}

const ClearButton = ({onPress, text, size = "16px"}) => (
    <ButtonComponent onPress={onPress} text={text} size={size} />
)

export default ClearButton;
