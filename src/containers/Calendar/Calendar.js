import React, { Component } from "react";
import {
    Calendar,
    momentLocalizer,
  } from 'react-big-calendar';
import moment from "moment";
import axios from 'axios';
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment)

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
    console.log(arr);
    let month = monthToNum(arr[1])
    let da = new Date(parseInt(arr[2]), month, parseInt(arr[0]));
    return da;
}

class CalendarH extends Component {

    componentDidMount () {
        axios.post(' https://leavecalculator.herokuapp.com/api/fetchAll')
        .then(response => {
            console.log(response.data);
            let arr = [];
            for(var a = 0; a < response.data.length; a++){
                let obj = {}
                obj["id"] = a;
                let curr = getDate(response.data[a].date);
                obj["start"] = curr;
                obj["end"] = curr;
                obj["title"] = response.data[a].member;
                arr.push(obj);
            }
            this.setState({
                events: arr
            })
        })
        .catch(err => {
            console.log(err);
        })
    }
    
    state = {
        events: [
        //   {
        //     start: new Date(),
        //     end: new Date(moment().add(0, "days")),
        //     // end: new Date(2020, 1, 28),
        //     title: "Some title"
        //   },
        //   {
        //     id: 2,
        //     title: 'DTS STARTS',
        //     start: new Date(2020, 0, 13, 15, 0, 0, 0),
        //     end: new Date(2020, 0, 20, 18, 0, 0, 0),
        //   },
        //    {
        //     id: 1,
        //     title: "Lionel",
        //     start: new Date(2020, 0, 25),
        //     end: new Date(2020, 0, 25)
        //     },
        //     {
        //         id: 1,
        //         title: "Jovin",
        //         start: new Date(2020, 0, 11),
        //         end: new Date(2020, 0, 11)
        //     }
        ]
    };

    render(){
        console.log(new Date(moment()));
        console.log(moment().format('llll'))
        return (
            <div>
                <Calendar
                localizer = {localizer}
                defaultDate = {new Date()}
                defaultView="month"
                events={this.state.events}
                style={{ height: "100vh" }} 
                />
            </div>
        )
    }
}

export default CalendarH;