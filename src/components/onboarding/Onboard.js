import React, { useEffect } from "react";
import "./onboard.css";
import axios from "axios";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import auth0Client from "../Auth/Auth/Auth";
import { withRouter } from "react-router-dom";

const GoalsSchema = Yup.object().shape({
  goals: Yup.string().required("Please select a Goal.")
});

class Onboarding extends React.Component {

  async componentDidMount() {
    await auth0Client.handleAuthentication();
    //this.props.history.replace("/"); // redirects to home page
  }

  render() {
    return (
    <div>
      <Formik
        initialValues={{ goals: [] }}
        validationSchema={GoalsSchema}
        onSubmit={async (values, { setStatus, resetForm, setSubmitting }) => {
          setSubmitting(true);
          axios
            .post("https://reqres.in/api/users", values)
            .then(res => {
              console.log("handleSubmit: ", res);
              setStatus(res.data);
              resetForm();
              setSubmitting(false);
              this.props.history.push("/dashboard")
            })
            .catch(err => console.error("handleSubmit: catch: err: ", err));
        }}
      >
        {({ values, isSubmitting, errors }) => (
          <Form>
            <h1>
              What are your fitness goals? <br />
              (Select all that apply)
            </h1>
            <div>
              <Field type="checkbox" name="goals" value="getInShape" />
              <label>Get in Shape</label>
              <br />
              <label>
                <Field type="checkbox" name="goals" value="loseWeight" />
                Lose Weight
              </label>

              <br />
              <label>
                <Field type="checkbox" name="goals" value="muscle" />
                Build Muscle
              </label>
              <br />
              <label>
                <Field type="checkbox" name="goals" value="stronger" />
                Get Stronger
              </label>
              <br />
              <label>
                <Field type="checkbox" name="goals" value="wellness" />
                Wellness
              </label>
            </div>
            <div>
              <div className="validation-error">{errors.goals}</div>
              <button disabled={isSubmitting} type="submit">
                submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
    );
  }
}

export default withRouter(Onboarding);