import React, { useState, useEffect } from "react";
import "../sass/calendar.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { UpdateRemainderInfo, setFilter } from "../actions/remainderActions";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Calendar = ({
  remainders,
  filteredRemainders,
  UpdateRemainderAttr,
  error,
  status,
  loading,
  setFilterRe
}) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [id, setId] = useState("");
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [city, setCity] = useState("");

  const handleClose = () => setShowEditForm(false);
  const handleShow = () => setShowEditForm(true);

  useEffect(() => {
    setFilterRe("all");
  }, [setFilterRe]);

  const initialValues = {
    id: id,
    text: text,
    date: date,
    time: time,
    city: city
  };

  const remainderSchema = Yup.object().shape({
    text: Yup.string()
      .required("Remainder text is required")
      .max(30, "Too Long! Max 30 characters"),
    date: Yup.date("Date required")
      .required("Date is required")
      .min("2021-07-01")
      .max("2021-07-31"),
    time: Yup.string().required("Time is required"),
    city: Yup.string().required("City is required")
  });

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const week1 = ["27", "28", "29", "30", "01", "02", "03"];
  const week2 = ["04", "05", "06", "07", "08", "09", "10"];
  const week3 = ["11", "12", "13", "14", "15", "16", "17"];
  const week4 = ["18", "19", "20", "21", "22", "23", "24"];
  const week5 = ["25", "26", "27", "28", "29", "30", "31"];

  const countRemainders = (day) => {
    if (remainders.filter((rem) => rem.date.slice(8, 10) === day).length > 0) {
      return remainders.filter((rem) => rem.date.slice(8, 10) === day).length;
    } else {
      return "";
    }
  };

  const handleEditForm = (id, text, date, time, city) => {
    setId(id);
    setText(text);
    setDate(date);
    setTime(time);
    setCity(city);
    handleShow();
  };

  const UpdateRemainder = (values) => {
    UpdateRemainderAttr(
      values.id,
      values.text,
      values.date,
      values.time,
      values.city
    );
  };

  const message = () =>
    error === "" && status === "updated" ? (
      <span className="text-success">Remainder updated successfully.</span>
    ) : (
      <span className="text-danger">{error}</span>
    );

  const setFilterRemainders = (filter) => {
    setFilterRe(filter);
  };

  return (
    <div className="">
      <div>
        <div className="header justify-content-start align-items-center">
          <Link to="/" className="home-btn fw-bolder roboto">
            Back to home page
          </Link>
          <Link to="/newremainder" className="home-btn fw-bolder roboto">
            New Remainder
          </Link>
        </div>
        <div className="header-1 text-center">
          <h1 className="title pro">Calendar of 2021</h1>
          <h2 className="subtitle pro">Month - July</h2>
          <button
            className="btn btn-sm btn-secondary"
            value="all"
            onClick={(e) => setFilterRemainders(e.target.value)}
          >
            View all Remainders
          </button>
        </div>

        <table className="table-class">
          <thead>
            <tr>
              {daysOfWeek.map((day, idx) => (
                <th className="day fs-5" key={idx}>
                  {day}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            <tr>
              {week1.map((day, idx) => (
                <td className="day" key={idx}>
                  {day}
                  <p className="fw-bold fs-5">{countRemainders(day)}</p>
                  <p className="fw-bold fs-6">
                    {countRemainders(day) > 0 ? "Remainders" : ""}
                  </p>
                  <button
                    className="btn btn-sm btn-light"
                    value={day}
                    onClick={(e) => setFilterRemainders(e.target.value)}
                  >
                    {countRemainders(day) > 0 ? "see remainders" : ""}
                  </button>
                </td>
              ))}
            </tr>

            <tr>
              {week2.map((day, idx) => (
                <td className="day" key={idx}>
                  {day}
                  <p className="fw-bold fs-5">{countRemainders(day)}</p>
                  <p className="fw-bold fs-6">
                    {countRemainders(day) > 0 ? "Remainders" : ""}
                  </p>
                  <button
                    className="btn btn-sm btn-light"
                    value={day}
                    onClick={(e) => setFilterRemainders(e.target.value)}
                  >
                    {countRemainders(day) > 0 ? "see remainders" : ""}
                  </button>
                </td>
              ))}
            </tr>

            <tr>
              {week3.map((day, idx) => (
                <td className="day" key={idx}>
                  {day}
                  <p className="fw-bold fs-5">{countRemainders(day)}</p>
                  <p className="fw-bold fs-6">
                    {countRemainders(day) > 0 ? "Remainders" : ""}
                  </p>
                  <button
                    className="btn btn-sm btn-light"
                    value={day}
                    onClick={(e) => setFilterRemainders(e.target.value)}
                  >
                    {countRemainders(day) > 0 ? "see remainders" : ""}
                  </button>
                </td>
              ))}
            </tr>

            <tr>
              {week4.map((day, idx) => (
                <td className="day" key={idx}>
                  {day}
                  <p className="fw-bold fs-5">{countRemainders(day)}</p>
                  <p className="fw-bold fs-6">
                    {countRemainders(day) > 0 ? "Remainders" : ""}
                  </p>
                  <button
                    className="btn btn-sm btn-light"
                    value={day}
                    onClick={(e) => setFilterRemainders(e.target.value)}
                  >
                    {countRemainders(day) > 0 ? "see remainders" : ""}
                  </button>
                </td>
              ))}
            </tr>

            <tr>
              {week5.map((day, idx) => (
                <td className="day" key={idx}>
                  {day}
                  <p className="fw-bold fs-5">{countRemainders(day)}</p>
                  <p className="fw-bold fs-5">
                    {countRemainders(day) > 0 ? "Remainders" : ""}
                  </p>
                  <button
                    className="btn btn-sm btn-light"
                    value={day}
                    onClick={(e) => setFilterRemainders(e.target.value)}
                  >
                    {countRemainders(day) > 0 ? "see remainders" : ""}
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <section className="container mt-5 pt-5">
        <h3 className="mt-2 mb-4">List of Remainders</h3>
        <p>Total of Remainder: {filteredRemainders.length}</p>

        <div>
          {filteredRemainders.map((re, idx) => (
            <div className="d-flex justify-content-around w-50" key={idx}>
              <div className="mt-4 d-flex flex-column justify-content-start">
                <p>
                  <strong>Description: </strong>
                  {re.text}
                </p>
                <p>
                  <strong>Date: </strong>
                  {re.date}
                </p>
                <p>
                  <strong>Time: </strong>
                  {re.time}
                </p>
                <p>
                  <strong>City: </strong>
                  {re.city}
                </p>
                <p>
                  <strong>Weather: </strong>
                  {re.weather}
                </p>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() =>
                    handleEditForm(re.id, re.text, re.date, re.time, re.city)
                  }
                >
                  Edit Remainder
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <Modal show={showEditForm} animation={false} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>Update Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              className="form container"
              initialValues={initialValues}
              validationSchema={remainderSchema}
              onSubmit={(values) => {
                UpdateRemainder(values);
              }}
            >
              {(formik) => {
                const { errors, touched, isValid, dirty } = formik;
                return (
                  <div className="mt-5 pl-3 border-top pt-3 d-inline">
                    <h3 className="my-4">Update remainder</h3>
                    <Form>
                      <div className="form-group">
                        <label htmlFor="text">Text for the remainder</label>
                        <Field
                          type="string"
                          name="text"
                          id="text"
                          className={`${
                            errors.text && touched.text
                              ? "is-invalid"
                              : "is-valid"
                          } form-control`}
                        />

                        <ErrorMessage
                          name="text"
                          component="span"
                          className="text-danger"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="date">Date for the remainder</label>
                        <Field
                          type="date"
                          name="date"
                          id="date"
                          className={`${
                            errors.date && touched.date
                              ? "is-invalid"
                              : "is-valid"
                          } form-control`}
                        />

                        <ErrorMessage
                          name="date"
                          component="span"
                          className="text-danger"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="time">Time for the remainder</label>
                        <Field
                          type="time"
                          name="time"
                          id="time"
                          className={`${
                            errors.time && touched.time
                              ? "is-invalid"
                              : "is-valid"
                          } form-control`}
                        />

                        <ErrorMessage
                          name="time"
                          component="span"
                          className="text-danger"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="city">
                          City where happening the remainder
                        </label>
                        <Field
                          type="string"
                          name="city"
                          id="city"
                          className={`${
                            errors.city && touched.city
                              ? "is-invalid"
                              : "is-valid"
                          } form-control`}
                        />

                        <ErrorMessage
                          name="city"
                          component="span"
                          className="text-danger"
                        />
                      </div>

                      <div>
                        <button
                          type="submit"
                          className={`${
                            !(dirty && isValid) ? "disabled-btn" : ""
                          } btn btn-success`}
                          disabled={!(dirty && isValid)}
                        >
                          Save Changes
                        </button>
                      </div>
                    </Form>
                    <div className="mt-3" />
                    <p>{loading ? "" : message()}</p>
                  </div>
                );
              }}
            </Formik>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </section>
    </div>
  );
};

Calendar.defaultProps = {
  UpdateRemainderAttr: PropTypes.func,
  setFilterRe: PropTypes.func
};

Calendar.propTypes = {
  UpdateRemainderAttr: PropTypes.func,
  setFilterRe: PropTypes.func,
  error: PropTypes.string,
  status: PropTypes.string,
  loading: PropTypes.bool,
  remainders: PropTypes.arrayOf(Object).isRequired
};

const mapStateToProps = (state) => ({
  remainders: state.remainders.remainders,
  filteredRemainders: state.remainders.filteredRemainders,
  error: state.remainders.error,
  status: state.remainders.status,
  loading: state.remainders.loading
});

const mapDispatchToProps = (dispatch) => ({
  UpdateRemainderAttr: (id, text, date, time, city) =>
    dispatch(UpdateRemainderInfo(id, text, date, time, city)),
  setFilterRe: (filter) => dispatch(setFilter(filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
