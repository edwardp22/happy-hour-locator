<<<<<<< Updated upstream
import React, { useRef, useContext, useState } from "react";
=======
import React, { useRef, useContext } from "react";
>>>>>>> Stashed changes
import { Row, Col, Button, Form } from "react-bootstrap";
import { WhiteCenteredContainer } from "../../common";
import "./style.css";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../../context";
import { getLocation, putLocation, addLocation, putLoc } from "../../../utils/firebase/firebase.utils";


<<<<<<< Updated upstream
import { FirebaseContext } from "../../../context";

export default function Events({ location }) {
  const refStart = useRef();
  const refEnd = useRef();
  const refStartTime = useRef();
  const refEndTime = useRef();
  const { putLocation } = useContext(FirebaseContext);
  const [event, setEvent] = useState({});

  const submitHandler = async () => {
    const newLoc = JSON.parse(JSON.stringify(location));

    if (!newLoc.events) newLoc.events = [];

    event.eventDateFrom = new Date(
      refStart.current.value + " " + refStartTime.current.value
    );
    event.eventDateTo = new Date(
      refEnd.current.value + " " + refEndTime.current.value
    );

    newLoc.events.push(event);

    putLocation(newLoc.locationName, newLoc);

    alert("New event created!");
  };
=======
export default function Events() {
  
  const { currentAdmin } = useContext(UserContext);
  const refStart = useRef();
  const refEnd = useRef();

  const submitForm = async (event) => {
    event.preventDefault();

    const start = new Date((event.target.startDay.value + " " + event.target.startTime.value).replace(/-/g,"/"));
    const end = new Date((event.target.endDay.value + " " + event.target.endTime.value).replace(/-/g,"/"));

    // const addAddress = {
    //   locationName:"Black Barrell",
    //   address: "296 E Columbia St, New Westminster, BC V3L 0E3"
    // }

    
    //await getLocation(eventToAdd)
    // await putLocation(eventToAdd)
    // putLoc(addAddress)
    let currLoc = await getLocation("Black Barrell") //should get it from currentAdmin
    console.log(await getLocation("Black Barrell"))
    const eventToAdd = {
        eventDateFrom: start,
        eventDateTo: end,
        eventDescription: event.target.inputDesc.value,
        eventName: event.target.eventName.value,
    }
    
    const newEvents = currLoc.events.push(eventToAdd)
    const updDoc = {
      locationName: "Black Barrell", //should get it from currentAdmin,
      events: newEvents
    }

    putLoc(updDoc)

    console.log(await getLocation("Black Barrell"))
    
    // console.log(new Date(test.events.eventDateFrom.seconds*1000))


    // console.log(new Date(timestamp.seconds*1000))

    
    // putLocation()
    
  }
  return <WhiteCenteredContainer > 
    <Row className="m-3"><p >NEW EVENT</p> </Row>
    

    <Form id="eventForm" onSubmit={submitForm}> 
    
      <Row className="m-3">
				<Col>
					<Form.Label className="label">Event Name:</Form.Label>
				</Col>
				<Col xs={12} md={8}>
					<Form.Control
						className="inputForm"
						type="text"
            id="eventName"

					/>
				</Col>
			</Row>
>>>>>>> Stashed changes

  const onInputChangeHandler = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  return (
    <WhiteCenteredContainer>
      <Row className="m-3">
        <p>NEW EVENT</p>{" "}
      </Row>

      <Form>
        <Row className="m-3">
          <Col>
            <Form.Label className="label">Event Name:</Form.Label>
          </Col>
          <Col xs={12} md={8}>
            <Form.Control
              className="inputForm"
              type="text"
              name="eventName"
              value={event?.eventName ?? ""}
              onChange={onInputChangeHandler}
            />
          </Col>
        </Row>

        <Row className="m-3">
          <Col xs={12} md={3}>
            <Form.Label className="label" required>
              Start Day:
            </Form.Label>
          </Col>
          <Col xs={12} md={3}>
            <Form.Control
              className="optsel"
              type="text"
              ref={refStart}
              onFocus={() => (refStart.current.type = "date")}
              onBlur={() => (refStart.current.type = "text")}
              id="startDay"
            />
          </Col>

          <Col xs={12} md={3}>
            <Form.Label className="label">End Day:</Form.Label>
          </Col>
          <Col xs={12} md={3}>
            <Form.Control
              className="optsel"
              type="text"
              ref={refEnd}
              onFocus={() => (refEnd.current.type = "date")}
              onBlur={() => (refEnd.current.type = "text")}
              id="endDay"
            />
          </Col>
        </Row>

        <Row className="m-3">
          <Col xs={12} md={3}>
            <Form.Label className="label">Start Time:</Form.Label>
          </Col>
          <Col xs={12} md={3}>
            <Form.Control
              className="optsel"
              type="time"
              id="startTime"
              ref={refStartTime}
            />
          </Col>
          <Col xs={12} md={3}>
            <Form.Label className="label">End Time:</Form.Label>
          </Col>
          <Col xs={12} md={3}>
            <Form.Control
              className="optsel"
              type="time"
              id="endTime"
              ref={refEndTime}
            />
          </Col>
        </Row>

        <div id="descdiv" className="m-4">
          <Form.Label className="label">
            Special Discounts / Description
          </Form.Label>
          <Form.Control
            id="inputDesc"
            type="text"
            name="eventDescription"
            value={event?.eventDescription ?? ""}
            onChange={onInputChangeHandler}
          />

          <Button
            id="eventBtn"
            className="purpleBtn"
            variant="primary"
            size="sm"
            onClick={() => submitHandler()}
          >
            Create Event
          </Button>
        </div>

        <NavLink id="linktoFAQ" to="/faq">
          Having any issues? Please Contact Us
        </NavLink>
      </Form>
    </WhiteCenteredContainer>
  );
}
