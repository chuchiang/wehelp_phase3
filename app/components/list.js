
export const List = ({ formData,handleDelete }) => {
    return (
        <div>
            {formData && (
                formData.map((item, index) => (
                    <div key={index} className=' flex items-center justify-between flex-nowrap ' >
                        <div className={`w-20 ${item.accounting === "支出" ? 'text-red-500 ' : 'text-green-500'}`}>{item.price}</div>
                        <div className='w-370 fw-700 p-2 '>{item.contant}</div>
                        <button type="submit" id={item.id} className='bg-slate-300 cursor-pointer rounded px-2' onClick={() => handleDelete(index,item.id)}>刪除</button>
                    </div>
                ))
            )}
        </div>
    )
  }

