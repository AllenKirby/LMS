import {CoursesState} from '../types/CourseCreationTypes'
import {UserState} from '../types/UserTypes'

interface TraineeCourses {
  course: CoursesState
  participant_status: string
}



const CoursesFunctions = () => {

    const getCurrentTimeOfDay = () => {
      const hour = new Date().getHours(); // 0–23

      if (hour >= 5 && hour < 12) {
        return "Good Morning!";
      } else if (hour >= 12 && hour < 17) {
        return "Good Afternoon!";
      } else {
        return "Good Evening!"; // covers 17:00 to 04:59
      }
    }

    const filterCoursesStatus = (status: string, courses: TraineeCourses[]) => {
        if(!status) return courses
        return courses.filter(course => course.participant_status === status)
    }

    const convertDate = (rawDate: string) => {
      const date = new Date(rawDate);
      const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
      return date.toLocaleDateString("en-US", options);
    }

    const sortCourses = (array: CoursesState[] | TraineeCourses[], user: UserState, sort: string = '') => {
        if (array.length === 0) return [];
        console.log(array)
        return [...array].sort((a, b) => {
          if (user.user.role === 'training_officer') {
            const dateA = new Date((a as CoursesState).created_at).getTime() || 0;
            const dateB = new Date((b as CoursesState).created_at).getTime() || 0;
            return dateB - dateA; // Always latest for training officer
          }
    
          const courseA = (a as TraineeCourses).course;
          const courseB = (b as TraineeCourses).course;
    
          if (sort === 'Latest') {
            const dateA = new Date(courseA?.created_at).getTime() || 0;
            const dateB = new Date(courseB?.created_at).getTime() || 0;
            return dateB - dateA;
          }
    
          if (sort === 'A-Z') {
            return courseA.course_title.localeCompare(courseB.course_title);
          }
    
          if (sort === 'Z-A') {
            return courseB.course_title.localeCompare(courseA.course_title);
          }
    
          // Default to 'latest' if sort is not recognized
          const dateA = new Date(courseA.created_at).getTime() || 0;
          const dateB = new Date(courseB.created_at).getTime() || 0;
          return dateB - dateA;
        });
      };

      const isSixMonthsAgoOrMore = (isoDateString: string) => {
        const inputDate = new Date(isoDateString);
        const today = new Date();

        const sixMonthsAgo = new Date(today);
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        return inputDate <= sixMonthsAgo;
      };

  return { filterCoursesStatus, convertDate, sortCourses, isSixMonthsAgoOrMore, getCurrentTimeOfDay }
}

export default CoursesFunctions