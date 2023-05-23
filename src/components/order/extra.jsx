import React from 'react'

export default function Extra({ data }) {
    const { parameter, lensThickness, lensType, lensTypeAdv } = data
    return (
        <div>
            <div className="mt-2 mb-5 justify-center">
                <span className="uppercase text-sm font-medium text-gray-900 bold">
                    Parameter
                </span>
                <div className="mr-16 flex md:block justify-between">
                    <div className='grid md:grid-cols-5 grid-flow-row grid-rows-6 md:grid-rows-1 gap-2 '>
                        <span className="uppercase text-xs font-medium text-gray-500">
                        </span>
                        <span className="uppercase text-xs font-medium text-gray-500">
                            Power
                        </span>
                        <span className="uppercase text-xs font-medium text-gray-500">
                            Cylinder
                        </span>
                        <span className="uppercase text-xs font-medium text-gray-500">
                            Axis
                        </span>
                        <span className="uppercase text-xs font-medium text-gray-500">
                            Pd
                        </span>
                    </div>
                    <div className='grid md:grid-cols-5 grid-flow-row grid-rows-6 md:grid-rows-1 gap-2'>
                        <span className="uppercase text-xs font-medium text-gray-500">
                            Right
                        </span>
                        <span className="uppercase text-xs font-medium text-gray-500">
                            {parameter?.right?.power}
                        </span>
                        <span className="uppercase text-xs font-medium text-gray-500">
                            {parameter?.right?.cylinder}
                        </span>
                        <span className="uppercase text-xs font-medium text-gray-500">
                            {parameter?.right?.axis}
                        </span>
                        <span className="uppercase text-xs font-medium text-gray-500">
                            {parameter?.right?.pd}
                        </span>
                    </div>
                    <div className='grid md:grid-cols-5 grid-flow-row grid-rows-6 md:grid-rows-1 gap-2'>
                        <span className="uppercase text-xs font-medium text-gray-500">
                            Left
                        </span>
                        <span className="uppercase text-xs font-medium text-gray-500">
                            {parameter?.left?.power}
                        </span>
                        <span className="uppercase text-xs font-medium text-gray-500">
                            {parameter?.left?.cylinder}
                        </span>
                        <span className="uppercase text-xs font-medium text-gray-500">
                            {parameter?.left?.axis}
                        </span>
                        <span className="uppercase text-xs font-medium text-gray-500">
                            {parameter?.left?.pd}
                        </span>
                    </div>

                </div>
            </div>

            <div className="mt-2 mb-5 justify-center">
                <span className="uppercase text-sm font-medium text-gray-900 bold">
                    Lens Type
                </span>

                <div className="mr-16 flex flex-col">
                    <span className="uppercase text-xs font-medium text-gray-500">
                        {lensType?.name}
                    </span>
                    <span className="uppercase text-xs font-medium text-gray-500">
                        {lensType?.description}
                    </span>
                </div>

            </div>
            <div className="mt-2 mb-5 justify-center">
                <span className="uppercase text-sm font-medium text-gray-900 bold">
                    Lens Thickness
                </span>
                <div className="mr-16 flex flex-col">
                    <span className="uppercase text-xs font-medium text-gray-500">
                        {lensThickness?.name}
                    </span>
                    <span className="uppercase text-xs font-medium text-gray-500">
                        Rs {lensThickness?.price}
                    </span>
                    <span className="uppercase text-xs font-medium text-gray-500">
                        {lensThickness?.refraction}
                    </span>
                    <span className="uppercase text-xs font-medium text-gray-500">
                        {lensThickness?.description}
                    </span>
                </div>
            </div>
            <div className="mt-2 mb-5 justify-center">
                <span className="uppercase text-sm font-medium text-gray-900 bold">
                    Lens Type Advance
                </span>
                <div className="mr-16 flex flex-col">
                    <span className="uppercase text-xs font-medium text-gray-500">
                        {lensTypeAdv?.name}
                    </span>
                    <span className="uppercase text-xs font-medium text-gray-500">
                        Rs {lensTypeAdv?.price}
                    </span>
                    <span className="uppercase text-xs font-medium text-gray-500">
                        {lensTypeAdv?.description}
                    </span>
                </div>
            </div>
        </div>
    )
}
