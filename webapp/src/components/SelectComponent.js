export default function SelectComponent({ value, items, label, onChange }) {
    const selected = items.find(item => value === item.id || value === item[label]);

    return (
        <select
            className="appearance-none w-full border rounded py-2 px-3 text-grey-darker mb-1"
            onChange={(e) => onChange(e.target.value)}
            value={selected?.index}
        >
            <option>Select</option>
            {
                items.map((item, index) => {
                    return (
                        <option key={index} value={item.id}>
                            {item[label]}
                        </option>
                    )
                })
            }
        </select>
    )
}
