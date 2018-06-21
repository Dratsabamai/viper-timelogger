import React, { Component } from "react";
import styled from "styled-components";
import ClearButton from "../../components/ClearButton";
import WeekPicker from "../../components/WeekPicker";
import {getWeekStart,getWeekEnd} from "../../helpers/weekCalculator";
import convertDate from "../../helpers/dateConverter";
import ViperSelect from "../../components/ViperSelect";

const Title = styled.div`
font-family: Segoe UI;
font-size: 25px;
color: #4c4c4c
font-weight:200;
margin-bottom: 16px;
`;

const TimeloggerContainer = styled.div`
display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

const TimeloggerContent = styled.div`
flex:1;
overflow-y: auto;
padding-left:16px;
`;

const NavigationBar = styled.div`
display: flex;
flex-direction: row;
background-color: #eeeeee;
height: 44px;
justify-content: flex-end;
padding-right:32px;
align-items: center;
`;

const FooterBar = styled.div`
display: flex;
flex-direction: row;
background-color: #eeeeee;
height: 44px;
justify-content: flex-end;
padding-right:32px;
align-items: center;
`;

const DayContainer = styled.div`
display: flex;
flex-direction: column;
`;

const DayHeader = styled.div`
font-family: Segoe UI;
font-size: 20px;
color: #4c4c4c
font-weight:200;
margin-top: 16px;
padding-bottom:8px;
display:flex;
flex-direction:row;
border-bottom: 1px solid #979797;
flex:1;
`;

const DayLogsContainer = styled.div`
display:flex;
flex-direction:row;
justify-content: space-between;
`;

const DayLogsColumn = styled.div`
display:flex;
flex-direction:column;
flex:1;
margin-left:8px;
margin-right:8px;
margin-top:8px;
`;

const DayLogHeaderText = styled.div`
font-family: Segoe UI;
font-weight: 600;
padding-top: 4px;
padding-bottom:4px;
`;

const TextInput = styled.input`
height:22px;
margin-top:6px;
`;




class Timelogger extends Component {
    constructor(){
        super();
        this.state = {
            selectedDate: new Date()
        };
    }

    onWeekChange(newDate){
        this.setState({
            ...this.state, selectedDate: newDate
        });
    }

    render() {

        const daySections = [];
        for(let i = getWeekStart(this.state.selectedDate); i <= getWeekEnd(this.state.selectedDate); i.setDate(i.getDate() + 1)){
          
            const dayColumns = [];

            dayColumns.push(
                <DayLogsColumn>
                    <DayLogHeaderText>Projects</DayLogHeaderText>
                    <ViperSelect canTakeText={false} width="200" selectedIndex={0} options={["Potato","Juice"]}/>
                </DayLogsColumn>
            );

            dayColumns.push(
                <DayLogsColumn>
                    <DayLogHeaderText>Task</DayLogHeaderText>
                    <ViperSelect canTakeText={false} width="200" selectedIndex={0} options={["Eat","Drink"]}/>
                </DayLogsColumn>
            );

            dayColumns.push(
                <DayLogsColumn>
                    <DayLogHeaderText>Description</DayLogHeaderText>
                    <TextInput/>
                </DayLogsColumn>
            );

            dayColumns.push(
                <DayLogsColumn>
                    <DayLogHeaderText>Tags</DayLogHeaderText>
                </DayLogsColumn>
            );

            dayColumns.push(
                <DayLogsColumn>
                    <DayLogHeaderText>Time</DayLogHeaderText>
                </DayLogsColumn>
            );

            dayColumns.push(
                <DayLogsColumn>
                    <DayLogHeaderText>Remove?</DayLogHeaderText>
                </DayLogsColumn>
            );
          
          
          
            daySections.push(
                <DayContainer id="DayContainer">
                    <DayHeader id="DayHeader"><b>{convertDate(i)} </b> - Total Time 15 minutes</DayHeader>
                    <DayLogsContainer>
                        {dayColumns}
                    </DayLogsContainer>
                </DayContainer>
            );
        }
    

        return (
            <TimeloggerContainer id="TimeloggerContainer">
                <NavigationBar id = "NavigationBar">
                    <ClearButton text="Sign out" />
                </NavigationBar>
                <TimeloggerContent id="TimeloggerContent">
                    <Title id="Title">Viper Timelogger</Title>
                    <WeekPicker date={this.state.selectedDate} onLeftPressed={this.onWeekChange.bind(this)} onRightPressed={this.onWeekChange.bind(this)}/>
                    {daySections}
                </TimeloggerContent>
                <FooterBar id="FooterBar"><ClearButton text="Commit Changes"></ClearButton></FooterBar>
            </TimeloggerContainer>
        );
    }
}

export default Timelogger;
