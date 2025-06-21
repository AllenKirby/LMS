import { useState, useMemo } from 'react';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { TrainingDataState } from '../../types/CourseCreationTypes';

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';


interface TraineeTrainings {
  training_details: TrainingDataState;
  training: number;
  status: string;
}

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState<dayjs.Dayjs>(dayjs());
  const externalTrainings = useSelector(
    (state: { externalTrainingData: TraineeTrainings[] }) => state.externalTrainingData
  );

  const startOfMonth = currentDate.startOf('month');
  const endOfMonth = currentDate.endOf('month');
  const startDate = startOfMonth.startOf('week');
  const endDate = endOfMonth.endOf('week');

  const dateRange: dayjs.Dayjs[] = [];
  let date = startDate;

  while (date.isBefore(endDate) || date.isSame(endDate)) {
    dateRange.push(date);
    date = date.add(1, 'day');
  }

  const nextMonth = () => setCurrentDate(currentDate.add(1, 'month'));
  const prevMonth = () => setCurrentDate(currentDate.subtract(1, 'month'));

  // ✅ Map events by date (e.g. { '2025-03-07': [event1, event2], ... })
  const eventsByDate = useMemo(() => {
    const map: Record<string, TraineeTrainings[]> = {};
    externalTrainings.forEach(training => {
      const startDateStr = dayjs(training.training_details.start_date).format('YYYY-MM-DD');
      if (!map[startDateStr]) {
        map[startDateStr] = [];
      }
      map[startDateStr].push(training);
    });
    return map;
  }, [externalTrainings]);

  return (
    <div className="p-10 w-full mx-auto h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="px-4 py-2 bg-c-green-50 text-white rounded">
          <FaChevronLeft size={25}/>
        </button>
        <h2 className="text-xl font-bold">{currentDate.format('MMMM YYYY')}</h2>
        <button onClick={nextMonth} className="px-4 py-2 bg-c-green-50 text-white rounded">
          <FaChevronRight size={25}/>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center font-semibold text-gray-700">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 mt-2">
        {dateRange.map((date, index) => {
          const dateStr = date.format('YYYY-MM-DD');
          const isCurrentMonth = date.month() === currentDate.month();
          const todayEvents = eventsByDate[dateStr] || [];

          return (
            <div
              key={index}
              className={`h-28 border rounded p-1 cursor-pointer overflow-y-auto ${
                isCurrentMonth ? 'bg-white' : 'bg-gray-100 text-gray-400'
              }`}
            >
              <div className="text-sm font-bold">{date.date()}</div>

              {todayEvents.map((e, idx) => (
                <div key={idx} className=" bg-yellow-100 rounded px-1 mt-1 truncate">
                  {e.training_details.training_title || 'Untitled Training'}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
