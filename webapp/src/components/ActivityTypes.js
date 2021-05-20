export default function ActivityType({ value, onChange }) {
    const types = [
        {index: "", text: "Selecciona un tipo de activitidad"},
        {index: "call", text: "Llamada al cliente"},
        {index: "meeting", text: "Visita a propiedad presencial"},
        {index: "virtual", text: "Visita virtual a propiedad"},
    ]

    const selected = types.find(item => value === item.index || value === item.text);

    return (
        <select
            className="appearance-none w-full border rounded py-2 px-3 text-grey-darker mb-1"
            onChange={(e) => onChange(e.target.value)}
            value={selected?.index}
        >
            {
                types.map((item, index) => {
                    return (
                        <option key={item.index} value={item.index}>
                            {item.text}
                        </option>
                    )
                })
            }
        </select>
    )
}
