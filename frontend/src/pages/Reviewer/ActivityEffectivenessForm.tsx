import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
  name: string | null;
}

interface FormValues {
  selectedOptions: string[];
  other: string;
  rating: number | null;
  comments: string;
}

const schema = yup.object().shape({
  selectedOptions: yup
    .array()
    .of(yup.string())
    .test(
      "at-least-one",
      "Please select at least one area or fill out the 'Others' field.",
      function (value) {
        return (
          (value && value.length > 0) || this.parent.other.trim().length > 0
        );
      }
    ),
  other: yup.string(),
  rating: yup
    .number()
    .typeError("Please select a rating.")
    .required("Rating is required."),
  comments: yup.string().optional(),
});

const ActivityEffectivenessForm: React.FC<EvaluationFormData> = ({ name }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      selectedOptions: [],
      other: "",
      rating: null,
      comments: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = (data: FormValues) => {
    console.log("Submitted Data:", data);
  };

  const selectedOptions = watch("selectedOptions");
  const other = watch("other");

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
                {...register("selectedOptions")}
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
            {...register("other")}
            rows={3}
            className="w-full border p-2 rounded"
          />
        </div>
        {errors.selectedOptions && (
          <p className="text-red-500 text-sm mt-1">
            {errors.selectedOptions.message}
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
            name="rating"
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
          {errors.rating && (
            <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>
          )}
        </div>
      </div>

      {/* Section III */}
      <div>
        <h3 className="font-semibold mb-2">
          III. Other Observations/Feedback/Comments:
        </h3>
        <textarea
          {...register("comments")}
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
    </form>
  );
};

export default ActivityEffectivenessForm;
