import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editGrade, deleteTest } from "../../../Redux/actions/studentActions";
import "./EditGradeComponent.css";
import AddGrade from "./AddGrade";
const EditGradeComponent = ({ handleFnc }) => {
  const student = useSelector((state) => state.student);
  const dispatch = useDispatch();
  
  const [editTest, setEditTest] = useState({ isEdit: false, testId: "" });
  
  const [updateTest, setUpdateTest] = useState({
    studentId: student._id,
  });
  const [testDelete, setTestDelete] = useState({
    studentId: student._id,
  });
  useEffect(() => dispatch(deleteTest(testDelete)), [testDelete.testId]);

  const HandleChange = (e) => {
    setUpdateTest({
      ...updateTest,
      [e.target.name]: e.target.value,
      gradeId: editTest.testId,
    });
  };
  return (
    <div className="student-info">
      <h3>
        {student?.firstName} {student?.lastName}
      </h3>
      {student?.tests.map((test, index) => {
        return (
          <div key={index}>
            <h4>{test.name}</h4>
            {editTest.isEdit && editTest.testId === test._id ? (
              <>
                <input
                  type="number"
                  placeholder={test.grade}
                  name="grade"
                  onChange={(e) => HandleChange(e)}
                />
                <i
                  onClick={() => {
                    dispatch(editGrade(updateTest));
                    setEditTest({
                      isEdit: false,
                      testId: test._id,
                    });
                  }}
                  className="fas fa-check-square"
                ></i>
              </>
            ) : (
              <p>
                {test.grade}
                <i
                  onClick={() => {
                    setEditTest({ isEdit: true, testId: test._id });
                  }}
                  className="far fa-edit"
                ></i>
                <i
                  onClick={() => {
                    setTestDelete({ ...testDelete, testId: test._id })
                  }}
                  className="far fa-trash-alt"
                ></i>
              </p>
            )}
          </div>
        );
      })}
      <AddGrade studentId={student._id} />
      <button className="btn " onClick={() => handleFnc()}>
        סגור
      </button>
    </div>
  );
};

export default EditGradeComponent;
