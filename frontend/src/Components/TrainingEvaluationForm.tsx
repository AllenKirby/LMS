import { Font, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import NotoSymbols from '/Arial-Unicode-MS.ttf'

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
  section: {
    marginTop: 10,
    marginBottom: 5,
  },
  fieldBox1: {
    border: '1px solid black',
    paddingTop: 2,
    paddingLeft: 5,
    fontWeight: 700,
    marginTop: 10
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
  }
});

const questions1 = [
  '1.Session',
  '1.1 The objectives were clearly explained',
  '1.2 The objectives were met',
  '1.3 It is substantial and extensive',
  '1.4 It provided information that is relevant to my actual job',
  '1.5 It provided activities that will help advance my professional skills',
  '1.6 The activities were appropriate to the participants',
  '1.7 The topics were properly sequenced',
  '1.8 The time allotted for each presentation was sufficient',
  '1.9 The schedule was followed',

  '2. Lecturers and Resource Speakers',
  '2.A Mastery of the subject matter',
  '2.A.1 They were knowledgeable about the subject matter',
  '2.A.2 They were confident in delivering the lecture',
  '2.A.3 They were able to cover all the significant topics',
  '2.A.4 They were able to address questions adequately',

  '2.B Presentation skills',
  '2.B.1 They clearly explained the concepts discussed',
  '2.B.2 They presented ideas and principles in an organized manner',
  '2.B.3 They gave substance to the discussion by mentioning other examples',
  '2.B.4 Their discussions were stimulating and interesting',
  '2.B.5 Their style of delivery was appropriate for the audience',
  '2.B.6 They gave clear instructions',
  '2.B.7 They presented learning materials in clear and logical manner',
  '2.B.8 Their pace of discussion was just right (not too slow, not too fast)',
  '2.B.9 They spoke clearly, audibly, fluently and smoothly on the topic',
  '2.B.10 They finished their presentation within the allotted time',

  '2.C Audience reactions',
  '2.C.1 They introduced themselves warmly',
  '2.C.2 They were able to encourage participation from the audience',
  '2.C.3 They were responsive to the needs of the participants',
  '2.C.4 They were able to establish a relaxed rapport with their audience',
  '2.C.5 They were able to establish a relaxed rapport with their audience',
  '2.C.6 They were accommodating and friendly',
  '2.C.7 They projected a professional but approachable image',
];

const questions2 = [
  "D. Appearance",
  "2.D.1 They are well groomed/neat",
  "2.D.2 They are properly dressed for the event",

  "3. Facilities",
  "3.1 The session room was clean and orderly",
  "3.2 The room was comfortable and conducive to learning",
  "3.3 The room temperature was neither too hot nor too cold",
  "3.4 There were adequate and proper lighting at the session room",
  "3.5 The computer was working well",
  "3.6 The equipment used helped enhance my learning",
  "3.7 The handouts were adequate",
  "3.8 I am satisfied with the quality of handouts",
  "3.9 The handouts were relevant to the course",
  "3.10 The training supplies were readily available",

  "4. Food",
  "4.1 The food tasted good",
  "4.2 The amount of food served was adequate",
  "4.3 The food was balanced and nutritious",
  "4.4 The meals were served at an appropriate time",
  "4.5 The menu was varied",
  "4.6 The plates, utensils, and other food containers were clean",

  "5. Training Support Team",
  "5.1 They are effective in facilitating the program",
  "5.2 They effectively managed the time",
  "5.3 They are responsive to the needs of the participants",
  "5.4 They are resourceful",
  "5.5 They are punctual"
];



const OverallActivityEvaluationForm = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <Text style={styles.centerText}>Republika ng Pilipinas</Text>
      <Text style={[styles.centerText, { fontSize: 13, fontWeight: 'bold' }]}>
        National Irrigation Administration
      </Text>
      <Text style={styles.centerText}>(PAMBANSANG PANGASIWAAN NG PATUBIG)</Text>
      <Text style={styles.centerText}>Lungog ng Quezon</Text>
      <Text style={[styles.centerText, styles.bold, { marginTop: 10 }]}>
        OVERALL ACTIVITY EVALUATION FORM
      </Text>

      {/* Activity Title */}
      <View style={styles.fieldBox1}>
        <Text>Activity Title:</Text>
      </View>

      {/* Training Dates and Venue */}
      <View style={styles.fieldBox2}>
        <Text>Training Dates and Venue:</Text>
      </View>

      {/* Participant Details */}
      <Text style={styles.section}>Name of participant: ____________________   Sex: ________   Age: _______</Text>
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
      <Text>○ Strongly Agree  ○ Agree  ○ Disagree  ○ Strongly Disagree  ○ Not Applicable</Text>
      <Text>b.) Once completed, please return this evaluation form to the training staff.</Text>

      {/* Part I */}
      <Text style={[styles.section, styles.bold]}>Part I (Learnings):</Text>
      <Text>What new information did you get from the activity? From what you learned, how do you plan to apply it to your work?</Text>

      {/* Lines for answers */}
      {[...Array(6)].map((_, i) => (
        <View key={i} style={styles.line} />
      ))}

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
                    <Text style={[{ fontSize: 8, fontWeight: 700, fontFamily: 'Noto Symbols'}, [0, 10, 11, 16, 27].includes(i) ? {marginLeft: 2} : {marginLeft: 15}]}>{question}</Text>
                </View>
                <View style={styles.answers}>
                    {['④', '③', '②', '①', '⓪'].map((choice, j) => {
                        if([0, 10, 11, 16, 27].includes(i)) {
                            return (
                                <View style={[{padding: 8}]}></View>
                            )
                        } else {
                            return (
                                <View key={j} style={[styles.choices, j === [...Array(5)].length - 1 ? { borderRight: 0 } : {}]}>
                                    <Text style={[{ fontSize: 8, fontWeight: 700, fontFamily: 'Noto Symbols', textAlign: 'center'}]}>{choice}</Text>
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
            <View  key={i} style={[styles.row, [0, 10, 11, 16, 27].includes(i) ? {backgroundColor: 'gray'} : {}]}>
                <View style={styles.question}>
                    <Text style={[{ fontSize: 8, fontWeight: 700, fontFamily: 'Noto Symbols'}, [0, 10, 11, 16, 27].includes(i) ? {marginLeft: 2} : {marginLeft: 15}]}>{question}</Text>
                </View>
                <View style={styles.answers}>
                    {['④', '③', '②', '①', '⓪'].map((choice, j) => {
                        if([0, 10, 11, 16, 27].includes(i)) {
                            return (
                                <View style={[{padding: 8}]}></View>
                            )
                        } else {
                            return (
                                <View key={j} style={[styles.choices, j === [...Array(5)].length - 1 ? { borderRight: 0 } : {}]}>
                                    <Text style={[{ fontSize: 8, fontWeight: 700, fontFamily: 'Noto Symbols', textAlign: 'center'}]}>{choice}</Text>
                                </View>
                            )
                        }
                    })}
                </View>
            </View>
        ))}
        <Text style={[styles.bold, styles.instructions]}>Part III (Comments)</Text>
        <Text>1. What are the things that you appreciate most about the activity?</Text>

        {/* Lines for answers */}
        {[...Array(3)].map((_, i) => (
          <View key={i} style={styles.line} />

        ))}<Text>2. What are the things that should be improved in this program?</Text>

        {/* Lines for answers */}
        {[...Array(3)].map((_, i) => (
          <View key={i} style={styles.line} />
        ))}
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Page 3 of 4</Text>
    </Page>
    <Page size="A4" style={[styles.page, {flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}]}>
      <View style={[{width: '100%'}]}>
        <Text>3. Did this activity help you? How?</Text>
        <View style={[{flexDirection: 'row', gap: 20, paddingLeft: 10, marginVertical: 7}]}>
          {['Yes', 'Neutral', 'No'].map((choice, i) => (
            <View key={i} style={[{flexDirection: 'row', gap: 2}]}>
              <View style={[{width: 15, height: 15, border: '1px solid black'}]}></View>
              <Text>{choice}</Text>
            </View>
          ))}
        </View>
        <Text style={[{padding: 10}]}>Reason/s:</Text>
        {/* Lines for answers */}
        {[...Array(3)].map((_, i) => (
          <View key={i} style={styles.line} />

        ))}
        <Text>4. Other Comments:</Text>

        {/* Lines for answers */}
        {[...Array(3)].map((_, i) => (
          <View key={i} style={styles.line} />
        ))}
        <Text style={{ marginTop: 20 }}>Thank you very much for your cooperation</Text>
      </View>
      <Text style={{ textAlign: 'center', marginTop: 20 }}>Page 4 of 4</Text>
    </Page>
  </Document>
);

export default OverallActivityEvaluationForm;
