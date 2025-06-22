import { Font, Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import NotoSymbols from '/Arial-Unicode-MS.ttf'
import NIALogo from '../assets/NIALogo.png'
import BagongPilipinas from '../assets/BagongPilipinasLogo.png'
import OfficeOfThePresident from '../assets/OOTPLogo.png'

import { SurveyAnswers, CoursesState } from '../types/CourseCreationTypes'

Font.register({
  family: 'Noto Symbols',
  src: NotoSymbols,
});

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 42,
    fontSize: 11,
    fontFamily: 'Helvetica',
    lineHeight: 1.5,
  },
  centerText: {
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
  userdata: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 10,
    marginTop: 10,
    marginBottom: 5,
  },
  data: {
    fontWeight: 700,
    marginLeft: 20,
    textDecoration: 'underline'
  },
  section: {
    marginTop: 10,
    marginBottom: 5,
  },
  fieldBox1: {
    border: '1px solid black',
    paddingTop: 2,
    paddingLeft: 5,
    fontWeight: 700,
    marginTop: 10,
    flexDirection: 'row',
    gap: 5
  },
  fieldBox2: {
    border: '1px solid black',
    paddingLeft: 5,
    paddingBottom: 7,
    marginTop: 7,
    fontWeight: 700
  },
  label: {
    marginTop: 5,
  },
  instructions: {
    marginTop: 10,
    marginBottom: 5,
  },
  line: {
    paddingHorizontal: 10,
    marginVertical: 10,
    borderBottom: '1px solid black',
    width: '100%',
  },
  row: {
    border: '1px solid black',
    margin: 0,
    flexDirection: 'row',
    height: 'auto'
  },
  question: {
    width: '66.6666%',
    borderRight: '1px solid black',
    height: 'auto'
  },
  answers: {
    width: '33.3333%',
    flexDirection: 'row',
    height: 'auto'
  },
  tableHeaderContainer: {
    width: '33.3333%',
    flexGrow: 1,
    flexBasis: 0
  },
  choicesContainer: {   
    width: '100%', 
    flexDirection: 'row'
  },
  choices: {
    width: '20%',
    borderRight: '1px solid black',
  },
  headerText: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 60
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

const questions1 = [
  { key:'1.', value: 'Session'},
  { key: "1.1", value: "The objectives were clearly explained" },
  { key: "1.2", value: "The objectives were met" },
  { key: "1.3", value: "It is substantial and extensive" },
  { key: "1.4", value: "It provided information that is relevant to my actual job" },
  { key: "1.5", value: "It provided activities that will help advance my professional skills" },
  { key: "1.6", value: "The activities were appropriate to the participants" },
  { key: "1.7", value: "The topics were properly sequenced" },
  { key: "1.8", value: "The time allotted for each presentation was sufficient" },
  { key: "1.9", value: "The schedule was followed" },
  { key:'2.', value: 'Lecturers and Resource Speakers'},
  { key:'A.', value: 'Mastery of the subject matter'},
  { key: "2.A.1", value: "They were knowledgeable about the subject matter" },
  { key: "2.A.2", value: "They were confident in delivering the lecture" },
  { key: "2.A.3", value: "They were able to cover all the significant topics" },
  { key: "2.A.4", value: "They were able to address questions adequately" },
  { key:'B.', value: 'Presentation skills'},
  { key: "2.B.1", value: "They clearly explained the concepts discussed" },
  { key: "2.B.2", value: "They presented ideas and principles in an organized manner" },
  { key: "2.B.3", value: "They gave substance to the discussion by mentioning other examples" },
  { key: "2.B.4", value: "Their discussions were stimulating and interesting" },
  { key: "2.B.5", value: "Their style of delivery was appropriate for the audience" },
  { key: "2.B.6", value: "They gave clear instructions" },
  { key: "2.B.7", value: "They presented learning materials in clear and logical manner" },
  { key: "2.B.8", value: "Their pace of discussion was just right (not too slow, not too fast)" },
  { key: "2.B.9", value: "They spoke clearly, audibly, fluently and smoothly on the topic" },
  { key: "2.B.10", value: "They finished their presentation within the allotted time" },
  { key:'C.', value: 'Audience reactions'},
  { key: "2.C.1", value: "They introduced themselves warmly" },
  { key: "2.C.2", value: "They were able to encourage participation from the audience" },
  { key: "2.C.3", value: "They were responsive to the needs of the participants" },
  { key: "2.C.4", value: "They were able to establish a relaxed rapport with their audience" },
  { key: "2.C.5", value: "They were able to establish a relaxed rapport with their audience" },
  { key: "2.C.6", value: "They were accommodating and friendly" },
  { key: "2.C.7", value: "They projected a professional but approachable image" }
];

const questions2 = [
  { key:'D.', value: 'Appearance'},
  { key: "2.D.1", value: "They are well groomed/neat" },
  { key: "2.D.2", value: "They are properly dressed for the event" },
  { key:'3.', value: 'Facilities'},
  { key: "3.1", value: "The session room was clean and orderly" },
  { key: "3.2", value: "The room was comfortable and conducive to learning" },
  { key: "3.3", value: "The room temperature was neither too hot nor too cold" },
  { key: "3.4", value: "There were adequate and proper lighting at the session room" },
  { key: "3.5", value: "The computer was working well" },
  { key: "3.6", value: "The equipment used helped enhance my learning" },
  { key: "3.7", value: "The handouts were adequate" },
  { key: "3.8", value: "I am satisfied with the quality of handouts" },
  { key: "3.9", value: "The handouts were relevant to the course" },
  { key: "3.10", value: "The training supplies were readily available" },
  { key:'4.', value: 'Food'},
  { key: "4.1", value: "The food tasted good" },
  { key: "4.2", value: "The amount of food served was adequate" },
  { key: "4.3", value: "The food was balanced and nutritious" },
  { key: "4.4", value: "The meals were served at an appropriate time" },
  { key: "4.5", value: "The menu was varied" },
  { key: "4.6", value: "The plates, utensils, and other food containers were clean" },
  { key:'5.', value: 'Training Support Team'},
  { key: "5.1", value: "They are effective in facilitating the program" },
  { key: "5.2", value: "They effectively managed the time" },
  { key: "5.3", value: "They are responsive to the needs of the participants" },
  { key: "5.4", value: "They are resourceful" },
  { key: "5.5", value: "They are punctual" }
];

interface UserDataState {
  name: string;
  sex: string;
  birthdate: string;
}

type OverallActivityEvaluationFormProps = {
  surveyAnswers: SurveyAnswers;
  userData: UserDataState;
  courseData: CoursesState;
}

const OverallActivityEvaluationForm: React.FC<OverallActivityEvaluationFormProps> = (props) => {
  const { surveyAnswers, userData, courseData } = props

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={[{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', position: 'relative'}]}>
            <Image src={OfficeOfThePresident} style={[{width: 80, height: 53, position: 'absolute', left: -15}]}/>
            <Image src={NIALogo} style={[{width: 50, height: 48, position: 'absolute', left: 60}]}/>
          </View>
          <View style={styles.headerText}>
            <Text style={styles.centerText}>Republic of the Philippines</Text>
            <Text style={styles.centerText}>Office of the President</Text>
            <Text style={[styles.centerText, { fontSize: 13, fontWeight: 'bold' }]}>
              National Irrigation Administration
            </Text>
            <Text style={styles.centerText}>Regional Office No. IV-A (CALABARZON)</Text>
          </View>
          <Image src={BagongPilipinas} style={[{width: 68, height: 68}]}/>
        </View>
        <Text style={[styles.centerText, styles.bold, { marginTop: 10 }]}>
          OVERALL ACTIVITY EVALUATION FORM
        </Text>

        {/* Activity Title */}
        <View style={styles.fieldBox1}>
          <Text>Activity Title:</Text>
          <Text style={styles.data}>{courseData.course_title}</Text>
        </View>

        {/* Training Dates and Venue */}
        <View style={styles.fieldBox2}>
          <Text>Training Dates and Venue:</Text>
        </View>

        {/* Participant Details */}
        <View style={styles.userdata}>
          <Text>Name of participant:</Text>
          <Text style={styles.data}>{userData.name}</Text>
          <Text>Sex:</Text>
          <Text style={styles.data}>{userData.sex.charAt(0).toUpperCase() + userData.sex.slice(1)}</Text>
          <Text>Age:</Text>
          <Text style={styles.data}>{userData.birthdate}</Text> 
        </View>
        <Text>(optional)</Text>

        {/* Paragraph */}
        <Text style={styles.section}>
          We give utmost importance on what you have to say about the just concluded activity. This questionnaire was developed to determine what you gained from the above activity as well as gauge your level of satisfaction on it.
        </Text>
        <Text>
          Information from this survey will give us an overview of your observations and recommendations. They will also be used to find ways where we can innovate and deliver the kind of service that will give value to training participants. Rest assured that your answers will be treated with utmost confidentiality.
        </Text>

        {/* Instructions */}
        <Text style={[styles.bold, styles.instructions]}>Instructions:</Text>
        <Text>
          For Part I and Part III, please provide specific responses. Part I must not be left unanswered; answer must be in sentence form.
        </Text>
        <Text>
          For Part II:
        </Text>
        <Text>a.) Put an X on the circle corresponding to your answer using the following scale:</Text>
        <Text> ④ Strongly Agree  ③ Agree  ②' Disagree  ① Strongly Disagree  ⓪ Not Applicable</Text>
        <Text>b.) Once completed, please return this evaluation form to the training staff.</Text>

        {/* Part I */}
        <Text style={[styles.section, styles.bold]}>Part I (Learnings):</Text>
        <Text>What new information did you get from the activity? From what you learned, how do you plan to apply it to your work?</Text>

        {/* Lines for answers
        {[...Array(6)].map((_, i) => (
          <View key={i} style={styles.line} />
        ))} */}
        <Text style={styles.data}>{surveyAnswers.survey.learnings}</Text>

        <Text style={{ textAlign: 'center', marginTop: 20 }}>Page 1 of 4</Text>
      </Page>
      <Page size='A4' style={styles.page}>
          <Text style={[styles.bold, styles.instructions]}>Part II (Administrative and Lecturer Concerns)</Text>
          <View style={styles.row}>
              <View style={styles.question}></View>
              <View style={styles.tableHeaderContainer}>
                  <View style={[{width: '100%', borderBottom: '1px solid black'}]}>
                      <Text style={[{ fontSize: 10, textAlign: 'center', fontWeight: 700}]}>Rating Scale</Text>
                  </View>
                  <View style={styles.choicesContainer}>
                      {['SA', 'A', 'D', 'SD', 'NA'].map((choice,i) => (
                          <View key={i} style={[styles.choices, i === ['SA', 'A', 'D', 'SD', 'NA'].length - 1 ? { borderRight: 0 } : {}]}>
                              <Text style={[{ fontSize: 10, textAlign: 'center', fontWeight: 700}]}>{choice}</Text>
                          </View>
                      ))}
                  </View>
              </View>
          </View>
          {questions1.map((question,i) => (
              <View  key={i} style={[styles.row, [0, 10, 11, 16, 27].includes(i) ? {backgroundColor: 'gray'} : {}]}>
                  <View style={styles.question}>
                      <Text style={[{ fontSize: 8, fontWeight: 700, fontFamily: 'Noto Symbols'}, [0, 10, 11, 16, 27].includes(i) ? {marginLeft: 2} : {marginLeft: 15}]}>{`${question.key} ${question.value}`}</Text>
                  </View>
                  <View style={styles.answers}>
                      {[{key: 5, value: '④'}, {key: 4, value: '③'}, {key: 3, value: '②'}, {key: 2, value: '①'}, {key: 1, value: '⓪'}].map((choice, j) => {
                          if([0, 10, 11, 16, 27].includes(i)) {
                              return (
                                  <View style={[{padding: 8}]}></View>
                              )
                          }
                          else {
                            return (
                              <View 
                                key={j} 
                                  style={[
                                    styles.choices, 
                                    { justifyContent: 'center', alignItems: 'center', position: 'relative' },
                                    j === [...Array(5)].length - 1 ? { borderRight: 0 } : {}]}>
                                  <Text style={[{ 
                                    fontSize: 8, 
                                    fontWeight: 700, 
                                    fontFamily: 'Noto Symbols', 
                                    textAlign: 'center',
                                    position: 'absolute'}]}>{choice.value}</Text>
                                    {surveyAnswers.survey.survey[question.key as keyof SurveyAnswers['survey']['survey']] === choice.key && ( // replace with your condition
                                      <Text
                                        style={{
                                          fontSize: 8,
                                          fontWeight: '700',
                                          fontFamily: 'Noto Symbols',
                                          textAlign: 'center',
                                          position: 'absolute'
                                        }}
                                      >
                                        X
                                      </Text>
                                    )}
                              </View>
                            )
                          }
                      })}
                  </View>
              </View>
          ))}
          <Text style={{ textAlign: 'center', marginTop: 20 }}>Page 2 of 4</Text>
      </Page>
      <Page size='A4' style={styles.page}>
        {questions2.map((question,i) => (
              <View  key={i} style={[styles.row, [0, 3, 14, 21].includes(i) ? {backgroundColor: 'gray'} : {}]}>
                  <View style={styles.question}>
                      <Text style={[{ fontSize: 8, fontWeight: 700, fontFamily: 'Noto Symbols'}, [0, 10, 11, 16, 27].includes(i) ? {marginLeft: 2} : {marginLeft: 15}]}>{`${question.key} ${question.value}`}</Text>
                  </View>
                  <View style={styles.answers}>
                      {[{key: 5, value: '④'}, {key: 4, value: '③'}, {key: 3, value: '②'}, {key: 2, value: '①'}, {key: 1, value: '⓪'}].map((choice, j) => {
                          if([0, 3, 14, 21].includes(i)) {
                              return (
                                  <View style={[{padding: 8}]}></View>
                              )
                          } else {
                            return (
                              <View 
                                key={j} 
                                  style={[
                                    styles.choices, 
                                    { justifyContent: 'center', alignItems: 'center', position: 'relative' },
                                    j === [...Array(5)].length - 1 ? { borderRight: 0 } : {}]}>
                                  <Text style={[{ 
                                    fontSize: 8, 
                                    fontWeight: 700, 
                                    fontFamily: 'Noto Symbols', 
                                    textAlign: 'center',
                                    position: 'absolute'}]}>{choice.value}</Text>
                                    {surveyAnswers.survey.survey[question.key  as keyof SurveyAnswers['survey']['survey']] === choice.key && ( // replace with your condition
                                      <Text
                                        style={{
                                          fontSize: 8,
                                          fontWeight: '700',
                                          fontFamily: 'Noto Symbols',
                                          textAlign: 'center',
                                          position: 'absolute'
                                        }}
                                      >
                                        X
                                      </Text>
                                    )}
                              </View>
                            )
                          }
                      })}
                  </View>
              </View>
          ))}
          <Text style={[styles.bold, styles.instructions]}>Part III (Comments)</Text>
          <Text>1. What are the things that you appreciate most about the activity?</Text>
          <Text style={styles.data}>{surveyAnswers.survey.comments1}</Text>
          <Text>2. What are the things that should be improved in this program?</Text>
          <Text style={styles.data}>{surveyAnswers.survey.comments2}</Text>
          <Text style={{ textAlign: 'center', marginTop: 20 }}>Page 3 of 4</Text>
      </Page>
      <Page size="A4" style={[styles.page, {flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}]}>
        <View style={[{width: '100%'}]}>
          <Text>3. Did this activity help you? How?</Text>
          <View style={[{flexDirection: 'row', gap: 20, paddingLeft: 10, marginVertical: 7}]}>
            {['Yes', 'Neutral', 'No'].map((choice, i) => (
              <View key={i} style={[{flexDirection: 'row', gap: 2}]}>
                <View style={[{width: 20, height: 20, border: '1px solid black', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}]}>
                  <Text>{surveyAnswers.survey.comments3.split("|")[0] === choice ? 'X' : ''}</Text>
                </View>
                <Text>{choice}</Text>
              </View>
            ))}
          </View>
          <Text style={[{padding: 10}]}>Reason/s:</Text>
          <Text style={styles.data}>{surveyAnswers.survey.comments3.split("|")[1]}</Text>
          <Text>4. Other Comments:</Text>
          <Text style={styles.data}>{surveyAnswers.survey.comments4}</Text>
        
          <Text style={{ marginTop: 20 }}>Thank you very much for your cooperation</Text>
        </View>
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Page 4 of 4</Text>
      </Page>
    </Document>
  )
};

export default OverallActivityEvaluationForm;
