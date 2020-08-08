import moment from "moment";
import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/addons/dragAndDrop/styles.scss";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { ChevronLeft, ChevronRight } from "react-feather";
import { Button, Card, CardBody, Container, Row, Col } from "reactstrap";
import "../../assets/scss/plugins/calendars/react-big-calendar.scss";
import axios from "../../http";

const localizer = momentLocalizer(moment);

class Toolbar extends React.Component {
  render() {
    return (
      <div className="calendar-header mb-2 d-flex justify-content-between flex-wrap">
        <div className="text-center view-options mt-1 mt-sm-0 ml-lg-5 ml-0"></div>
        <div className="month-label d-flex flex-column text-center text-md-right mt-1 mt-md-0">
          <div className="calendar-navigation">
            <Button.Ripple
              className="btn-icon rounded-circle"
              size="sm"
              color="danger"
              onClick={() => this.props.onNavigate("PREV")}
            >
              <ChevronLeft size={15} />
            </Button.Ripple>
            <div className="month d-inline-block mx-75 text-bold-500 font-medium-2 align-middle">
              {this.props.label}
            </div>
            <Button.Ripple
              className="btn-icon rounded-circle"
              size="sm"
              color="danger"
              onClick={() => this.props.onNavigate("NEXT")}
            >
              <ChevronRight size={15} />
            </Button.Ripple>
          </div>
        </div>
      </div>
    );
  }
}

class CalendarApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      views: {
        month: true,
        week: true,
        day: true,
      },
      eventInfo: null,
    };
  }

  async loadBirtday(
    month = moment().format("MM"),
    year = moment().format("YYYY")
  ) {
    await axios
      .get("/dashboard/birthday", { params: { month } })
      .then(({ data: { members: data } }) => {
        const events = data.map((item, index) => {
          const date = moment(item.birthdate);
          const birthdate = moment(
            `${year}-${date.format("MM")}-${date.format("DD")}`
          );
          console.log(birthdate);
          return {
            id: `b-${index}`,
            title: item.name,
            start: birthdate,
            end: birthdate,
            allDay: true,
            selectable: false,
          };
        });
        this.setState({ events });
      });
  }

  async componentWillMount() {
    await this.loadBirtday();
  }

  render() {
    const { events, views, sidebar } = this.state;
    return (
      <Container>
        <Row>
          <Col>
            <div className="app-calendar position-relative">
              <div
                className={`app-content-overlay ${sidebar ? "show" : "hidden"}`}
              ></div>
              <Card>
                <CardBody>
                  <Calendar
                    localizer={localizer}
                    events={events}
                    views={views}
                    components={{ toolbar: Toolbar }}
                    onRangeChange={({ start, end }) => console.log(start)}
                    eventPropGetter={() => ({ className: "bg-danger" })}
                  />
                </CardBody>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default CalendarApp;
