import StateArrayModel from "../../../wrappers/StateModels/StateArrayModelGQL"

const Courses = new StateArrayModel({ stateName: "courses_new" })

Courses.setInitialState()

Courses.setFetchBody("fetchCourses")
Courses.setAddBody("postCourse")
// Categories.setDeleteBody("removeNotice")

Courses.createSlice()

export const {
  selectAddStatus, selectFetchStatus, selectEditStatus, selectDeleteStatus, selectData
} = Courses.getSelectors()

export const {
  stateName, reducer
} = Courses.getEntity()

export const {
  Fetch, Add, Remove
} = Courses.getAPIHandles()

export const FetchCourses = () => ({
  query: `query {
    fetchCourses {
      _id
      title
      image
      briefIntroduction
      language
      numberOfChapters
      teacherID
      universityID
      categoryID
    }
  }`,
})

export const AddCourse = ({
  title, briefIntroduction, language, numberOfChapters, teacherID, universityID, categoryID, image
}) => ({
  query: `mutation(
    $title: String!, $briefIntroduction: String!, $language: String!, $numberOfChapters: Int!,
    $teacherID: String!, $universityID: String!, $categoryID: String!, $image: String!
  ) {
    postCourse(CourseInput: {
      title: $title,
      briefIntroduction: $briefIntroduction,
      language: $language,
      numberOfChapters: $numberOfChapters,
      teacherID: $teacherID,
      universityID: $universityID,
      categoryID: $categoryID,
      image: $image
    }) {
      _id
      title
      image
      briefIntroduction
      language
      numberOfChapters
      teacherID
      universityID
      categoryID
    }
  }`,
  variables: {
    title, briefIntroduction, language,
    numberOfChapters: Number(numberOfChapters),
    teacherID, universityID, categoryID, image
  }
})

export { selectData as selectCourses }