"use client";

import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MONTH } from "@/model/Month";
import { Spot } from "@/model/Spot";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { Button } from "../../_components/Button";
import { addSpot } from "../_util/addSpot";
import { BirdForm } from "./BirdForm";
import { URLForm } from "./URLForm";

const frequencySchema = z.array(z.number().min(0).max(1)).length(3);
const schema = z.object({
  id: z.string().nonempty(),
  name: z.string().nonempty(),
  address: z.string().nonempty(),
  Jan: z.number().min(0),
  Feb: z.number().min(0),
  Mar: z.number().min(0),
  Apr: z.number().min(0),
  May: z.number().min(0),
  Jun: z.number().min(0),
  Jul: z.number().min(0),
  Aug: z.number().min(0),
  Sep: z.number().min(0),
  Oct: z.number().min(0),
  Nov: z.number().min(0),
  Dec: z.number().min(0),
  birds: z.array(
    z.object({
      id: z.number().nonnegative(),
      name: z.string().nonempty(),
      imageUrl: z.string().nonempty(),
      JanFrequency: frequencySchema,
      FebFrequency: frequencySchema,
      MarFrequency: frequencySchema,
      AprFrequency: frequencySchema,
      MayFrequency: frequencySchema,
      JunFrequency: frequencySchema,
      JulFrequency: frequencySchema,
      AugFrequency: frequencySchema,
      SepFrequency: frequencySchema,
      OctFrequency: frequencySchema,
      NovFrequency: frequencySchema,
      DecFrequency: frequencySchema,
    })
  ),
});
type Schema = z.infer<typeof schema>;

export function AddSpotForm() {
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    setValue,
    reset,
  } = useForm<Schema>({ resolver: zodResolver(schema) });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "birds",
  });

  const t = useTranslations("AddSpotPage");

  const onSubmit = async (data: Schema) => {
    try {
      const success = await addSpot(data);
      if (success) {
        setMessage("Spot added successfully!");
        reset();
      } else {
        setMessage("Failed to add spot.");
      }
    } catch {
      setMessage("An error occurred.");
    }
  };

  return (
    <>
      <URLForm
        onData={(data) => {
          Object.entries(data).forEach(([key, value]) => {
            setValue(key as keyof Spot, value);
          });
        }}
      />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 mt-5">
        <Button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={isSubmitting}
        >
          {isSubmitting ? t("submitting") : t("submit")}
        </Button>
        {message && <p className="text-center text-green-500">{message}</p>}
        <label className="flex items-center space-x-2">
          <span className="text-gray-700 w-16">ID:</span>
          <input
            type="text"
            {...register("id")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.id && <p className="text-red-500">{errors.id.message}</p>}
        </label>
        <label className="flex items-center space-x-2">
          <span className="text-gray-700 w-16">Name:</span>
          <input
            type="text"
            {...register("name")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </label>
        <label className="flex items-center space-x-2">
          <span className="text-gray-700 w-16">Address:</span>
          <input
            type="text"
            {...register("address")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.address && (
            <p className="text-red-500">{errors.address.message}</p>
          )}
        </label>
        {MONTH.map((month) => (
          <label key={month} className="flex items-center space-x-2">
            <span className="text-gray-700 w-16">{month}:</span>
            <input
              type="number"
              {...register(month)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors[month] && (
              <p className="text-red-500">{errors[month]?.message}</p>
            )}
          </label>
        ))}
        <div>
          <h2 className="text-xl font-bold mb-3">{t("birds")}</h2>
          {fields.map((bird, index) => (
            <div key={bird.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <h3>{bird.name}</h3>
                <Button onClick={() => remove(index)} size="sm">
                  Remove Bird
                </Button>
              </div>
              {MONTH.map((month) => (
                <label key={month} className="flex items-center space-x-2">
                  <span className="text-gray-700 w-16">{month}</span>
                  <input
                    type="number"
                    step="0.001"
                    {...register(`birds.${index}.${month}Frequency.0`)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <input
                    type="number"
                    step="0.001"
                    {...register(`birds.${index}.${month}Frequency.1`)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <input
                    type="number"
                    step="0.001"
                    {...register(`birds.${index}.${month}Frequency.2`)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  {errors.birds?.[index]?.[`${month}Frequency`] && (
                    <p className="text-red-500">
                      {errors.birds[index][`${month}Frequency`]?.message}
                    </p>
                  )}
                </label>
              ))}
            </div>
          ))}
        </div>
        <BirdForm
          onData={(bird) =>
            append({
              ...bird,
              JanFrequency: [0, 0, 0],
              FebFrequency: [0, 0, 0],
              MarFrequency: [0, 0, 0],
              AprFrequency: [0, 0, 0],
              MayFrequency: [0, 0, 0],
              JunFrequency: [0, 0, 0],
              JulFrequency: [0, 0, 0],
              AugFrequency: [0, 0, 0],
              SepFrequency: [0, 0, 0],
              OctFrequency: [0, 0, 0],
              NovFrequency: [0, 0, 0],
              DecFrequency: [0, 0, 0],
            })
          }
        />
      </form>
    </>
  );
}
