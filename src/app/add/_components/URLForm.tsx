// "use client";

// import { useState } from "react";
// import { getSpotData } from "../_util/getSpotData";
// import { Spot } from "@/model/Spot";

// /** AIを使ってフォーム入力を補助するコンポーネント */
// export function URLForm(props: { onData: (data: Spot) => void }) {
//   const [url, setUrl] = useState("");
//   const [message, setMessage] = useState("");

//   const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setUrl(e.target.value);
//   };

//   const handleUrlSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     try {
//       const data = await getSpotData(url);
//       const idMatch = url.match(/\/(\d+)\/?$/);
//       const id = idMatch ? idMatch[1] : "1";
//       props.onData({
//         id,
//         ...data,
//       });
//       setMessage("Spot data fetched successfully!");
//     } catch {
//       setMessage("Failed to fetch spot data.");
//     }
//   };
//   return (
//     <form onSubmit={handleUrlSubmit} className="space-y-4 mb-6">
//       <label className="block">
//         <span className="text-gray-700">URL:</span>
//         <input
//           type="text"
//           value={url}
//           onChange={handleUrlChange}
//           required
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//         />
//       </label>
//       <button
//         type="submit"
//         className="w-full py-2 px-4 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//       >
//         Fetch Data
//       </button>
//       {message && <p className="mt-4 text-center text-green-500">{message}</p>}
//     </form>
//   );
// }
