import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type DatePickerType = {
    selectedDate: Date | null;
    setSelectedDate: (date: Date | null) => void;
}

const DatePickerComponent: React.FC<DatePickerType> = ({selectedDate, setSelectedDate}) => {
    return (
        <DatePicker 
          selected={selectedDate} 
          onChange={(date) => setSelectedDate(date)} 
          dateFormat="yyyy-MM-dd" 
          placeholderText="Select a date"
        />
    );
};

export default DatePickerComponent;