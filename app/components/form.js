

export const Input = ({ register, errors, id, type, rules,placeholder }) => {
    return (<div className='h-18'>
        <input
            id={id}
            type={type}
            {...register(id, rules)}
            className='bg-slate-100 '
            placeholder={placeholder}
        />
        {errors[id] && (
            <div className='text-orange-700'>{errors?.[id]?.message}</div>
        )}
    </div>)
}

export const Select = ({ id, register, children }) => {
    return (
        <div className="top-5">
            <select
                name="accounting"
                id={id}
                className="px-2 py-1 bg-slate-100 rounded h-8"
                {...register(id)}
            >
                {children} {/* 將選項放在這裡 */}
            </select>
        </div>
    )
}













