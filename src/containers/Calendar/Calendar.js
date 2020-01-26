import React, { Component } from "react";
import {
    Calendar,
    momentLocalizer,
  } from 'react-big-calendar';
import moment from "moment";
import axios from 'axios';
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from 'react-responsive-modal';
import Select from 'react-select';  
import { css } from "@emotion/core";
// import { ClipLoader } from "react-spinners";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: blue;
`;

const localizer = momentLocalizer(moment)

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

const modalStyle = {
    width: 400,
    height: 400
}

function monthToNum(m){
    switch(m) {
        case "January":
            return 0;
        case "February":
            return 1;
        case "March":
            return 2;
        case "April":
            return 3;
        case "May":
            return 4;
        case "June":
            return 5;
        case "July":
            return 6;
        case "August":
            return 7;
        case "September":
            return 8;
        case "October":
            return 9;
        case "November":
            return 10;
        case "December":
            return 11;    
    }
}

function getDate (d){
    let a = d;
    let arr = a.split(" ");
    let month = monthToNum(arr[1])
    let da = new Date(parseInt(arr[2]), month, parseInt(arr[0]));
    return da;
}

class CalendarH extends Component {

    eventsGetter = () => {
        axios.post(' https://leavecalculator.herokuapp.com/api/fetchAll')
        .then(response => {
            // console.log(response.data);
            let arr = [];
            for(var a = 0; a < response.data.length; a++){
                let obj = {}
                obj["id"] = a;
                let curr = getDate(response.data[a].date);
                obj["start"] = curr;
                obj["end"] = curr;
                obj["title"] = response.data[a].member;
                obj["value"] = response.data[a].date;
                obj["label"] = response.data[a].member + "->" + response.data[a].date
                arr.push(obj);
            }
            this.setState({
                events: arr
            })
        })
        .catch(err => {
            // console.log(err);
        })
    }

    componentDidMount () {
        this.eventsGetter();
    }

    eventClicked = (e) => {
        // console.log(e);
        this.setState({
            open: true,
            clickedEvent: e
        })
        
    }
    
    state = {
        open: false,
        events: [],
        clickedEvent: {},
        selectedOption: null, 
        loading: false    
    }

    onOpenModal = () => {
        this.setState({
            open: true
        })
    }

    onCloseModal = () => {
        this.setState({
            open: false
        })
    }

    handleChange = selectedOption => {
        this.setState({
            selectedOption
        })
        // console.log("Option Selected: ", selectedOption);
    }

    replaceShift = () => {
        let oldDate = this.state.clickedEvent.value
        let newDate = this.state.selectedOption.value
        // console.log(oldDate);
        // console.log(newDate);
        this.setState({loading: true})
        axios.post("https://leavecalculator.herokuapp.com/api/replace", {
            "date1" : oldDate,
            "date2" : newDate 
        }).then(response => {
            console.log(response);
            this.eventsGetter();
            this.setState({
                loading: false,
                open: false
            })
        }).catch(err => {
            this.setState({
                loading: false,
                open: false
            })
            // console.log(err);
        })
    }

    render(){
        const { open } = this.state;
        const { selectedOption } = this.state;
        // console.log(new Date(moment()));
        return (
            <div>
                <button onClick={this.onOpenModal}>Open modal</button>
                <Modal styles={modalStyle} open={open} onClose={this.onCloseModal} center>
                    <div style={{height: "400px", width: "400px"}}>
                        <h2>
                            Details of Shift on Saturday
                            Assigned Trainee: {this.state.clickedEvent.title}
                            <p>Wanna Replace? Replace With</p>
                            <Select 
                            value={selectedOption}
                            onChange={this.handleChange}
                            options={this.state.events}
                            />
                            <button onClick={this.replaceShift}>Replace.</button>
                        </h2>
                        <div className="sweet-loading">
                        <ClipLoader
                          css={override}
                          size={150}
                          //size={"150px"} this also works
                          color={"#123abc"}
                          loading={this.state.loading}
                        />
                        </div>
                    </div>
                </Modal>
                <Calendar
                localizer = {localizer}
                defaultDate = {new Date()}
                defaultView="month"
                events={this.state.events}
                style={{ height: "100vh" }} 
                onSelectEvent = {this.eventClicked}
                />
            </div>
        )
    }
}

export default CalendarH;