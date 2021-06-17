import React from "react";
import { connect } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { fetchWeather } from "../actions/remainderActions";
import { Link } from "react-router-dom";
import createUID from "create-unique-id";

const NewRemainder = ({ fetchWeatherData, error, status, loading }) => {
  const initialValues = {
    text: "",
    date: "",
    time: "",
    city: ""
  };

  const remainderSchema = Yup.object().shape({
    text: Yup.string()
      .required("Remainder text is required")
      .max(30, "Too Long! Max 30 characters"),
    date: Yup.date("Date required")
      .required("Date is required")
      .min("2021-07-01T00:00")
      .max("2021-07-31T00:00"),
    time: Yup.string().required("Time is required"),
    city: Yup.string().required("City is required")
  });

  const submitForm = (values) => {
    const id = createUID(4);
    fetchWeatherData(id, values.text, values.date, values.time, values.city);
  };

  const message = () =>
    error === "" && status === "created" ? (
      <span className="text-success">Remainder created successfully.</span>
    ) : (
      <span className="text-danger">{error}</span>
    );

  return (
    <>
      <div className="header justify-content-start align-items-center bg-primary bg-gradient rounded">
        <Link to="/" className="home-btn fw-bolder roboto">
          Back to home page
        </Link>
        <Link to="/calendar" className="home-btn fw-bolder roboto">
          Back to calendar
        </Link>
      </div>
      <div className="container">
        <div className="middle-line"></div>
        <Formik
          className="form container"
          initialValues={initialValues}
          validationSchema={remainderSchema}
          onSubmit={(values) => {
            submitForm(values);
          }}
        >
          {(formik) => {
            const { errors, touched, isValid, dirty } = formik;
            return (
              <div className="mt-5 pl-3 border-top pt-3 d-inline">
                <h3 className="my-4">Create a new remainder</h3>
                <Form>
                  <div className="form-group">
                    <label htmlFor="text">Text for the remainder</label>
                    <Field
                      type="string"
                      name="text"
                      id="text"
                      className={`${
                        errors.text && touched.text ? "is-invalid" : "is-valid"
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
                        errors.date && touched.date ? "is-invalid" : "is-valid"
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
                        errors.time && touched.time ? "is-invalid" : "is-valid"
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
                        errors.city && touched.city ? "is-invalid" : "is-valid"
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
                      Create new Remainder
                    </button>
                  </div>
                </Form>
                <div className="mt-3" />
                <p>{loading ? "" : message()}</p>
              </div>
            );
          }}
        </Formik>
        <div className="middle-line"></div>
      </div>
    </>
  );
};

NewRemainder.defaultProps = {
  fetchWeather: PropTypes.func
};

NewRemainder.propTypes = {
  fetchWeather: PropTypes.func,
  error: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  error: state.remainders.error,
  status: state.remainders.status,
  loading: state.remainders.loading
});

const mapDispatchToProps = (dispatch) => ({
  fetchWeatherData: (id, text, date, time, city) =>
    dispatch(fetchWeather(id, text, date, time, city))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewRemainder);
