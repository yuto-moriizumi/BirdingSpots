import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { MONTH } from "@/model/Month";
import { Button } from "../../.@/components/ui/button";
import { Schema } from "./schema";

interface EditableBirdFieldsProps {
  index: number;
  bird: Schema["birds"][number];
  control: Control<Schema>;
  register: UseFormRegister<Schema>;
  remove: (index: number) => void;
  errors: FieldErrors<Schema>;
}

/** ある鳥に対して、1月～12月の各月の出現頻度を入力できるフィールド */
export function DynamicBirdField({
  index,
  bird,
  register,
  remove,
  errors,
}: EditableBirdFieldsProps) {
  return (
    <div className="space-y-3 border p-3 rounded-md">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{bird.name}</h3>
        <Button onClick={() => remove(index)} size="sm" variant="destructive">
          Remove Bird
        </Button>
      </div>
      <p className="text-sm text-gray-600">Image URL: {bird.imageUrl}</p>
      <p className="text-sm text-gray-600">Bird ID: {bird.id}</p>
      {MONTH.map((month) => (
        <label key={month} className="flex items-center space-x-2">
          <span className="text-gray-700 w-16">{month}:</span>
          <input
            type="number"
            step="0.001"
            min="0"
            max="1"
            {...register(`birds.${index}.${month}Frequency.0`)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <input
            type="number"
            step="0.001"
            min="0"
            max="1"
            {...register(`birds.${index}.${month}Frequency.1`)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <input
            type="number"
            step="0.001"
            min="0"
            max="1"
            {...register(`birds.${index}.${month}Frequency.2`)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.birds?.[index]?.[`${month}Frequency`] && (
            <p className="text-red-500 text-xs">
              {/* Accessing message directly if it exists, or providing a generic error */}
              {errors.birds[index]?.[`${month}Frequency`]?.message ||
                "Invalid frequency"}
            </p>
          )}
        </label>
      ))}
    </div>
  );
}
