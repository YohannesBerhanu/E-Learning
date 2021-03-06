import StateArrayModel from "../../../wrappers/StateModels/StateArrayModelGQL"

const Teachers = new StateArrayModel({ stateName: "teachers_new" })

Teachers.setInitialState()
Teachers.setFetchBody("fetchTeachers")
Teachers.setAddBody("postTeacher")
Teachers.setEditBody("editTeacher")
Teachers.setDeleteBody("removeTeacher")

Teachers.createSlice()

export const {
  selectAddStatus, selectFetchStatus, selectEditStatus, selectDeleteStatus, selectData
} = Teachers.getSelectors()

export const {
  stateName, reducer
} = Teachers.getEntity()

export const {
  Fetch, Add, Remove, Edit
} = Teachers.getAPIHandles()

export const FetchTeachers = () => ({
  query: `query {
    fetchTeachers {
      _id
      firstName
      lastName
      email
      qualification
      briefIntroduction
      image
      createdAt
      updatedAt
    }
  }`,
})

export const AddTeacher = ({
  firstName, lastName, email, qualification, briefIntroduction
}) => ({
  query: `mutation(
    $firstName: String!, $lastName: String!, $email: String!, $qualification: String!, $briefIntroduction: String!
  ) {
    postTeacher(TeacherInput: {
      firstName: $firstName,
      lastName: $lastName,
      email: $email,
      qualification: $qualification,
      briefIntroduction: $briefIntroduction,
      image: "some_image"
    }) {
      _id
      firstName
      lastName
      email
      qualification
      briefIntroduction
      image
      createdAt
      updatedAt
      error {
        type
        message
      }
    }
  }`,
  variables: {
    firstName, lastName, email, qualification, briefIntroduction
  }
})

export const EditTeacher = ({
  id, firstName, lastName, email, qualification, briefIntroduction
}) => ({
  query: `mutation(
    $id: String!, $firstName: String!, $lastName: String!, $email: String!,
    $qualification: String!, $briefIntroduction: String!
  ) {
    editTeacher(TeacherEdit: {
      _id: $id,
      firstName: $firstName,
      lastName: $lastName,
      email: $email,
      qualification: $qualification,
      briefIntroduction: $briefIntroduction,
      image: "some_image"
    }) {
      _id
      firstName
      lastName
      email
      qualification
      briefIntroduction
      image
      createdAt
      updatedAt
      error {
        type
        message
      }
    }
  }`,
  variables: {
    id, firstName, lastName, email, qualification, briefIntroduction
  }
})

export const RemoveTeacher = (id) => ({
  query: `mutation($id: String!) {
    removeTeacher(_id: $id) {
      _id
      firstName
      lastName
      email
      qualification
      briefIntroduction
      image
      createdAt
      updatedAt
      error {
        type
        message
      }
    }
  }`,
  variables: {
    id
  }
})

export { selectData as selectTeachers }