import StateArrayModel from "../../../wrappers/StateModels/StateArrayModelGQL"
import { store } from "../../../index"
import { selectUserContent } from "../User/"

const Enrollments = new StateArrayModel({ stateName: "enrollments_new" })

Enrollments.setInitialState()

Enrollments.setFetchBody("fetchEnrollments")
Enrollments.setAddBody("postEnrollmentRequest")
// Enrollments.setDeleteBody("removeNotice")

Enrollments.createSlice()

export const {
  selectAddStatus, selectFetchStatus, selectEditStatus, selectDeleteStatus, selectData
} = Enrollments.getSelectors()

export const {
  stateName, reducer
} = Enrollments.getEntity()

export const {
  Fetch, Add, Remove
} = Enrollments.getAPIHandles()

export const FetchEnrollments = () => ({
  query: `query {
    fetchEnrollments {
      _id
      studentID
      courseID
      createdAt
      updatedAt
    }
  }`,
})

export const PostEnrollment = ({ courseID, studentID }) => {
  return {
    query: `mutation($studentID: String!, $courseID: String!) {
      postEnrollment(EnrollmentInput: {
      studentID: $studentID,
      courseID: $courseID
    }) {
      _id
      studentID
      courseID
      createdAt
      updatedAt
    }
  }`,
    variables: {
      courseID, studentID
    }
  }
}

export { selectData as selectEnrollments }