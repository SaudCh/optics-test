import React from "react";

export default function Table({ parameter }) {
  return (
    <table className="border-collapse border w-full rounded">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-slate-200 text-sm text-gray-800 font-normal ..."></th>
          <th className="border border-slate-200 text-sm text-gray-800 font-normal ...">
            SPH
          </th>
          <th className="border border-slate-200 text-sm text-gray-800 font-normal ...">
            CYL
          </th>
          <th className="border border-slate-200 text-sm text-gray-800 font-normal ...">
            AX
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border border-slate-200 pl-2 text-sm text-gray-800  ...">
            Right
          </td>
          <td className="border border-slate-200 pl-2 text-sm text-gray-800   ...">
            {parameter?.right?.power}
          </td>
          <td className="border border-slate-200 pl-2 text-sm text-gray-800  ...">
            {parameter?.right?.cylinder}
          </td>
          <td className="border border-slate-200 pl-2 text-sm text-gray-800  ...">
            {parameter?.right?.axis}
          </td>
        </tr>
        <tr>
          <td className="border border-slate-200 pl-2 text-sm text-gray-800 ...">
            Left
          </td>
          <td className="border border-slate-200 pl-2 text-sm text-gray-800  ...">
            {parameter?.left?.power}
          </td>
          <td className="border border-slate-200  pl-2 text-sm text-gray-800  ...">
            {parameter?.left?.cylinder}
          </td>
          <td className="border border-slate-200 pl-2 text-sm text-gray-800  ...">
            {parameter?.left?.axis}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
