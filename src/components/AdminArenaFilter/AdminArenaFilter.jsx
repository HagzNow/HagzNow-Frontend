import React from 'react'
import { IoSearchOutline } from "react-icons/io5";

export default function AdminArenaFilter() {
    return (
        <div dir="rtl" className="bg-white border border-gray-200 rounded-lg p-4 my-6 mx-10">
            <div className="flex items-center gap-4">
                {/* Search Input */}
                <div className="flex-1 relative">
                    <input
                        type="text"
                        placeholder="بحث..."
                        className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                </div>

                {/* Dropdown 1 */}
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white min-w-[120px]">
                    <option value="">الكل</option>
                    <option value="option1">خيار 1</option>
                    <option value="option2">خيار 2</option>
                </select>

                {/* Dropdown 2 */}
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white min-w-[120px]">
                    <option value="">الكل</option>
                    <option value="option1">خيار 1</option>
                    <option value="option2">خيار 2</option>
                </select>

                {/* Dropdown 3 */}
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white min-w-[120px]">
                    <option value="">الكل</option>
                    <option value="option1">خيار 1</option>
                    <option value="option2">خيار 2</option>
                </select>
            </div>
        </div>
    )
}
