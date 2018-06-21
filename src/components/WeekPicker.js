import React, { Component } from "react";
import styled from "styled-components";
import ClearButton from "./ClearButton";
import convertDate from "../helpers/dateConverter";
import {getWeekStart,getWeekEnd} from "../helpers/weekCalculator";

const DateText = styled.div`
color: #4c4c4c;
font-family: Segoe UI;
font-weight: 500;
user-select: none;
font-size: 17px;
margin-left: 8px;
margin-right: 8px;
`;

const WeekPickerContainer = styled.div`
    display:flex;
    flex-direction: row;
    align-items: center;
`;



class WeekPickerComponent extends Component {
    constructor() {
        super();
    }    

    onLeftPressed() {
        const weekStart = getWeekStart(this.props.selectedDate);
        this.props.onLeftPressed(new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() - 6));
    }

    onRightPressed() {
        const weekEnd = getWeekEnd(this.props.selectedDate);
        this.props.onRightPressed( new Date(weekEnd.getFullYear(), weekEnd.getMonth(), weekEnd.getDate() + 1));
    }

    render() {
        const {selectedDate} = this.props;

        const weekStartString = convertDate(getWeekStart(selectedDate));
        const weekEndString = convertDate(getWeekEnd(selectedDate));

        return <WeekPickerContainer id="WeekPickerContainer">
            <ClearButton text={"<"} onPress={this.onLeftPressed.bind(this)} size="30px" />
            <DateText>{weekStartString} {"-"} {weekEndString}</DateText>
            <ClearButton text={">"} onPress={this.onRightPressed.bind(this)} size="30px" />
        </WeekPickerContainer>;
    }
}

const WeekPicker = ({onLeftPressed, onRightPressed,date}) => (
    <WeekPickerComponent selectedDate={date} onLeftPressed={onLeftPressed} onRightPressed={onRightPressed} />
);

export default WeekPicker;
