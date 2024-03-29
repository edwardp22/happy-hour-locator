import React, { Fragment, useContext } from "react";

import { Col, Row, Card as CardBS, Button } from "react-bootstrap";

import { Container } from "../common";
import { UserContext } from "../../context";

const { Img, Body, Text } = CardBS;

export default function Card({
  location,
  codes,
  showEvents,
  onReturnClick,
  onSeeEventsClick,
  onRegisterEventClick,
  onUnRegisterEventClick,
}) {
  const { currentUser } = useContext(UserContext);

  return (
    <Col xs={12} className="cardContainerLocation">
      {onReturnClick && <Button onClick={() => onReturnClick()}>Return</Button>}

      <CardBS>
        <Container noFluid>
          <Row>
            <Col xs={12} sm={6}>
              <Img src={location.image} />
            </Col>

            <Col xs={12} sm={6}>
              <Body>
                <h4>{location.locationName}</h4>
                <div>{location.address}</div>

                <br />

                {currentUser && (
                  <Fragment>
                    <h6>Happy Hour Description</h6>
                    <Text>{location.happyHourDescription}</Text>

                    {!showEvents && (
                      <Button
                        variant="primary"
                        className="purpleBtn"
                        onClick={() => onSeeEventsClick()}
                      >
                        See Events
                      </Button>
                    )}

                    {showEvents && (
                      <Fragment>
                        <h4>Upcoming Events</h4>
                        {location.events?.map((event) => {
                          const codeRegistered = codes.find(
                            (code) => code.data.eventName === event.eventName
                          );

                          return (
                            <Fragment key={"event" + event.eventName}>
                              <h6>{event.eventName}</h6>
                              <Text>{event.eventDescription}</Text>
                              <h6>Event Times:</h6>
                              <table>
                                <tbody>
                                  <tr>
                                    <td>From:</td>
                                    <td>
                                      {new Date(
                                        (event.eventDateFrom?.seconds ?? 0) *
                                          1000
                                      ).toDateString()}
                                      ,{" "}
                                      {new Date(
                                        (event.eventDateFrom?.seconds ?? 0) *
                                          1000
                                      ).toLocaleTimeString()}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>To:</td>
                                    <td>
                                      {new Date(
                                        (event.eventDateTo?.seconds ?? 0) * 1000
                                      ).toDateString()}
                                      ,{" "}
                                      {new Date(
                                        (event.eventDateTo?.seconds ?? 0) * 1000
                                      ).toLocaleTimeString()}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>

                              {onRegisterEventClick && !codeRegistered ? (
                                <Button
                                  variant="primary"
                                  className="purpleBtn"
                                  onClick={() => onRegisterEventClick(event)}
                                >
                                  Register to Event
                                </Button>
                              ) : (
                                <Button
                                  variant="secondary"
                                  className="dangerBtn"
                                  onClick={() =>
                                    onUnRegisterEventClick(codeRegistered.id)
                                  }
                                >
                                  Unregister
                                </Button>
                              )}
                            </Fragment>
                          );
                        })}
                      </Fragment>
                    )}
                  </Fragment>
                )}
              </Body>
            </Col>
          </Row>
        </Container>
      </CardBS>
    </Col>
  );
}
