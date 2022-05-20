import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeDeleteWindow } from "../actions/deleteWindowActions";
import { deleteUser, getUsers } from "../queries/queries";
import { useMutation } from "@apollo/client";

const DeleteConfirmation = (props) => {
  const [deleteAUser, { data, error, loading }] = useMutation(deleteUser);
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [inputError, setinputError] = useState(false);

  const userId = useSelector( state => state.userId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password.length > 0) {
      setinputError("empty");
      return;
    }
    if (password != "123456") {
      setinputError("incorrect");
      return;
    }
    deleteAUser({
        variables: {
            id: userId,
            password: password
        },
        refetchQueries: [
            getUsers
        ]
    })
    dispatch(closeDeleteWindow());
  };

  const inputErrorHandler = () => {
    let inputErrorMsg;
    if (!inputError) {
      return;
    }
    if (inputError === "empty") {
      inputErrorMsg = "Empty Input!";
    }
    if (inputError === "incorrect") {
      inputErrorMsg = "Incorrect Password!";
    }
    return (
      <p className="text-red-500 text-md w-[80%] mx-auto">
        {inputErrorMsg}
      </p>
    );
  };

  let inputStyle;
  if (!inputError) {
    inputStyle =
      "border border-1 border-black w-[80%] mx-auto rounded rounded-lg text-md px-2 py-1";
  } else {
    inputStyle =
      "border border-1 border-red-500 w-[80%] mx-auto rounded rounded-lg text-md px-2 py-1";
  }

  return (
    <div className="fixed top-0 left-0 bg-black/60 z-50 h-screen w-full grid place-items-center">
      <form
        onSubmit={handleSubmit}
        className="min-w-[300px] min-h-[200px] bg-white rounded p-2 flex flex-col items-start justify-around"
      >
        <h3 className="w-[80%] mx-auto text-red-500 font-semibold text-center text-lg">
          Delete Post!
        </h3>
        <div className="w-full flex flex-col">
            <input
            autoFocus
            onSubmit={(e) => e.preventDefault()}
            onChange={(e) => setPassword(e.target.value)}
            className={inputStyle}
            type="password"
            placeholder="Password..."
            />
            {inputErrorHandler()}
        </div>
        <div className="w-[80%] mx-auto flex flex-row-reverse items-center justify-between">
          <button className="bg-blue-400 text-white px-3 py-1 rounded">
            Confirm
          </button>
          <button
            onClick={() => dispatch(closeDeleteWindow())}
            className="bg-red-400 text-white px-3 py-1 rounded"
          >
            Discard
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeleteConfirmation;
