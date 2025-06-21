import React, {useState} from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useReviewerHook } from "../../hooks";
import { MessageBox } from "../../Components";

const evaluationOptions: string[] = [
  "Work know-how",
  "Management/Supervisory Skills",
  "Oral Communication",
  "Written Communication",
  "Self-confidence",
  "Customer Service Skills",
  "Human Relations Skill",
  "Enthusiasm to Work",
];

const ratingDescriptions: Record<number, string> = {
  5: "Outstanding",
  4: "Very satisfactory",
  3: "Satisfactorily",
  2: "Somehow helpful",
  1: "No visible improvement",
};

interface EvaluationFormData {
  name: string;
  userID: number;
  programID: number;
  type: "course" | "training";
  onClose: () => void;
  getCourseParticipants: () => void;
  getTrainingParticipants: () => void;
}

interface FormValues {
  user: number;
  program_id: number;
  program_type: "course" | "training";
  program_evaluation: {
    improvement_list: string[];
    ratings: number | null;
    comments: string;
    others?: string;
  };
}

const schema = yup.object().shape({
  program_evaluation: yup.object().shape({
    improvement_list: yup
      .array()
      .of(yup.string())
      .test(
        "at-least-one",
        "Please select at least one area or fill out the 'Others' field.",
        function (value) {
          const others = this.parent?.others || "";
          return (value && value.length > 0) || others.trim().length > 0;
        }
      ),
    others: yup.string().optional(), // separate field for Others
    ratings: yup
      .number()
      .typeError("Please select a rating.")
      .required("Rating is required."),
    comments: yup.string().optional(),
  }),
});


const ActivityEffectivenessForm: React.FC<EvaluationFormData> = ({
  name,
  userID,
  programID,
  type,
  onClose,
  getTrainingParticipants,
  getCourseParticipants
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      user: userID,
      program_id: programID,
      program_type: type,
      program_evaluation: {
        improvement_list: [],
        ratings: null,
        comments: "",
        others: "",
      },
    },
  });
  const [showMessageBox, setShowMessageBox] = useState<boolean>(false);
  const [messageInfo, setMessageInfo] = useState<{status: 'success' | 'error' | 'warning' | 'info' | ''; title: string; message: string}>({
    status: "",
    title: "",
    message: ""
  });
  const { submitEvaluatedData } = useReviewerHook()

  const onSubmit = async(data: FormValues) => {
    const improvements = [...data.program_evaluation.improvement_list];

    const othersText = `others|${(data as FormValues).program_evaluation.others}`;
    if (othersText && othersText.trim() !== "") {
      improvements.push(othersText.trim());
    }

    // Clean the data: remove `others`
    const cleanedData = {
      ...data,
      program_evaluation: {
        ...data.program_evaluation,
        improvement_list: improvements,
      },
    };
    delete (cleanedData.program_evaluation as any).others;

    console.log("Submitted Data:", cleanedData);
    const response = await submitEvaluatedData(cleanedData)
    if(response) {
      setShowMessageBox(true);
      setMessageInfo({
        status: "success",
        title: 'Submitted Successfully!',
        message: "The evaluation has been submitted successfully.",
      }) 
      setTimeout(() => {
        setShowMessageBox(false);
        if(type === 'course') {
          getCourseParticipants();
        } else {
          getTrainingParticipants();
        }
        onClose()
      }, 2000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-1 flex flex-col gap-5 p-5"
    >
      <div className="w-full">
        <p className="font-medium">Name: {name}</p>
      </div>

      {/* Section I */}
      <div className="w-full">
        <h3 className="font-semibold mb-2">
          I. Areas of Improvement (Check all that apply):
        </h3>
        <div className="w-full grid grid-cols-2 gap-2">
          {evaluationOptions.map((option, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={option}
                {...register("program_evaluation.improvement_list")}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <div className="w-full mt-4">
          <label className="font-medium block mb-1">
            Others, please specify:
          </label>
          <textarea
            {...register("program_evaluation.others")}
            rows={3}
            className="w-full border p-2 rounded"
          />
        </div>
        {errors.program_evaluation?.improvement_list && (
          <p className="text-red-500 text-sm mt-1">
            {errors.program_evaluation.improvement_list.message}
          </p>
        )}
      </div>

      {/* Section II */}
      <div>
        <h3 className="font-semibold mb-2">
          II. Overall Effectiveness Rating:
        </h3>
        <div className="space-y-1">
          <Controller
            control={control}
            name="program_evaluation.ratings"
            render={({ field }) => (
              <>
                {[5, 4, 3, 2, 1].map((num) => (
                  <label key={num} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value={num}
                      checked={field.value === num}
                      onChange={() => field.onChange(num)}
                    />
                    <span>
                      {num} - {ratingDescriptions[num]}
                    </span>
                  </label>
                ))}
              </>
            )}
          />
          {errors.program_evaluation?.ratings && (
            <p className="text-red-500 text-sm mt-1">
              {errors.program_evaluation.ratings.message}
            </p>
          )}
        </div>
      </div>

      {/* Section III */}
      <div>
        <h3 className="font-semibold mb-2">
          III. Other Observations/Feedback/Comments:
        </h3>
        <textarea
          {...register("program_evaluation.comments")}
          rows={3}
          className="w-full border p-2 rounded"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Submit Evaluation
      </button>
      {showMessageBox && (<MessageBox status={messageInfo.status} title={messageInfo.title} message={messageInfo.message}/>)}
    </form>
  );
};

export default ActivityEffectivenessForm;
