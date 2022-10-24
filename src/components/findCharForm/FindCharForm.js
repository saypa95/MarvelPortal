import { Formik, Field, Form, ErrorMessage as FormikErrorMessage } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./findCharForm.scss";

const FindCharForm = (props) => {
  const [char, setChar] = useState(null);
  const { loading, error, getCharacterByName, clearError } = useMarvelService();

  const onCharLoaded = (char) => {
    setChar(char);
    if(char.length > 0){
      props.onCharFinded(char[0].id)
    }
  };

  const updateChar = (charName) => {
    clearError();
    getCharacterByName(charName).then(onCharLoaded);
  };

  const errorMessage = error ? (
    <div style={{ "margin-top": "18px" }}>
      <ErrorMessage />
    </div>
  ) : null;
  const results = !char ? null : char.length ? null : (
    <div className="find-char-form__error">The character was not found. Check the name and try again</div>
  );

  return (
    <div className="find-char-form">
      <Formik
        initialValues={{
          charName: "",
        }}
        validationSchema={Yup.object({
          charName: Yup.string().required("This field is required"),
        })}
        onSubmit={({ charName }) => {
          updateChar(charName);
        }}
      >
        <Form>
          <h2 className="find-char-form__header">Or find a character by name:</h2>
          <div className="find-char-form__wrapper">
            <Field id="charName" name="charName" type="text" placeholder="Enter the name" />
            <button className="button " type="submit" disabled={loading}>
              <div className="inner">find</div>
            </button>
          </div>
          <FormikErrorMessage component="div" className="find-char-form__error" name="charName" />
        </Form>
      </Formik>
      {results}
      {errorMessage}
    </div>
  );
};

export default FindCharForm;
