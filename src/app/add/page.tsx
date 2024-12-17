"use client";

import React, { useState } from "react";
import { addSpot } from "@/addSpot";
import Link from "next/link";
import { Spot } from "@/model/Spot";
import { URLForm } from "./_components/URLForm";

export default function AddSpotPage() {
  const [formData, setFormData] = useState<Spot>({
    id: "",
    name: "",
    address: "",
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: e.target.type === "number" ? parseInt(value, 10) : value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const success = await addSpot(formData);
      if (success) {
        setMessage("Spot added successfully!");
      } else {
        setMessage("Failed to add spot.");
      }
    } catch {
      setMessage("An error occurred.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <Link href="/">一覧へ戻る</Link>
      <h1 className="text-2xl font-bold mb-6">探鳥地を追加</h1>
      <URLForm onData={setFormData} />
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-gray-700">ID:</span>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Name:</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Address:</span>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Jan:</span>
          <input
            type="number"
            name="Jan"
            value={formData.Jan}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Feb:</span>
          <input
            type="number"
            name="Feb"
            value={formData.Feb}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Mar:</span>
          <input
            type="number"
            name="Mar"
            value={formData.Mar}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Apr:</span>
          <input
            type="number"
            name="Apr"
            value={formData.Apr}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">May:</span>
          <input
            type="number"
            name="May"
            value={formData.May}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Jun:</span>
          <input
            type="number"
            name="Jun"
            value={formData.Jun}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Jul:</span>
          <input
            type="number"
            name="Jul"
            value={formData.Jul}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Aug:</span>
          <input
            type="number"
            name="Aug"
            value={formData.Aug}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Sep:</span>
          <input
            type="number"
            name="Sep"
            value={formData.Sep}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Oct:</span>
          <input
            type="number"
            name="Oct"
            value={formData.Oct}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Nov:</span>
          <input
            type="number"
            name="Nov"
            value={formData.Nov}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Dec:</span>
          <input
            type="number"
            name="Dec"
            value={formData.Dec}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
      {message && <p className="mt-4 text-center text-green-500">{message}</p>}
    </div>
  );
}
