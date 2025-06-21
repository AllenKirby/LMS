import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image
} from '@react-pdf/renderer';

import NIALogo from '../assets/NIALogo.png'
import BagongPilipinas from '../assets/BagongPilipinasLogo.png'
import OfficeOfThePresident from '../assets/OOTPLogo.png'

import { TrainingEvaluation } from '../types/CourseCreationTypes'
import CoursesFunctions from '../utils/CoursesFunctions';
import React from 'react';

// Styles
const styles = StyleSheet.create({
    page: { 
        padding: 20, 
        fontSize: 10, 
        fontFamily: 'Helvetica' 
    },
    section: { 
        marginVertical: 5,
        border: '1px solid black' ,
        flexDirection: 'column'
    },
    row: { 
        flexDirection: 'row', 
    },
    label: { 
        fontWeight: 700 
    },
    value: {
        fontWeight: 500, 
        textAlign: 'center', 
        marginVertical: 2
    },
    checkboxGroup: { 
      marginVertical: 8,
      flexDirection: 'row',
      paddingHorizontal: 10,
      gap: 8 
    },
    checkboxColumn: {
      flexDirection: 'column',
      width: '33.333333%'
    },
    checkboxItem: { 
      flexDirection: 'row', 
      alignItems: 'center', 
      marginBottom: 2 
    },
    checkbox: {
      width: 10,
      height: 10,
      border: '1pt solid black',
      marginRight: 5,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 5
    },
    title: { 
      fontSize: 12, 
      fontWeight: 'bold', 
      textAlign: 'center', 
      marginBottom: 5 
    },
    box: { 
      border: '1pt solid black', 
      padding: 5, 
      marginBottom: 5 
    },
    paragraph: {
      textAlign: 'justify',
      fontWeight: 'bold',
      textDecoration: 'underline',
      lineHeight: 1.3,
      fontSize: 10, 
    },
    signatureBox: { 
      marginTop: 20,  
      paddingTop: 5 
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
  },
  centerText: {
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
});

type ActivityEffectivenessFormProps = {
  data: TrainingEvaluation;
}

// PDF Component
const ActivityEffectivenessForm: React.FC<ActivityEffectivenessFormProps> = (props) => {
  const { data } = props
  const { convertDate } = CoursesFunctions();
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
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
        <Text style={styles.title}>
            Activity Effectiveness Form
        </Text>
        <Text style={[{marginBottom: 3}]}>
            We are seeking your response to this questionnaire, being the participant's immediate superior, in order to assess the
            impact of a concluded course/training program on him/her. It consists of questions on how the subject trainee benefited
            from participating in a course/training program and if s/he applied her/his acquired information, skills, changed attitude
            etc. in her/his professional life since completing the course/training.
        </Text>
        <Text style={[{marginBottom: 3}]}>
            You are requested to go through the set of questions and complete this questionnaire by providing concrete/specific
            responses. Your answers will be essential for us to understand which aspects of the course/training have been most
            useful and/or how we may improve it.
        </Text>
        <Text>
            If you have any questions on the survey, please do not hesitate to contact the Training and Career Development Section
            at telephone numbers (02)928-4287 or (02)929-6071 local 176. Thank you for your time and cooperation.
        </Text>

        {/* Participant Info */}
        <View style={styles.section}>
            <View style={styles.row}>
                <View style={[{width: '33.333333%', padding: 3, borderRight: '1px solid black', borderBottom: '1px solid black', flexDirection: 'column'}]}>
                    <Text style={styles.label}>Name of Employee:</Text>
                    <Text style={styles.value}>{`${data.employee_details.first_name} ${data.employee_details.last_name}`}</Text>
                </View>
                <View style={[{width: '33.333333%', padding: 3, borderRight: '1px solid black', borderBottom: '1px solid black', flexDirection: 'column'}]}>
                    <Text style={styles.label}>Position Title:</Text>
                    <Text style={styles.value}>{data.employee_details.designation ? data.employee_details.designation : 'N/A'}</Text>
                </View>
                <View style={[{width: '33.333333%', padding: 3, borderBottom: '1px solid black', flexDirection: 'column'}]}>
                    <Text style={styles.label}>Department/Office:</Text>
                    <Text style={styles.value}>{data.employee_details.department ? data.employee_details.department : 'N/A'}</Text>
                </View>
            </View>
            <View style={[{width: '100%', padding: 3, borderBottom: '1px solid black', flexDirection: 'column'}]}>
                <Text style={styles.label}>Training Program/Seminar Title:</Text>
                <Text style={styles.value}>{data.program_details.program_title}</Text>
            </View>
            <View style={styles.row}>
                <View style={[{width: '33.333333%', padding: 3, borderRight: '1px solid black', flexDirection: 'column'}]}>
                    <Text style={styles.label}>Inclusive Dates:</Text>
                    <Text style={styles.value}>{data.program_details.start_date && data.program_details.end_date ? `${convertDate(data.program_details.start_date)} - ${convertDate(data.program_details.end_date)}` : 'N/A'}</Text>
                </View>
                <View style={[{width: '66.666667%', padding: 3, flexDirection: 'column'}]}>
                    <Text style={styles.label}>Venue:</Text>
                    <Text style={styles.value}>{data.program_details.venue ? data.program_details.venue : 'N/A'}</Text>
                </View>
            </View>
        </View>

      {/* Objective */}
      <View>
        <Text style={{ fontWeight: 'bold' }}>TRAINING/SEMINAR/ACTIVITY OBJECTIVE/S</Text>
        <Text>
          I. As a result of the training/seminar/activity, in which of the following areas does the participant manifest improvement, if any? Check all that are applicable.
        </Text>
        <View style={styles.checkboxGroup}>
          <View style={styles.checkboxColumn}>
            {[
              'Work know-how',
              'Management/Supervisory Skills',
              'Oral Communication',
              'Written Communication'
            ].map((item, i) => (
              <View style={styles.checkboxItem} key={i}>
                <View style={styles.checkbox}>
                  <Text>{data.evaluation_details.program_evaluation.improvement_list.includes(item) ? 'X' : ''}</Text>
                </View>
                <Text>{item}</Text>
              </View>
            ))}
          </View>
          <View style={styles.checkboxColumn}>
            {[
              'Self-confidence',
              'Customer Service Skills',
              'Human Relations Skills',
              'Orientation to Work',
            ].map((item, i) => (
              <View style={styles.checkboxItem} key={i}>
                <View style={styles.checkbox}>
                  <Text>{data.evaluation_details.program_evaluation.improvement_list.includes(item) ? 'X' : ''}</Text>
                </View>
                <Text>{item}</Text>
              </View>
            ))}
          </View>
          <View style={styles.checkboxColumn}>
            <View style={styles.checkboxItem}>
              <View style={styles.checkbox}>
                <Text>{data.evaluation_details.program_evaluation.improvement_list.some(item => item.includes('others')) ? 'X' : ''}</Text>
              </View>
              <Text>Others, pls. specify:</Text>
            </View>
            <Text style={styles.paragraph}>
              {data.evaluation_details.program_evaluation.improvement_list.some(item => item.includes('other')) ? (
                  (() => {
                    const otherString = data.evaluation_details.program_evaluation.improvement_list.find(item => item.includes('other'));
                    return otherString ? otherString.split('|')[1] : '';
                  })()
                ) : (
                  ''
                ) 
              }
            </Text>
          </View>
        </View>
      </View>

      {/* Evaluation */}
      <View>
        <Text style={{ fontWeight: 'bold' }}>II. Knowledge and the appropriateness rating</Text>
        <Text>
          Kindly encircle the appropriate rating of the over-all effectiveness of the training/seminar/activity program.
        </Text>
        <View style={styles.checkboxGroup}>
          <View>
            {[
              'The training contributed to the effective discharge of his/her job functions.',
              'The information acquired is highly usable in their current functions.',
              'The relationship between the topic and the job is clear and applicable.',
              'The training/seminar/activity helped to enhance the effectiveness of his/her job functions.',
              'The respondent strongly believes that the training/seminar is of no help to the improvement of his/her job functions.',
            ].map((item, i) => (
              <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 2, gap: 5}} key={i}>
                {i + 1 === data.evaluation_details.program_evaluation.ratings && <View style={{position: 'absolute', left: -4, border: '1px solid black', borderRadius: 50, width: 13, height: 13, textAlign: 'center', alignItems: 'center', justifyContent: 'center'}}></View>}
                <Text key={i}>{i + 1}</Text>
                <Text key={i}>-</Text>
                <Text key={i}>{item}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Other Comments */}
      <View>
        <Text style={{ fontWeight: 'bold' }}>III. Other Observations/feedback/comments:</Text>
        <Text style={[styles.paragraph, {marginHorizontal: 10, marginVertical: 5}]}>{data.evaluation_details.program_evaluation.comments}</Text>
      </View>

      {/* Signatures */}
      <View style={styles.signatureBox}>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '66.666667%'}}>
            <Text>Prepared by:</Text>
            <Text style={{ marginTop: 5 }}>_________________________________________</Text>
            <Text style={{ marginTop: 3 }}>Printed name and signature of Trainees' Immediate Supervisor</Text>
          </View>
          <View style={{width: '33.333333%', alignItems: 'flex-start', marginTop: 9}}>
            <View>
              <Text style={{ marginTop: 5 }}>_______________</Text>
              <Text style={{ marginTop: 3, paddingHorizontal: 30 }}>Date</Text>
            </View>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <View style={{width: '66.666667%'}}>
            <Text>Prepared by:</Text>
            <Text style={{ marginTop: 5 }}>_________________________________________</Text>
            <Text style={{ marginTop: 3 }}>Printed name and signature of next higher manager</Text>
          </View>
          <View style={{width: '33.333333%', alignItems: 'flex-start', marginTop: 9}}>
            <View>
              <Text style={{ marginTop: 5 }}>_______________</Text>
              <Text style={{ marginTop: 3, paddingHorizontal: 30 }}>Date</Text>
            </View>
          </View>
        </View>
      </View>
    </Page>
  </Document>
  )
};

export default ActivityEffectivenessForm;
